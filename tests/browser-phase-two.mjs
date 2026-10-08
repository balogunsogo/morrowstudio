import assert from 'node:assert/strict'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import {chromium} from 'playwright'
import {createClient} from '@sanity/client'
import {JSDOM} from 'jsdom'

const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const output = '.tmp/awwwards/phase-2'
fs.mkdirSync(output, {recursive: true})
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2026-10-04', useCdn: false, perspective: 'published', token: process.env.SANITY_API_READ_TOKEN})
const documents = await client.fetch('*[_type in ["project", "homepage", "about"]] | order(_id asc){...}')
const projects = documents.filter(doc => doc._type === 'project' && doc.slug?.current)
const home = documents.find(doc => doc._type === 'homepage' && doc._id === 'homepage')
const routes = ['/', '/work', '/about', ...projects.map(doc => '/work/' + doc.slug.current)]
const expected = {reordered: ['third', 'first'], subset: ['second'], outside: ['outside'], absent: ['first', 'second', 'third'], empty: ['first', 'second', 'third']}
const server = http.createServer((request, response) => {
  const name = new URL(request.url, 'http://localhost').pathname.slice(1)
  if (!Object.hasOwn(expected, name)) {response.writeHead(404).end(); return}
  response.setHeader('Content-Type', 'text/html')
  response.end(fs.readFileSync(`${output}/fixtures/${name}.html`))
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const report = {base, at: new Date().toISOString(), fixtures: [], contrast: [], posters: [], accessibility: [], editorial: [], sitemap: [], failures: []}
const browser = await chromium.launch({headless: true})
try {
  const page = await browser.newPage({reducedMotion: 'reduce'})
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.route('**/*', route => /\.sanity\.io\//.test(route.request().url()) && !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) ? route.abort() : route.continue())
  for (const width of [320, 390, 760, 761, 1440]) for (const [name, slugs] of Object.entries(expected)) {
    await page.setViewportSize({width, height: 900})
    await page.goto(`http://127.0.0.1:${server.address().port}/${name}`)
    const branch = width <= 760 ? 'mobile' : 'desktop'
    const list = page.locator(`[data-index-viewport="${branch}"]`)
    assert.ok(await list.isVisible())
    assert.ok(!await page.locator(`[data-index-viewport="${branch === 'mobile' ? 'desktop' : 'mobile'}"]`).isVisible())
    assert.deepEqual(await list.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href'))), (width <= 760 ? slugs : ['first', 'second', 'third']).map(slug => '/work/' + slug))
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    report.fixtures.push({name, width, result: 'pass'})
  }
  await page.setViewportSize({width: 1440, height: 900})
  await page.goto(base)
  const rows = page.locator('[data-index-viewport="desktop"] >li')
  const color = (row, part) => row.locator(`[class*="${part}"]`).evaluate(el => getComputedStyle(el).color)
  assert.equal(await color(rows.nth(1), 'indexNumber'), 'rgb(107, 104, 98)')
  assert.equal(await color(rows.nth(1), 'indexYear'), 'rgb(107, 104, 98)')
  assert.equal(await color(rows.first(), 'indexYear'), 'rgb(21, 21, 19)')
  report.contrast.push({state: 'normal/inactive and initial active', result: 'pass'})
  await rows.nth(1).hover()
  await page.waitForTimeout(200)
  assert.equal(await rows.nth(1).getAttribute('data-active'), 'true')
  assert.equal(await color(rows.nth(1), 'indexYear'), 'rgb(21, 21, 19)')
  assert.equal(await color(rows.first(), 'indexYear'), 'rgb(107, 104, 98)')
  report.contrast.push({state: 'hover/active and previous inactive', result: 'pass'})
  await page.keyboard.press('Tab')
  await rows.nth(2).locator('a').focus()
  await page.waitForTimeout(200)
  assert.equal(await rows.nth(2).getAttribute('data-active'), 'true')
  assert.equal(await color(rows.nth(2), 'indexNumber'), 'rgb(21, 21, 19)')
  assert.notEqual(await rows.nth(2).locator('a').evaluate(el => getComputedStyle(el).outlineStyle), 'none')
  report.contrast.push({state: 'keyboard focus/active and visible outline', result: 'pass'})
  await page.screenshot({path: `${output}/index-focus.png`})
  const inventory = JSON.parse(fs.readFileSync(process.env.EDITORIAL_INVENTORY ?? `${output}/editorial.json`, 'utf8'))
  for (const width of [390, 1440]) for (const route of routes) {
    await page.setViewportSize({width, height: 900})
    await page.goto(base + route, {waitUntil: 'load'})
    await page.evaluate(() => document.fonts.ready)
    await page.addScriptTag({path: path.resolve('node_modules/axe-core/axe.min.js')})
    const axe = await page.evaluate(() => window.axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']}}))
    report.accessibility.push({route, width, violations: axe.violations.map(item => ({id: item.id, nodes: item.nodes.length})), incomplete: axe.incomplete.map(item => ({id: item.id, nodes: item.nodes.length}))})
    assert.equal(axe.violations.length, 0, `${route}@${width}: ${axe.violations.map(item => item.id)}`)
    if (route === '/') {
      const refs = width <= 760 && home.mobileProjectIndex?.length ? home.mobileProjectIndex : home.projectIndex
      const selected = refs.map(ref => projects.find(project => project._id === ref._ref)).filter(project => project?.slug?.current)
      assert.deepEqual(await page.locator('[data-index-viewport] a:visible').evaluateAll(links => links.map(link => link.getAttribute('href'))), selected.map(project => '/work/' + project.slug.current))
    }
    if (['/work/aster-house', '/work/nocturne', '/work/kiln'].includes(route)) {
      const poster = page.locator('[data-media-state="unresolved"]:visible')
      assert.equal(await poster.count(), 1)
      assert.equal(await poster.locator('video, audio, button, a, [role="button"], [tabindex]').count(), 0)
      await poster.scrollIntoViewIfNeeded()
      await poster.locator('img').evaluate(image => image.decode())
      assert.equal(await poster.evaluate(el => getComputedStyle(el).cursor), 'auto')
      await poster.screenshot({path: `${output}/poster-${route.split('/').at(-1)}-${width}.png`})
      report.posters.push({route, width, result: 'pass', text: await poster.innerText()})
    }
    const entry = inventory.occurrences.find(row => route === (row.document._type === 'about' ? '/about' : `/work/${row.document.slug?.current}`))
    if (entry) {
      const text = await page.locator('main').innerText()
      // innerText reflects CSS text-transform on the small image captions.
      const normalized = text.replace(/\s+/g, ' ').trim().toLocaleLowerCase()
      const scope = width <= 760 ? 'mobile' : 'desktop'
      for (const occurrence of entry.entries.filter(item => item.viewports.includes(scope))) assert.ok(normalized.includes(occurrence.text.replace(/\s+/g, ' ').trim().toLocaleLowerCase()), `Editorial visibility mismatch: ${route} ${scope} ${occurrence.path}`)
      report.editorial.push({route, width, activeFields: entry.entries.filter(item => item.viewports.includes(scope)).length, result: 'pass'})
    }
  }
  assert.deepEqual(errors, [])
  for (let request = 0; request < 2; request++) {
    const response = await fetch(base + '/sitemap.xml')
    assert.equal(response.status, 200)
    const cacheControl = response.headers.get('cache-control')
    assert.ok(cacheControl?.includes('max-age=0'))
    const xml = new JSDOM(await response.text(), {contentType: 'text/xml'}).window.document
    const urls = [...xml.querySelectorAll('url >loc')].map(el => el.textContent)
    assert.deepEqual([...urls].sort(), routes.map(route => new URL(route, 'https://morrowstudio.balogunoluwasogo.com').href).sort())
    report.sitemap.push({request: request + 1, status: response.status, cacheControl, urls, result: 'pass'})
  }
  const revisions = await client.fetch('*[_type in ["project", "homepage", "about"]] | order(_id asc){_id,_rev}')
  assert.deepEqual(revisions, documents.map(({_id, _rev}) => ({_id, _rev})))
  report.cmsRevisionsUnchanged = true
} catch (error) {report.failures.push(error.message); process.exitCode = 1; console.error(error.message)}
finally {fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2)); await browser.close(); await new Promise(resolve => server.close(resolve))}
console.log(JSON.stringify({fixtures: report.fixtures.length, contrast: report.contrast.length, axePages: report.accessibility.length, posters: report.posters.length, editorial: report.editorial.length, failures: report.failures}))
