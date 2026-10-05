import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import {chromium} from 'playwright'
import {createClient} from '@sanity/client'

const stage = process.argv[2] ?? 'final'
const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const widths = [1440, 1024, 390, 320]
const documents = JSON.parse(fs.readFileSync('migration/data/source-mapping.json', 'utf8'))
const projects = documents.filter(document => document._type === 'project')
const routes = ['/', '/work', '/about', ...projects.map(project => '/work/' + project.slug.current)]
const output = 'migration/reports/interaction-polish'
fs.mkdirSync(output, {recursive: true})
function protectedFiles() {
  const files = {}
  const walk = folder => {for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {const file = path.join(folder, entry.name); if (entry.isDirectory()) walk(file); else files[file] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}}
  for (const folder of ['src/sanity', 'migration/data', 'morrow-export-master']) walk(folder)
  for (const file of ['sanity.config.ts', 'sanity.cli.ts', 'src/components/project/contract.ts', 'src/components/project/blocks/VideoBlock.tsx', 'src/lib/seo.ts']) files[file] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
  return files
}
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2026-10-04', useCdn: false, perspective: 'raw', token: process.env.SANITY_API_READ_TOKEN})
const revisions = () => client.fetch('*[_type in ["project", "homepage", "about"]] | order(_id asc){_id,_rev}')
const browser = await chromium.launch({headless: true})
const checks = [], interactions = [], failures = []
const baseline = stage === 'before' ? {files: protectedFiles(), revisions: await revisions(), layouts: {}} : JSON.parse(fs.readFileSync(`${output}/baseline.json`, 'utf8'))
try {
  const context = await browser.newContext({reducedMotion: 'reduce'})
  await context.route('**/*', route => /\.sanity\.io\//.test(route.request().url()) && !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) ? route.abort() : route.continue())
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {if (message.type() === 'error' && /hydration|hydrating|React error/i.test(message.text())) errors.push(message.text())})
  async function ready() {
    await page.evaluate(() => document.fonts.ready)
    await page.locator('img').evaluateAll(images => images.forEach(image => {image.loading = 'eager'}))
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())))
    await page.evaluate(() => scrollTo(0, 0))
  }
  async function open(route) {
    await page.mouse.move(0, 0)
    const response = await page.goto(base + route, {waitUntil: 'domcontentloaded'})
    assert.equal(response.status(), 200)
    await ready()
  }
  async function focus(locator) {
    await page.keyboard.press('Tab')
    await locator.focus()
    assert.ok(await locator.evaluate(element => element.matches(':focus-visible')), 'Keyboard focus must be visible')
    assert.notEqual(await locator.evaluate(element => getComputedStyle(element).outlineStyle), 'none')
  }
  const style = (locator, property) => locator.evaluate((element, property) => getComputedStyle(element)[property], property)
  const scale = locator => locator.evaluate(element => {const value = getComputedStyle(element).transform; return value === 'none' ? 1 : new DOMMatrixReadOnly(value).a})
  const near = (actual, expected, label, tolerance = .05) => assert.ok(Math.abs(actual - expected) < tolerance, `${label}: ${actual} vs ${expected}`)
  async function scenario(name, width, reduced, run) {
    errors.length = 0
    try {await run(); assert.deepEqual(errors, []); interactions.push({name, width, reduced, result: 'pass'})}
    catch (error) {failures.push({name, width, reduced, error: error.message}); console.log('FAIL', name, width, reduced, error.message.slice(0, 240))}
  }
  const layout = () => page.evaluate(() => {
    const visible = element => {const r = element.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !element.closest('dialog')}
    const rect = element => {const r = element.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height].map(value => Math.round(value * 100) / 100)}
    return {text: document.querySelector('main').innerText, height: document.documentElement.scrollHeight,
      elements: [...document.querySelectorAll('main h1, main >section, article >header, article >figure, [data-content-key] >*, .project-next, footer, main img')].filter(visible).map(element => ({tag: element.tagName, text: element.tagName === 'IMG' ? element.getAttribute('alt') : element.textContent, rect: rect(element)}))}
  })
  for (const width of widths) {
    await page.setViewportSize({width, height: width <= 760 ? 844 : 900})
    for (const route of routes) {
      errors.length = 0
      try {
        const response = await page.goto(base + route, {waitUntil: 'domcontentloaded'})
        assert.equal(response.status(), 200)
        await ready()
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
        const key = route + '@' + width, current = await layout()
        if (stage === 'before') baseline.layouts[key] = current
        else {
          assert.deepEqual(current.text, baseline.layouts[key].text, 'Visible copy changed')
          assert.deepEqual(current.elements, baseline.layouts[key].elements, 'Static layout changed')
          assert.equal(current.height, baseline.layouts[key].height, 'Page height changed')
        }
        assert.deepEqual(errors, [])
        checks.push({route, width, result: 'pass'})
      } catch (error) {failures.push({route, width, error: error.message}); console.log('FAIL', route, width, error.message.slice(0, 220))}
    }
    console.log(`Completed ${width}px static checks`)
  }
  if (stage !== 'before') for (const width of widths) for (const reduced of [false, true]) {
    await page.setViewportSize({width, height: width <= 760 ? 844 : 900})
    await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'})
    await scenario('Home entrances, navigation and hover/focus parity', width, reduced, async () => {
      await open('/')
      const title = page.locator('h1 [class*="rise"]').first(), studio = page.locator('[class*="heroSecondTitle"] [class*="rise"]')
      assert.equal(await style(title, 'animationDuration'), reduced ? '0s' : '1.2s')
      if (!reduced) assert.equal(await style(title, 'animationTimingFunction'), 'cubic-bezier(0.2, 0.7, 0.1, 1)')
      assert.equal(await style(studio, 'animationDelay'), reduced ? '0s' : '0.08s')
      const header = page.locator('header').first()
      assert.equal(await style(header, 'mixBlendMode'), 'difference')
      assert.equal(await style(header, 'backgroundColor'), 'rgba(0, 0, 0, 0)')
      const hero = page.locator('[class*="heroImage"]').first(), intro = page.locator('[class*="heroIntro"]').first()
      assert.equal(await style(hero, 'animationDuration'), reduced || width <= 760 ? '0s' : '1.5s')
      assert.equal(await style(intro, 'animationDelay'), reduced || width <= 760 ? '0s' : '0.5s')
      if (width > 760) {
        const about = page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'About', exact: true})
        await about.hover(); await page.waitForTimeout(reduced ? 20 : 550)
        assert.equal(await style(about, 'backgroundSize'), '100% 1px')
        assert.equal(await style(about, 'transitionDuration'), reduced ? '0s' : '0.5s')
        if (!reduced) assert.equal(await style(about, 'transitionTimingFunction'), 'cubic-bezier(0.2, 0.7, 0.1, 1)')
        await page.mouse.move(0, 0); await focus(about); await page.waitForTimeout(reduced ? 20 : 550)
        assert.equal(await style(about, 'backgroundSize'), '100% 1px')
      }
      const feature = page.locator('[data-lead] a').first(), image = feature.locator('img')
      await feature.hover(); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(image), reduced ? 1 : 1.035, 'Feature hover scale', .001)
      assert.equal(await style(image, 'transitionDuration'), reduced ? '0s' : '1.4s')
      await page.mouse.move(0, 0); await focus(feature); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(image), reduced ? 1 : 1.035, 'Feature focus scale', .001)
      assert.equal(await style(feature.locator('[class*="titleLink"]'), 'backgroundSize'), '100% 1px')
      if (width > 760) {
        const rows = page.locator('section[aria-labelledby="project-index-heading"] ol >li a')
        await rows.nth(2).hover()
        const preview = page.locator('[data-project-id]')
        assert.equal(await preview.getAttribute('data-project-id'), projects[2]._id)
        await page.mouse.move(0, 0); await focus(rows.nth(3))
        assert.equal(await preview.getAttribute('data-project-id'), projects[3]._id)
      }
      if (reduced) assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0)
      await page.screenshot({path: `${output}/home-${width}-${reduced ? 'reduced' : 'normal'}-focus.png`})
    })
    if (width <= 760) await scenario('Menu keyboard trap, Escape, scroll restoration, navigation and resize', width, reduced, async () => {
      await open('/')
      await page.evaluate(() => scrollTo(0, 500))
      const saved = await page.evaluate(() => ({y: scrollY, style: {overflow: document.body.style.overflow, position: document.body.style.position, top: document.body.style.top, width: document.body.style.width}}))
      const trigger = page.getByRole('button', {name: 'Menu +', exact: true})
      await focus(trigger); await trigger.press('Enter')
      const dialog = page.getByRole('dialog', {name: 'Site menu'})
      await dialog.waitFor({state: 'visible'})
      assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Close ×')
      assert.equal(await page.evaluate(() => document.body.style.position), 'fixed')
      assert.ok(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth + 1))
      const labels = dialog.locator('nav [class*="label"]')
      assert.equal(await style(labels.first(), 'animationDuration'), reduced ? '0s' : '0.9s')
      assert.equal(await style(labels.nth(3), 'animationDelay'), reduced ? '0s' : '0.18s')
      const links = dialog.locator('a')
      await focus(links.last()); await page.keyboard.press('Tab')
      assert.ok(await links.first().evaluate(element => document.activeElement === element))
      await page.keyboard.press('Shift+Tab')
      assert.ok(await links.last().evaluate(element => document.activeElement === element))
      for (let step = 0; step < 15; step++) {await page.keyboard.press('Tab'); assert.ok(await dialog.evaluate(element => element.contains(document.activeElement)))}
      await page.waitForTimeout(reduced ? 20 : 1100)
      await page.screenshot({path: `${output}/menu-${width}-${reduced ? 'reduced' : 'normal'}-focus.png`})
      await page.keyboard.press('Escape'); await dialog.waitFor({state: 'hidden'})
      assert.ok(await trigger.evaluate(element => document.activeElement === element))
      assert.deepEqual(await page.evaluate(() => ({overflow: document.body.style.overflow, position: document.body.style.position, top: document.body.style.top, width: document.body.style.width})), saved.style)
      near(await page.evaluate(() => scrollY), saved.y, 'Restored page scroll')
      for (let cycle = 0; cycle < 3; cycle++) {await trigger.press('Enter'); await dialog.waitFor({state: 'visible'}); await page.keyboard.press('Escape'); await dialog.waitFor({state: 'hidden'})}
      await trigger.press('Enter'); await dialog.waitFor({state: 'visible'})
      await focus(dialog.getByRole('navigation', {name: 'Primary'}).getByRole('link', {name: /^Work/})); await page.keyboard.press('Enter')
      await page.waitForURL(base + '/work')
      assert.notEqual(await page.evaluate(() => document.body.style.position), 'fixed')
      await page.getByRole('button', {name: 'Menu +', exact: true}).click()
      await page.getByRole('dialog').waitFor({state: 'visible'})
      await page.setViewportSize({width: 1024, height: 900})
      await page.getByRole('dialog').waitFor({state: 'hidden'})
      assert.notEqual(await page.evaluate(() => document.body.style.position), 'fixed')
      assert.ok(await page.evaluate(() => document.activeElement.getBoundingClientRect().width > 0))
      await page.setViewportSize({width, height: 844})
      assert.equal(await page.getByRole('button', {name: 'Menu +', exact: true}).getAttribute('aria-expanded'), 'false')
    })
    await scenario('Work preview reset, keyboard filters and List/Grid', width, reduced, async () => {
      await open('/work')
      const rows = page.locator('section[aria-label="Project index"] ol >li a'), list = page.locator('section[aria-label="Project index"] ol')
      const filters = page.getByRole('group', {name: 'Filter by discipline'}), preview = page.locator('[data-preview-id]')
      if (width > 760) {
        await rows.nth(1).hover()
        assert.equal(await preview.getAttribute('data-preview-id'), projects[1]._id)
        await page.waitForTimeout(reduced ? 20 : 550)
        assert.equal(await style(rows.nth(1), 'paddingLeft'), reduced ? '0px' : '12px')
        await page.mouse.move(0, 0)
        assert.equal(await list.getAttribute('data-interacting'), 'false')
        assert.equal(await preview.getAttribute('data-preview-id'), projects[0]._id)
        await focus(rows.nth(1)); await page.mouse.move(0, 0)
        assert.equal(await preview.getAttribute('data-preview-id'), projects[1]._id)
        await focus(filters.getByRole('button', {name: /^All/}))
        assert.equal(await list.getAttribute('data-interacting'), 'false')
      }
      const identity = filters.getByRole('button', {name: /^Identity/})
      await focus(identity); await identity.press('Enter')
      assert.equal(await identity.getAttribute('aria-pressed'), 'true')
      const expected = projects.filter(project => project.disciplines.includes('Identity')).map(project => '/work/' + project.slug.current)
      assert.deepEqual(await rows.evaluateAll(links => links.map(link => link.getAttribute('href'))), expected)
      const grid = page.getByRole('button', {name: 'Grid', exact: true})
      await focus(grid); await grid.press('Space')
      assert.equal(await grid.getAttribute('aria-pressed'), 'true')
      assert.equal(await page.locator('section[aria-label="Project grid"] li').count(), expected.length)
      await ready()
      const card = page.locator('section[aria-label="Project grid"] li a').first(), cardImage = card.locator('img')
      await card.hover(); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(cardImage), reduced ? 1 : 1.035, 'Grid hover scale', .001)
      await page.mouse.move(0, 0); await focus(card); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(cardImage), reduced ? 1 : 1.035, 'Grid focus scale', .001)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      await focus(filters.getByRole('button', {name: /^All/})); await page.keyboard.press('Enter')
      assert.equal(await page.locator('section[aria-label="Project grid"] li').count(), 10)
      await focus(page.getByRole('button', {name: 'List', exact: true})); await page.keyboard.press('Enter')
      assert.equal(await rows.count(), 10)
      assert.equal(await list.getAttribute('data-interacting'), 'false')
      if (width <= 760) {await filters.evaluate(element => {element.scrollLeft = 120}); assert.ok(await filters.evaluate(element => element.scrollLeft > 0))}
      if (reduced) assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0)
    })
    for (const slug of ['aster-house', 'forma', 'sola-ceramics']) await scenario('Gallery cumulative alignment, ends, keys and resize: ' + slug, width, reduced, async () => {
      await open('/work/' + slug)
      const gallery = page.locator(`[data-content-viewport="${width <= 760 ? 'mobile' : 'desktop'}"] .project-gallery`).first()
      if (!await gallery.count()) return
      const track = gallery.getByRole('group', {name: 'Scrollable gallery'}), slides = track.locator('figure'), count = await slides.count()
      await focus(track)
      if (width > 760) {
        const previous = gallery.getByRole('button', {name: 'Previous gallery image'}), next = gallery.getByRole('button', {name: 'Next gallery image'})
        assert.ok(!await previous.isEnabled())
        assert.equal(await style(slides.first(), 'transitionDuration'), reduced ? '0s' : '1s')
        if (!reduced) assert.equal(await style(slides.first(), 'transitionTimingFunction'), 'cubic-bezier(0.2, 0.7, 0.1, 1)')
        for (let index = 1; index < count; index++) {
          await focus(next); await next.press('Enter'); await page.waitForTimeout(reduced ? 30 : 1050)
          near((await slides.nth(index).boundingBox()).x, 0, 'Selected slide preserves the initial flush edge')
          assert.equal((await gallery.locator('[aria-live]').innerText()).trim(), `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`)
        }
        assert.ok(!await next.isEnabled())
        assert.ok(await track.evaluate(element => document.activeElement === element))
        await track.press('Home'); await page.waitForTimeout(reduced ? 30 : 1050)
        assert.ok(!await previous.isEnabled())
        await track.press('End'); await page.waitForTimeout(reduced ? 30 : 1050)
        assert.ok(!await next.isEnabled())
        await track.press('ArrowLeft'); await page.waitForTimeout(reduced ? 30 : 1050)
        assert.ok(await next.isEnabled())
        // Repeated commands interrupt the CSS transition without stale counters.
        await track.press('Home'); await track.press('ArrowRight'); await track.press('End'); await track.press('Home')
        await page.waitForTimeout(reduced ? 30 : 1050)
        near((await slides.first().boundingBox()).x, 0, 'Rapid commands settle at the original first slide position')
        await track.press('End'); await page.waitForTimeout(reduced ? 30 : 1050)
        await page.setViewportSize({width: width === 1440 ? 1024 : 1440, height: 900}); await page.waitForTimeout(reduced ? 50 : 1050)
        near((await slides.last().boundingBox()).x, 0, 'Resize preserves selected alignment')
        await page.setViewportSize({width, height: 900})
        await page.waitForTimeout(reduced ? 50 : 1050)
        near((await slides.last().boundingBox()).x, 0, 'Returning to the original width preserves selected alignment')
      } else {
        assert.equal(await style(track, 'overflowX'), 'auto')
        assert.ok((await style(track, 'scrollSnapType')).startsWith('x'))
        await track.evaluate(element => {element.scrollLeft = 200})
        assert.ok(await track.evaluate(element => element.scrollLeft > 0))
        await track.press('Home'); await page.waitForTimeout(reduced ? 30 : 600)
        near((await slides.first().boundingBox()).x, 0, 'Native mobile first slide snap alignment')
        await track.press('ArrowRight'); await page.waitForTimeout(reduced ? 30 : 600)
        assert.ok(await track.evaluate(element => element.scrollLeft > 0))
      }
      if (reduced) {
        assert.equal(await style(track, 'scrollBehavior'), 'auto')
        assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0)
      }
      await page.screenshot({path: `${output}/${slug}-gallery-${width}-${reduced ? 'reduced' : 'normal'}.png`})
    })
    await scenario('Project entrances, next-project hover/focus and navigation', width, reduced, async () => {
      await open('/work/aster-house')
      const hero = page.locator('.project-hero'), title = page.locator('.project-title-rise')
      assert.equal(await style(title, 'animationDuration'), reduced || width <= 760 ? '0s' : '1.2s')
      assert.equal(await style(hero, 'animationDelay'), reduced || width <= 760 ? '0s' : '0.25s')
      const next = page.locator('.project-next'), image = next.locator('img')
      await next.hover(); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(image), reduced ? 1 : 1.035, 'Next-project hover scale', .001)
      const heading = next.locator('h2 >span')
      assert.equal(await style(heading, 'transitionDuration'), reduced ? '0s' : '0.7s')
      await page.mouse.move(0, 0); await focus(next); await page.waitForTimeout(reduced ? 20 : 1450)
      near(await scale(image), reduced ? 1 : 1.035, 'Next-project focus scale', .001)
      assert.ok((await style(heading, 'backgroundSize')).startsWith('100%'))
      await next.press('Enter'); await page.waitForURL(base + '/work/nocturne')
      assert.equal(await page.locator('h1').innerText(), 'Nocturne')
    })
    await scenario('Unresolved films remain non-interactive', width, reduced, async () => {
      for (const slug of ['aster-house', 'nocturne', 'kiln']) {
        await open('/work/' + slug)
        const posters = page.locator('[data-media-state="unresolved"]')
        assert.ok(await posters.count() > 0)
        assert.equal(await posters.locator('button, a, video, [tabindex]').count(), 0)
        assert.equal(await posters.getByRole('button').count(), 0)
      }
    })
    console.log(`Completed ${width}px ${reduced ? 'reduced' : 'normal'} interaction checks`)
  }
  if (stage === 'before') fs.writeFileSync(`${output}/baseline.json`, JSON.stringify(baseline, null, 2) + '\n')
  else {assert.deepEqual(protectedFiles(), baseline.files); assert.deepEqual(await revisions(), baseline.revisions)}
  fs.writeFileSync(`${output}/${stage}.json`, JSON.stringify({at: new Date().toISOString(), base, widths, checks, interactions, failures, protectedFilesUnchanged: stage !== 'before', sanityRevisionsUnchanged: stage !== 'before'}, null, 2) + '\n')
  console.log(`${checks.length} static checks; ${interactions.length} interaction scenarios passed; ${failures.length} failures`)
  assert.equal(failures.length, 0)
} finally {await browser.close()}
