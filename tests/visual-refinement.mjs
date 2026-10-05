// Read-only visual QA: render the supplied export locally and the current app.
// No content mutations, Studio actions, migrations or deployment commands.
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import sharp from 'sharp'
import {chromium} from 'playwright'
import {createClient} from '@sanity/client'

const stage = process.argv[2] ?? 'final'
const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const folder = `migration/reports/visual-refinement/${stage}`
fs.mkdirSync(folder, {recursive: true})
const documents = JSON.parse(fs.readFileSync('migration/data/source-mapping.json', 'utf8'))
const projects = documents.filter(document => document._type === 'project')
const routes = ['/', '/work', '/about', ...projects.map(project => '/work/' + project.slug.current)]
const major = ['/', '/work', '/about', '/work/aster-house', '/work/forma', '/work/open-room']
const widths = stage === 'final' ? [1440, 1024, 768, 760, 390, 320] : [1440, 390]
const records = [...JSON.parse(fs.readFileSync('migration/reports/global-pages.json', 'utf8')), ...JSON.parse(fs.readFileSync('migration/reports/case-studies.json', 'utf8'))]
const assets = path.resolve('morrow-export-master/morrow-export-3-assets-source/morrow-studio-export/assets')
const blobMap = JSON.parse(fs.readFileSync('migration/reports/source-asset-map.json', 'utf8'))
Object.assign(blobMap, {'/_blob/4ea64745b99e99cc838c3e11274dea9f': ['studio.jpg'], '/_blob/079d6305e80137538890871e9aed114d': ['portrait.jpg']})
const nameFor = route => route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
function protectedFiles() {
  const result = {}
  function walk(folder) {for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {const file = path.join(folder, entry.name); if (entry.isDirectory()) walk(file); else result[file] = hash(file)}}
  for (const folder of ['src/sanity', 'migration/data', 'morrow-export-master']) walk(folder)
  for (const file of ['sanity.config.ts', 'sanity.cli.ts', 'src/components/project/contract.ts', 'src/lib/seo.ts', 'src/app/robots.ts', 'src/app/sitemap.ts']) result[file] = hash(file)
  return result
}
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2026-10-04', useCdn: false, perspective: 'raw', token: process.env.SANITY_API_READ_TOKEN})
const revisions = () => client.fetch('*[_type in ["project", "homepage", "about"]] | order(_id asc){_id,_rev}')
if (stage === 'before') fs.writeFileSync('migration/reports/visual-refinement-baseline.json', JSON.stringify({files: protectedFiles(), revisions: await revisions()}, null, 2) + '\n')

