import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'
import {chromium} from 'playwright'

const stage = process.argv[2] ?? 'baseline'
const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const output = `.tmp/awwwards/${stage}`
fs.mkdirSync(output, {recursive: true})
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-10-04', useCdn: false, perspective: 'published', token: process.env.SANITY_API_READ_TOKEN})
const documents = await client.fetch('*[_type in ["project", "homepage", "about"]] | order(orderRank asc){...}')
const projects = documents.filter(doc => doc._type === 'project' && doc.slug?.current && doc.orderRank)
const routes = ['/', '/work', '/about', ...projects.map(doc => `/work/${doc.slug.current}`)]
const report = {stage, base, createdAt: new Date().toISOString(), routes, revisions: documents.map(({_id, _rev}) => ({_id, _rev})),
  metrics: [], layouts: [], accessibility: [], screenshots: [], failures: [], interactions: [], content: []}
function walk(value, location) {
  if (typeof value === 'string' && /\[[^\]\n]+\]/.test(value)) report.content.push({location, kind: 'bracketed copy', text: value})
  else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${location}[${item?._key ?? index}]`))
  else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) {
    if (!key.startsWith('_')) walk(child, `${location}.${key}`)
  }
}
for (const doc of documents) {
  walk(doc, doc._id)
  for (const link of doc.socialLinks ?? []) report.content.push({location: doc._id, kind: 'social', ...link})
  for (const block of doc.content ?? []) if (block._type === 'videoBlock') report.content.push({location: `${doc._id}.content[${block._key}]`, kind: 'video', sourceType: block.sourceType, title: block.title})
}
const browser = await chromium.launch({headless: true})
const save = () => fs.writeFileSync(`${output}/results.json`, JSON.stringify(report, null, 2) + '\n')
try {
  // Fresh contexts and fixed dwell times: these are unthrottled lab samples, not Lighthouse or field INP.
  for (const width of [390, 1440]) for (const route of ['/', '/work', '/about', '/work/aster-house']) {
    const context = await browser.newContext({viewport: {width, height: 900}})
    await context.addInitScript(() => {
      window.auditTiming = {lcp: 0, shifts: [], longTasks: [], events: []}
      for (const type of ['largest-contentful-paint', 'layout-shift', 'longtask', 'event']) {
        try {new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (type === 'largest-contentful-paint') window.auditTiming.lcp = entry.startTime
            if (type === 'layout-shift' && !entry.hadRecentInput) window.auditTiming.shifts.push({time: entry.startTime, value: entry.value})
            if (type === 'longtask') window.auditTiming.longTasks.push(entry.duration)
            if (type === 'event') window.auditTiming.events.push(entry.duration)
          }
        }).observe({type, buffered: true, ...(type === 'event' ? {durationThreshold: 16} : {})})} catch {}
      }
    })
    const page = await context.newPage()
    const response = await page.goto(base + route, {waitUntil: 'load', timeout: 90000})
    await page.waitForTimeout(3500)
    const metric = await page.evaluate(() => {
      let cls = 0, score = 0, start = 0, previous = 0
      for (const shift of window.auditTiming.shifts) {
        if (shift.time - previous > 1000 || shift.time - start > 5000) {score = 0; start = shift.time}
        score += shift.value; cls = Math.max(cls, score); previous = shift.time
      }
      const resources = performance.getEntriesByType('resource')
      const nav = performance.getEntriesByType('navigation')[0]
      return {...window.auditTiming, cls, ttfb: nav.responseStart, requests: resources.length,
        transferBytes: resources.reduce((sum, item) => sum + item.transferSize, 0),
        scriptBytes: resources.filter(item => item.initiatorType === 'script').reduce((sum, item) => sum + item.encodedBodySize, 0),
        fonts: resources.filter(item => /woff/.test(item.name)).length,
        lcpImage: [...document.images].find(img => img.fetchPriority === 'high')?.currentSrc,
        imageBytes: resources.filter(item => item.initiatorType === 'img').reduce((sum, item) => sum + item.encodedBodySize, 0)}
    })
    report.metrics.push({route, width, status: response.status(), ...metric})
    await context.close(); save()
    console.log('METRIC', route, width, Math.round(metric.lcp), metric.cls.toFixed(4))
  }
  const context = await browser.newContext({reducedMotion: 'reduce'})
  await context.route('**/*', route => /\.sanity\.io\//.test(route.request().url()) && !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) ? route.abort() : route.continue())
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {if (message.type() === 'error' && /hydration|hydrating|React error/i.test(message.text())) errors.push(message.text())})
  for (const width of [320, 375, 390, 430, 760, 761, 768, 1024, 1280, 1440, 1920]) for (const route of routes) {
    errors.length = 0
    try {
      await page.setViewportSize({width, height: 900})
      const response = await page.goto(base + route, {waitUntil: 'load', timeout: 90000})
      assert.equal(response.status(), 200)
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(200)
      const html = await response.text()
      for (const token of [process.env.SANITY_API_READ_TOKEN, process.env.SANITY_API_WRITE_TOKEN].filter(Boolean)) assert.ok(!html.includes(token), 'Token in HTML')
      const layout = await page.evaluate(() => {
        const visible = el => el.getClientRects().length > 0 && !el.closest('dialog')
        const duplicates = [...document.querySelectorAll('[id]')].map(el => el.id).filter((id, index, all) => all.indexOf(id) !== index)
        const main = document.querySelector('main')
        // innerText includes clipped accessible table headers. Omit only those
        // offscreen headers for the visible-copy comparison, then restore them.
        const headers = [...main.querySelectorAll('thead')].filter(el => el.getBoundingClientRect().width <= 1 && getComputedStyle(el).position === 'absolute')
        const displays = headers.map(el => el.style.display)
        headers.forEach(el => {el.style.setProperty('display', 'none', 'important')})
        const text = main.innerText
        headers.forEach((el, index) => {el.style.display = displays[index]})
        return {overflow: document.documentElement.scrollWidth - innerWidth, h1: [...document.querySelectorAll('h1')].filter(visible).map(el => el.textContent),
          title: document.title, text, height: document.documentElement.scrollHeight, duplicates,
          images: [...document.images].filter(visible).map(el => ({alt: el.alt, width: el.clientWidth, height: el.clientHeight})),
          elements: [...document.querySelectorAll('main h1, main >section, article >header, article >figure, [data-content-key] >*, .project-next, footer')].filter(visible).map(el => {
            const rect = el.getBoundingClientRect(); return {tag: el.tagName, rect: [rect.x, rect.y + scrollY, rect.width, rect.height].map(n => Math.round(n * 100) / 100)}
          }), links: [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href'))}
      })
      report.layouts.push({route, width, status: response.status(), errors: [...errors], ...layout})
      assert.ok(layout.overflow <= 1, `Overflow ${layout.overflow}px`)
      assert.equal(layout.h1.length, 1, 'Exactly one visible H1')
      assert.deepEqual(errors, [])
      if (stage !== 'baseline') {
        const before = JSON.parse(fs.readFileSync('.tmp/awwwards/baseline/results.json', 'utf8')).layouts.find(item => item.route === route && item.width === width)
        assert.deepEqual(layout.duplicates, [], 'Unique document IDs')
        assert.equal(layout.text, before.text, 'Visible editorial copy unchanged')
        assert.equal(layout.height, before.height, 'Document height unchanged')
        assert.deepEqual(layout.elements, before.elements, 'Settled composition geometry unchanged')
      }
      if ([390, 1440].includes(width)) {
        await page.addScriptTag({path: path.resolve('node_modules/axe-core/axe.min.js')})
        const a11y = await page.evaluate(() => window.axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']}}))
        report.accessibility.push({route, width, violations: a11y.violations.map(v => ({id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({html: n.html.slice(0, 500), failureSummary: n.failureSummary}))})), incomplete: a11y.incomplete.map(v => ({id: v.id, nodes: v.nodes.length}))})
        // Decode only displayed images; retain native lazy behavior for measurement above.
        for (const image of await page.locator('img:visible').all()) {
          await image.scrollIntoViewIfNeeded()
          await image.evaluate(el => el.decode())
        }
        await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}))
        const screenshot = `${output}/${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}.png`
        await page.screenshot({path: screenshot, fullPage: true})
        await page.screenshot({path: screenshot.replace('.png', '-viewport.png')})
        report.screenshots.push(screenshot)
      }
    } catch (error) {report.failures.push({route, width, error: error.message}); console.log('FAIL', route, width, error.message.slice(0, 200))}
    save()
  }
  if (stage !== 'baseline') {
    const before = JSON.parse(fs.readFileSync('.tmp/awwwards/baseline/results.json', 'utf8'))
    assert.deepEqual(report.revisions, before.revisions, 'Published content unchanged')
    for (const width of [320, 390, 768, 1440]) for (const reduced of [false, true]) {
      await page.setViewportSize({width, height: 900})
      await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'})
      await page.goto(base, {waitUntil: 'load'})
      await page.keyboard.press('Tab')
      assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true)
      await page.keyboard.press('Enter')
      assert.equal(await page.locator('main').evaluate(el => el === document.activeElement), true)
      if (width <= 760) {
        const trigger = page.getByRole('button', {name: 'Menu +'})
        await page.evaluate(() => scrollTo({top: 600, behavior: 'instant'}))
        for (let iteration = 0; iteration < 3; iteration++) {
          await trigger.click()
          const dialog = page.getByRole('dialog')
          await dialog.waitFor()
          await page.keyboard.press('Shift+Tab')
          assert.equal(await dialog.evaluate(el => el.contains(document.activeElement)), true)
          for (let tab = 0; tab < 12; tab++) {
            await page.keyboard.press('Tab')
            assert.equal(await dialog.evaluate(el => el.contains(document.activeElement)), true)
          }
          await page.keyboard.press('Escape')
          assert.equal(await trigger.evaluate(el => el === document.activeElement), true)
          assert.equal(await page.evaluate(() => document.body.style.position), '')
          assert.ok(Math.abs(await page.evaluate(() => scrollY) - 600) <= 1)
        }
        await trigger.click()
        await page.getByRole('dialog').getByRole('link', {name: /^Work/}).click()
        await page.waitForURL(base + '/work')
      } else await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: /^Work/}).click()
      await page.waitForURL(base + '/work')
      assert.equal(await page.evaluate(() => document.body.style.position), '')
      await page.getByRole('button', {name: 'Grid', exact: true}).click()
      assert.ok(await page.getByRole('region', {name: 'Project grid'}).isVisible())
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      const filter = page.getByRole('group', {name: 'Filter by discipline'}).getByRole('button').nth(1)
      await filter.click()
      assert.equal(await filter.getAttribute('aria-pressed'), 'true')
      assert.ok((await page.getByRole('status').innerText()).includes('project'))
      await page.getByRole('button', {name: 'List', exact: true}).click()
      assert.ok(await page.getByRole('region', {name: 'Project index'}).isVisible())
      await page.goto(base + '/work/aster-house', {waitUntil: 'load'})
      const track = page.locator('[data-gallery-track]:visible').first()
      if (await track.count()) {
        await track.focus()
        await page.keyboard.press('End')
        const count = await track.locator(':scope > figure').count()
        await page.waitForTimeout(reduced ? 100 : 1200)
        assert.ok((await track.locator('..').locator('.project-gallery-controls p').innerText()).startsWith(String(count).padStart(2, '0')))
        await page.keyboard.press('Home')
        await page.waitForTimeout(reduced ? 100 : 1200)
        assert.ok((await track.locator('..').locator('.project-gallery-controls p').innerText()).startsWith('01'))
      }
      report.interactions.push({width, reduced, skip: 'pass', menu: width <= 760 ? 'pass' : 'desktop', archive: 'pass', gallery: 'pass'})
      save()
    }
    await page.setViewportSize({width: 390, height: 844})
    await page.goto(base, {waitUntil: 'load'})
    await page.getByRole('button', {name: 'Menu +'}).click()
    await page.setViewportSize({width: 844, height: 390})
    await page.getByRole('dialog').waitFor({state: 'hidden'})
    assert.equal(await page.evaluate(() => document.body.style.position), '')
    report.interactions.push({scenario: 'orientation closes mobile menu', result: 'pass'})
    for (const route of ['/work', '/about', '/work', '/work/forma', '/work/nocturne']) {
      await page.evaluate(route => {document.querySelector('a[data-rapid]')?.remove(); const a = document.createElement('a'); a.href = route; a.dataset.rapid = 'true'; document.body.append(a)}, route)
      // Use actual client links for route changes where available.
      const link = page.locator(`a[href="${route}"]:visible`).first()
      if (await link.count()) {await link.click(); await page.waitForURL(base + route)}
      else await page.goto(base + route, {waitUntil: 'load'})
      assert.ok(await page.locator('main').innerText())
    }
    report.interactions.push({scenario: 'repeated navigation', result: 'pass'})
    await page.goto(base + '/work', {waitUntil: 'load'})
    const navigation = page.getByRole('navigation', {name: 'Main navigation'})
    for (let iteration = 0; iteration < 3; iteration++) {
      await navigation.getByRole('link', {name: 'About', exact: true}).click()
      await navigation.getByRole('link', {name: /^Work/}).click()
    }
    await page.waitForURL(base + '/work')
    await page.waitForTimeout(700)
    assert.equal(await page.locator('h1').innerText(), 'Work(10)')
    assert.equal(await page.evaluate(() => document.body.style.position), '')
    report.interactions.push({scenario: 'rapid client navigation settles on latest route', result: 'pass'})
    await page.goto(base + '/work/audit-missing-project', {waitUntil: 'load'})
    assert.equal(await page.locator('h1').innerText(), 'Page not found')
    assert.ok(await page.getByRole('link', {name: 'All work', exact: true}).isVisible())
    report.interactions.push({scenario: 'missing project recovery', result: 'pass'})
    const noScript = await browser.newContext({javaScriptEnabled: false, viewport: {width: 390, height: 844}})
    const nativePage = await noScript.newPage()
    await nativePage.goto(base, {waitUntil: 'load'})
    assert.ok(await nativePage.getByRole('navigation', {name: 'Main navigation'}).isVisible())
    assert.ok(await nativePage.getByRole('link', {name: 'About', exact: true}).first().isVisible())
    assert.equal(await nativePage.locator('main img').first().evaluate(el => getComputedStyle(el).clipPath), 'none')
    await noScript.close()
    report.interactions.push({scenario: 'mobile navigation and imagery without JavaScript', result: 'pass'})
  }
  console.log(JSON.stringify({layouts: report.layouts.length, axePages: report.accessibility.length, failures: report.failures.length, interactions: report.interactions.length}))
} catch (error) {
  report.failures.push({scenario: 'interaction sweep', error: error.message})
  console.error(error.message)
  process.exitCode = 1
} finally {save(); await browser.close()}
if (report.failures.length) process.exitCode = 1
