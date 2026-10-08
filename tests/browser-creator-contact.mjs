import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {chromium} from 'playwright'
import {createClient} from '@sanity/client'

const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const output = '.tmp/awwwards/creator-contact'
fs.mkdirSync(output, {recursive: true})
const email = 'balogunoluwasogo@gmail.com'
const portfolio = 'https://www.balogunoluwasogo.com/'
const github = 'https://github.com/balogunsogo'
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2026-10-04', useCdn: false, perspective: 'published', token: process.env.SANITY_API_READ_TOKEN})
const revisions = () => client.fetch('*[_type in ["project", "homepage", "about"]] | order(_id asc){_id,_rev}')
const startRevisions = await revisions()
const zoomOnly = process.argv.includes('--zoom-only')
const report = zoomOnly ? JSON.parse(fs.readFileSync(`${output}/verification.json`, 'utf8')) : {at: new Date().toISOString(), base, layouts: [], menus: [], accessibility: [], zoom: [], failures: []}
if (zoomOnly) report.zoom = []
const browser = await chromium.launch({headless: true})
try {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.route('**/*', route => /\.sanity\.io\//.test(route.request().url()) && !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) ? route.abort() : route.continue())
  const routes = ['/', '/about', '/work', '/work/aster-house', '/work/nocturne', '/work/sola-ceramics']
  for (const reduced of zoomOnly ? [] : [false, true]) for (const width of [320, 375, 390, 430, 760, 761, 768, 1024, 1280, 1440, 1920]) for (const route of routes) {
    try {
      errors.length = 0
      await page.setViewportSize({width, height: 900})
      await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'})
      assert.equal((await page.goto(base + route, {waitUntil: 'load'})).status(), 200)
      await page.evaluate(() => document.fonts.ready)
      const footer = page.locator('footer#contact')
      await footer.scrollIntoViewIfNeeded()
      await page.waitForTimeout(reduced ? 150 : 750)
      assert.equal(await footer.locator('[data-creator-attribution]').count(), 1)
      assert.equal(await footer.locator('[data-creator-attribution] a').getAttribute('href'), portfolio)
      assert.ok((await footer.innerText()).toLowerCase().includes('an independent digital concept.'))
      const links = footer.getByRole('list', {name: 'Creator links'}).locator('a')
      assert.deepEqual(await links.evaluateAll(links => links.map(link => link.href)), [portfolio, `mailto:${email}`, github])
      for (const link of await links.all()) assert.ok(await link.isVisible())
      const mail = footer.locator('[class*="footerEmail"]')
      assert.equal(await mail.getAttribute('href'), `mailto:${email}`)
      assert.equal(await mail.textContent(), email)
      if (width > 760) assert.equal(await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Contact', exact: true}).getAttribute('href'), `mailto:${email}`)
      assert.ok(await mail.evaluate(el => {
        const range = document.createRange()
        range.selectNodeContents(el)
        const lines = new Set([...range.getClientRects()].map(rect => Math.round(rect.y)))
        return lines.size === 1 && el.scrollWidth <= el.clientWidth + 1
      }), 'Email must fit on one line without clipping')
      assert.deepEqual(await links.allTextContents(), ['Portfolio', 'Email', 'GitHub'])
      assert.equal(await page.locator('a[href*="@morrow.studio"]').count(), 0)
      assert.equal(await page.locator('a[href="https://www.instagram.com/"], a[href="https://www.are.na/"], a[href="https://www.linkedin.com/"]').count(), 0)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      const geometry = await footer.evaluate(footer => {
        const selected = [...footer.querySelectorAll('[data-creator-attribution], [class*="footerEmail"], ul, [class*="footerLocation"]')]
          .filter(el => el.getClientRects().length)
        const boxes = selected.map(el => {const r = el.getBoundingClientRect(); return {text: el.innerText, x: r.x, y: r.y, width: r.width, height: r.height}})
        const intersections = []
        for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
          const first = boxes[a], second = boxes[b]
          if (Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x) > 1 && Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y) > 1) intersections.push([a, b])
        }
        return {boxes, intersections, overflow: footer.scrollWidth - footer.clientWidth}
      })
      assert.deepEqual(geometry.intersections, [], 'Footer columns overlap')
      assert.ok(geometry.overflow <= 1)
      for (const box of geometry.boxes) assert.ok(box.x >= -1 && box.x + box.width <= width + 1, 'Footer text escapes viewport')
      await page.keyboard.press('Tab')
      await links.first().focus()
      assert.ok(await links.first().evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'))
      for (const link of await page.locator('a[target="_blank"]').all()) {
        const rel = (await link.getAttribute('rel') ?? '').split(/\s+/)
        assert.ok(rel.includes('noopener') && rel.includes('noreferrer'))
      }
      if (!reduced && [390, 1440].includes(width)) {
        await footer.screenshot({path: `${output}/${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}.png`})
        await page.addScriptTag({path: path.resolve('node_modules/axe-core/axe.min.js')})
        const axe = await page.evaluate(() => window.axe.run(document.querySelector('footer'), {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']}}))
        report.accessibility.push({route, width, violations: axe.violations.map(item => ({id: item.id, nodes: item.nodes.length})), incomplete: axe.incomplete.map(item => ({id: item.id, nodes: item.nodes.length}))})
        assert.equal(axe.violations.length, 0)
      }
      assert.deepEqual(errors, [])
      report.layouts.push({route, width, reduced, geometry, result: 'pass'})
    } catch (error) {report.failures.push({route, width, reduced, error: error.message}); console.log('FAIL', route, width, reduced, error.message.slice(0, 150))}
    fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2))
  }
  for (const width of zoomOnly ? [] : [320, 390, 760]) for (const reduced of [false, true]) {
    await page.setViewportSize({width, height: 900})
    await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'})
    await page.goto(base)
    const menu = page.getByRole('button', {name: 'Menu +', exact: true})
    await menu.click()
    const dialog = page.getByRole('dialog')
    assert.equal(await dialog.getByRole('link', {name: 'Contact', exact: true}).getAttribute('href'), `mailto:${email}`)
    assert.equal(await dialog.getByRole('link', {name: email, exact: true}).getAttribute('href'), `mailto:${email}`)
    assert.deepEqual(await dialog.getByRole('list', {name: 'Creator links'}).locator('a').evaluateAll(links => links.map(link => link.href)), [portfolio, `mailto:${email}`, github])
    assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1))
    await page.keyboard.press('Escape')
    assert.ok(await menu.evaluate(el => el === document.activeElement))
    report.menus.push({width, reduced, result: 'pass'})
  }
  report.cmsRevisionsUnchanged = JSON.stringify(await revisions()) === JSON.stringify(startRevisions)
  if (!report.cmsRevisionsUnchanged) report.failures.push({scope: 'CMS revision guard', error: 'CMS content changed externally during this read-only run.'})
} finally {await browser.close(); fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2))}