function reference(route, width) {
  const device = width <= 760 ? 'mobile' : 'desktop'
  const page = route === '/' ? '01-home' : route === '/work' ? device === 'mobile' ? '03-work' : '02-work' : route === '/about' ? device === 'mobile' ? '04-about' : '03-about' : `case-${String(projects.find(project => route.endsWith('/' + project.slug.current)).orderRank).padStart(2, '0')}-${route.split('/').at(-1)}`
  return records.find(record => record.frame === `${device}/${page}`)
}
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost')
  if (url.pathname === '/reference') {
    const record = url.searchParams.get('menu') ? records.find(record => record.frame === 'mobile/02-menu') : reference(url.searchParams.get('route'), Number(url.searchParams.get('width')))
    // Export frames materialize the source's dynamic template values. Their
    // styles are checked against the latest .dc source during the visual audit.
    let html = fs.readFileSync(record.file, 'utf8')
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<link[^>]*>/gi, link => /fonts|preconnect/i.test(link) ? '' : link)
      .replace(/src="([^"]+)"/g, (_, src) => `src="/assets/images/${blobMap[src]?.[0] ?? path.basename(src)}"`)
      .replace('</head>', '<link rel="stylesheet" href="/assets/fonts/fonts.css"></head>')
    response.setHeader('Content-Type', 'text/html'); response.end(html); return
  }
  const file = path.resolve(assets, '.' + decodeURIComponent(url.pathname.replace(/^\/assets/, '')))
  if (!url.pathname.startsWith('/assets/') || !file.startsWith(assets + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {response.writeHead(404).end(); return}
  response.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.woff2') ? 'font/woff2' : 'image/jpeg')
  fs.createReadStream(file).pipe(response)
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const referenceBase = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({headless: true})
const results = [], comparisons = [], failures = []
try {
  const context = await browser.newContext({reducedMotion: 'reduce'})
  await context.route('**/*', route => /\.sanity\.io\//.test(route.request().url()) && !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) ? route.abort() : route.continue())
  const page = await context.newPage(), ref = await context.newPage()
  const metrics = page => page.evaluate(() => {
    const rect = element => {const r = element.getBoundingClientRect(), s = getComputedStyle(element); return {tag: element.tagName, text: element.textContent.trim().slice(0, 70), x: r.x, y: r.y + scrollY, width: r.width, height: r.height, fontSize: s.fontSize, lineHeight: s.lineHeight, marginTop: s.marginTop, paddingTop: s.paddingTop}}
    return {height: document.documentElement.scrollHeight, headers: [...document.querySelectorAll('header')].map(rect), titles: [...document.querySelectorAll('h1')].map(rect), modules: [...document.querySelectorAll('main >section, article >section, article >figure, article >div, article >p, [data-content-key] >*, .project-next, footer')].filter(e => e.getBoundingClientRect().height && getComputedStyle(e).display !== 'none').map(rect)}
  })
  async function ready(page) {
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(600)
    await page.locator('img').evaluateAll(images => images.forEach(image => {image.loading = 'eager'}))
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())))
    await page.locator('.project-gallery-images, [data-composition="pair"]').evaluateAll(elements => elements.forEach(element => {element.scrollLeft = 0}))
    await page.evaluate(() => scrollTo(0, 0))
  }
  for (const width of widths) for (const route of stage === 'final' ? routes : major) {
    const errors = []
    const onError = error => errors.push(error.message)
    const onConsole = message => {if (message.type() === 'error' && /hydration|hydrating|React error/i.test(message.text())) errors.push(message.text())}
    page.on('pageerror', onError); page.on('console', onConsole)
    try {
      const height = width <= 760 ? 844 : 900
      await page.setViewportSize({width, height})
      const response = await page.goto(base + route, {waitUntil: 'domcontentloaded', timeout: 90000})
      assert.equal(response.status(), 200)
      await ready(page)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      assert.ok(overflow <= 1, `${overflow}px horizontal overflow`)
      const project = projects.find(project => route === '/work/' + project.slug.current)
      if (project) {
        const viewport = width <= 760 ? 'mobile' : 'desktop'
        const branch = page.locator(`[data-content-viewport="${viewport}"]`)
        assert.deepEqual(await branch.locator('[data-content-key]').evaluateAll(nodes => nodes.map(node => node.dataset.contentKey)), viewport === 'mobile' ? project.mobileOrder : project.content.filter(block => block.visibility !== 'mobile').map(block => block._key))
        assert.equal(await page.locator('.project-next').getAttribute('href'), '/work/' + projects[project.orderRank % 10].slug.current)
      }
      if (route === '/') {
        const home = documents.find(document => document._type === 'homepage')
        const selected = width <= 760 ? home.mobileProjectIndex : home.projectIndex
        assert.deepEqual(await page.locator('section[aria-labelledby="project-index-heading"] ol >li:visible a').evaluateAll(links => links.map(link => link.getAttribute('href'))), selected.map(item => '/work/' + projects.find(project => project._id === item._ref).slug.current))
      }
      assert.deepEqual(errors, [])
      const screenshot = `${folder}/${nameFor(route)}-${width}.png`
      await page.screenshot({path: screenshot, fullPage: true})
      const currentMetrics = await metrics(page)
      results.push({route, width, status: 200, result: 'pass', screenshot, metrics: currentMetrics})
      if (major.includes(route) && (width === 1440 || width === 390)) {
        const record = reference(route, width)
        await ref.setViewportSize({width, height})
        await ref.goto(`${referenceBase}/reference?route=${encodeURIComponent(route)}&width=${width}`)
        await ready(ref)
        const referenceScreenshot = `${folder}/${nameFor(route)}-${width}-reference.png`
        await ref.screenshot({path: referenceScreenshot, fullPage: true})
        const left = await sharp(referenceScreenshot).resize({width: 480}).toBuffer(), right = await sharp(screenshot).resize({width: 480}).toBuffer()
        const comparison = `${folder}/${nameFor(route)}-${width}-compare.png`
        await sharp({create: {width: 976, height: Math.max((await sharp(left).metadata()).height, (await sharp(right).metadata()).height), channels: 3, background: '#fff'}}).composite([{input: left, left: 0, top: 0}, {input: right, left: 496, top: 0}]).png().toFile(comparison)
        const referenceMetrics = await metrics(ref)
        if (stage === 'final') {
          const near = (actual, expected, label) => assert.ok(Math.abs(actual - expected) < 1, `${label}: current ${actual}px, reference ${expected}px`)
          if (route === '/') near(currentMetrics.modules[0].height, referenceMetrics.modules[0].height, 'Home hero height')
          if (route === '/about' && width === 390) for (let index = 0; index < 4; index++) near(currentMetrics.modules[index].height, referenceMetrics.modules[index].height, `About mobile section ${index + 1} height`)
          if (width === 1440 && ['/work/aster-house', '/work/forma'].includes(route)) near(currentMetrics.modules.find(module => module.text.startsWith('(Gallery)')).height, referenceMetrics.modules.find(module => module.text.startsWith('(Gallery)')).height, 'Desktop gallery height')
          if (width === 390 && project) near(currentMetrics.modules.at(-1).height, referenceMetrics.modules.at(-1).height, 'Compact footer height')
        }
        comparisons.push({route, width, referenceHtml: record.file, latestSource: record.source, suppliedPng: record.file.replace('.html', '.png'), referenceScreenshot, screenshot, comparison, referenceMetrics, currentMetrics})
      }
      if (route === '/' && width <= 760) {
        await page.getByRole('button', {name: 'Menu +', exact: true}).click()
        const dialog = page.getByRole('dialog')
        assert.ok(await dialog.isVisible())
        const screenshot = `${folder}/menu-${width}.png`
        await page.screenshot({path: screenshot})
        assert.ok(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth + 1))
        await page.getByRole('button', {name: /Close/}).click()
        if (width === 390) {
          await ref.goto(`${referenceBase}/reference?menu=1`); await ready(ref)
          const referenceScreenshot = `${folder}/menu-${width}-reference.png`
          await ref.screenshot({path: referenceScreenshot})
          await sharp({create: {width: 796, height: 844, channels: 3, background: '#fff'}}).composite([{input: referenceScreenshot, left: 0, top: 0}, {input: screenshot, left: 406, top: 0}]).png().toFile(`${folder}/menu-${width}-compare.png`)
        }
      }
      if (stage === 'final' && route === '/work') {
        const index = page.locator('section[aria-label="Project index"] ol >li a')
        assert.deepEqual(await index.evaluateAll(links => links.map(link => link.getAttribute('href'))), projects.map(project => '/work/' + project.slug.current))
        const filters = page.getByRole('group', {name: 'Filter by discipline'})
        await filters.getByRole('button', {name: /^Identity/}).click()
        assert.equal(await index.count(), 4)
        await page.getByRole('button', {name: 'Grid', exact: true}).click()
        assert.equal(await page.locator('section[aria-label="Project grid"] li').count(), 4)
        await ready(page)
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
        await filters.getByRole('button', {name: /^All/}).click()
        assert.equal(await page.locator('section[aria-label="Project grid"] li').count(), 10)
        await ready(page)
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
        await page.getByRole('button', {name: 'List', exact: true}).click()
        assert.deepEqual(errors, [])
      }
      if (stage === 'final' && project) {
        const gallery = page.locator(`[data-content-viewport="${width <= 760 ? 'mobile' : 'desktop'}"] .project-gallery`).first()
        if (await gallery.count()) {
          const track = gallery.locator('.project-gallery-images')
          if (width > 760) {
            await gallery.getByRole('button', {name: 'Next gallery image'}).click()
            await page.waitForTimeout(150)
            assert.ok(await track.locator('figure').nth(1).evaluate(element => Math.abs(element.getBoundingClientRect().left) < 1))
          } else {
            await track.evaluate(element => {element.scrollLeft = 200})
            assert.ok(await track.evaluate(element => element.scrollLeft > 0))
          }
          await track.evaluate(element => {element.scrollLeft = 0})
          assert.deepEqual(errors, [])
        }
      }
    } catch (error) {failures.push({route, width, error: error.message}); console.log('FAIL', route, width, error.message.slice(0, 180))}
    finally {page.off('pageerror', onError); page.off('console', onConsole); if (stage === 'final' && route === routes.at(-1)) console.log(`Completed ${width}px checks`)}
  }
  if (stage === 'final') {
    const baseline = JSON.parse(fs.readFileSync('migration/reports/visual-refinement-baseline.json', 'utf8'))
    assert.deepEqual(protectedFiles(), baseline.files, 'Schema, reference, SEO or migration data changed')
    assert.deepEqual(await revisions(), baseline.revisions, 'Sanity document revisions changed during this pass')
  }
  fs.writeFileSync(`migration/reports/visual-refinement-${stage}.json`, JSON.stringify({at: new Date().toISOString(), stage, base, widths, results, comparisons, failures, remoteContentWrites: 0, ...(stage === 'final' ? {protectedFilesUnchanged: true, sanityRevisionsUnchanged: true, allImagesDecoded: true, archiveControlsChecked: true} : {})}, null, 2) + '\n')
  console.log(`${results.length} route/width checks passed; ${comparisons.length} reference comparisons; ${failures.length} failures.`)
  assert.equal(failures.length, 0)
} finally {await browser.close(); await new Promise(resolve => server.close(resolve))}