// Native Chrome tab zoom in a fresh isolated profile, not CSS or pinch scaling.
const extension = path.resolve('tests/fixtures/zoom-extension')
let context
try {
  context = await chromium.launchPersistentContext(path.resolve(output, 'zoom-profile'), {channel: 'chromium', headless: true, viewport: null,
    args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`, '--window-size=1440,1000']})
  const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker', {timeout: 15000})
  const page = await context.newPage()
  await page.bringToFront()
  const cdp = await context.newCDPSession(page)
  for (const route of ['/', '/about', '/work', '/work/aster-house']) {
    await page.goto(base + route)
    await worker.evaluate(async () => {const tabs = await globalThis.chrome.tabs.query({active: true}); await globalThis.chrome.tabs.setZoom(tabs[0].id, 1)})
    const normalWidth = await page.evaluate(() => innerWidth)
    await worker.evaluate(async () => {const tabs = await globalThis.chrome.tabs.query({active: true}); await globalThis.chrome.tabs.setZoom(tabs[0].id, 2)})
    await page.waitForTimeout(500)
    const zoomWidth = await page.evaluate(() => innerWidth)
    assert.ok(Math.abs(zoomWidth * 2 - normalWidth) <= 2, 'Native 200% zoom must halve the CSS viewport')
    const footer = page.locator('footer#contact')
    await page.evaluate(() => document.fonts.ready)
    await footer.locator('[data-creator-attribution]').evaluate(el => el.scrollIntoView({block: 'center', behavior: 'instant'}))
    await page.waitForTimeout(500)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    assert.ok(await footer.getByRole('list', {name: 'Creator links'}).isVisible())
    assert.ok(await footer.locator('[class*="footerEmail"]').evaluate(el => el.scrollWidth <= el.clientWidth + 1 && getComputedStyle(el).whiteSpace === 'nowrap'))
    for (const link of await footer.locator('[data-creator-attribution] a, [class*="footerEmail"], ul a').all()) {
      assert.ok(await link.evaluate(el => {
        const box = el.getBoundingClientRect()
        return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest('a') === el
      }), 'Creator/contact link must be visible and unobscured at native zoom')
    }
    // Capture without Playwright's temporary viewport-metrics override, which conflicts with native tab zoom.
    const screenshot = await cdp.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false, fromSurface: true})
    fs.writeFileSync(`${output}/zoom-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.png`, Buffer.from(screenshot.data, 'base64'))
    report.zoom.push({route, normalWidth, zoomWidth, zoom: 2, result: 'pass'})
  }
} catch (error) {
  const result = error.code === 'ERR_ASSERTION' ? 'fail' : 'unverified'
  report.zoom.push({result, error: error.message})
  if (result === 'fail') report.failures.push({scope: 'Native 200% zoom', error: error.message})
  console.log('Native zoom verification:', result, error.message)
}
finally {await context?.close(); fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2))}
console.log(JSON.stringify({layouts: report.layouts.length, menus: report.menus.length, axePages: report.accessibility.length, zoom: report.zoom, failures: report.failures.length}))
if (report.failures.length) process.exitCode = 1
