import fs from 'node:fs'
import http from 'node:http'
import assert from 'node:assert/strict'
import {build} from 'esbuild'
import {chromium} from 'playwright'

const sourceFile = 'migration/data/source-mapping.json'
const original = fs.readFileSync(sourceFile, 'utf8')
const projects = JSON.parse(original).filter(p => ['Aster House', 'Forma', 'Meridian'].includes(p.title))
const bundle = await build({entryPoints: ['tests/studio-keyed-fixture.tsx'], bundle: true, write: false, platform: 'browser', format: 'esm', jsx: 'automatic', define: {'process.env.NODE_ENV': '"production"'}, logLevel: 'warning'})
const server = http.createServer((request, response) => {
  if (request.url === '/fixture.js') {response.setHeader('Content-Type', 'text/javascript'); response.end(bundle.outputFiles[0].contents)}
  else {response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><html><head><meta charset="utf-8"><title>Studio input verification</title></head><body><div id="root"></div><script type="module" src="/fixture.js"></script></body></html>')}
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({headless: true})
const results = []
let studioBoundary
try {
  const context = await browser.newContext({viewport: {width: 1280, height: 1000}})
  // Prevent all remote requests from this isolated fixture.
  await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort())
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(base)
  await page.getByRole('heading', {name: 'Studio inputs — local verification'}).waitFor()
  const state = () => page.locator('#fixture-state').textContent().then(JSON.parse)
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    await page.getByLabel('Project', {exact: true}).selectOption(String(i))
    const sections = page.locator('[data-field="sections"]')
    await sections.getByRole('heading', {name: `${project.title} — Mobile sections`}).waitFor()
    assert.deepEqual((await state()).document, project, 'Opening the input changed stored data')
    assert.ok(!(await sections.innerText()).includes(project.mobileOrder[0]), 'Known hash exposed')
    assert.match(await sections.innerText(), /Text block/)
    const groups = page.locator('[data-field="document-groups"]')
    assert.match(await groups.innerText(), /Project title/)
    await groups.getByRole('button', {name: 'Mobile', exact: true}).click()
    assert.match(await groups.innerText(), /Mobile section order/)
    assert.ok(!(await groups.innerText()).includes('canonical'))
    assert.ok((await page.locator('[data-field="block-previews"]').innerText()).length)
    if (project.title === 'Aster House') assert.match(await page.locator('[data-field="video"]').first().innerText(), /Video source still needed/)
    await sections.getByRole('button', {name: 'Move up', exact: true}).nth(1).click()
    assert.deepEqual((await state()).document.mobileOrder, [project.mobileOrder[1], project.mobileOrder[0], ...project.mobileOrder.slice(2)])
    const removed = (await state()).document.mobileOrder[0]
    await sections.getByRole('button', {name: 'Remove', exact: true}).first().click()
    assert.ok(!(await state()).document.mobileOrder.includes(removed))
    await sections.getByLabel('Add section', {exact: true}).selectOption(removed)
    assert.equal((await state()).document.mobileOrder.at(-1), removed)
    await sections.locator('[data-row]').first().getByRole('combobox').focus()
    await page.keyboard.press('Tab')
    assert.equal(await page.locator(':focus').textContent(), 'Remove')
    await page.getByRole('button', {name: 'Inject stale selection'}).click()
    assert.match(await sections.innerText(), /Unknown section · fixture-stale-key/)
    assert.equal((await state()).document.mobileOrder.at(-1), 'fixture-stale-key')
    await page.getByLabel('Read only', {exact: true}).check()
    assert.ok(await sections.getByLabel('Add section', {exact: true}).isDisabled())
    assert.ok(await sections.getByRole('button', {name: 'Use default order'}).isDisabled())
    await page.getByLabel('Read only', {exact: true}).uncheck()
    await sections.getByRole('button', {name: 'Use default order'}).click()
    assert.equal((await state()).document.mobileOrder, undefined)
    await sections.getByRole('button', {name: 'Customize order'}).click()
    assert.deepEqual((await state()).document.mobileOrder, project.content.filter(b => b.visibility !== 'desktop').map(b => b._key))
    const gallery = project.content.find(b => b._type === 'gallery')
    if (gallery) {
      const group = page.locator('[data-field="gallery"]')
      if (!gallery.mobileImageKeys) {
        assert.match(await group.innerText(), /default order from the main content/)
        await group.getByRole('button', {name: 'Customize order'}).click()
      }
      const before = (await state()).document.content.find(b => b._key === gallery._key).mobileImageKeys
      await group.getByRole('button', {name: 'Move up', exact: true}).nth(1).click()
      assert.deepEqual((await state()).document.content.find(b => b._key === gallery._key).mobileImageKeys, [before[1], before[0], ...before.slice(2)])
      assert.ok(!(await group.innerText()).includes(before[0]))
    }
    const credits = project.content.find(b => b._type === 'creditsBlock')
    const group = page.locator('[data-field="credits"]')
    assert.ok((await group.innerText()).includes(credits.items.find(item => item._key === credits.mobileCreditKeys[0]).role))
    await group.getByRole('button', {name: 'Remove', exact: true}).first().click()
    await group.getByLabel('Add credit', {exact: true}).selectOption(credits.mobileCreditKeys[0])
    assert.equal((await state()).document.content.find(b => b._key === credits._key).mobileCreditKeys.at(-1), credits.mobileCreditKeys[0])
    await page.locator('[data-field="override"]').getByRole('combobox').selectOption(credits.items[1]._key)
    assert.equal((await state()).target, credits.items[1]._key)
    const edited = (await state()).document
    const canonical = content => content.map(block => Object.fromEntries(Object.entries(block).filter(([key]) => !['mobileImageKeys', 'mobileCreditKeys'].includes(key))))
    assert.deepEqual(canonical(edited.content), canonical(project.content), 'Canonical content or keys changed')
    await page.screenshot({path: `migration/reports/studio-keys-${project.slug.current}.png`, fullPage: true})
    results.push({project: project.title, result: 'pass', checks: ['friendly labels', 'exact key reorder', 'remove/add', 'keyboard focus', 'stale retention', 'read-only', 'inherited order', 'gallery when present', 'credit target', 'canonical keys unchanged']})
  }
  for (const [index, title, group, field] of [[3, 'Home', 'Footer', 'General enquiries email'], [4, 'About', 'Contact', 'Studio address']]) {
    await page.getByLabel('Project', {exact: true}).selectOption(String(index))
    const groups = page.locator('[data-field="document-groups"]')
    await groups.getByRole('heading', {name: `${title} — Field groups`}).waitFor()
    await groups.getByRole('button', {name: group, exact: true}).click()
    assert.match(await groups.innerText(), new RegExp(field))
    assert.match(await page.locator('main').innerText(), /Changes save as drafts/)
    if (title === 'About') assert.match(await page.locator('main').innerText(), /Placeholder content/)
    await page.screenshot({path: `migration/reports/studio-ux-${title.toLowerCase()}.png`, fullPage: true})
    results.push({document: title, result: 'pass', checks: ['schema field groups and guidance', 'draft/Presentation guidance', 'placeholder guidance when present'], boundary: 'Read-only schema inspection adapter; not the authenticated native document form.'})
  }
  assert.deepEqual(errors, [])
  assert.equal(fs.readFileSync(sourceFile, 'utf8'), original)
  // Separate read-only check of the actual Studio. Never authenticate/register
  // it here; those actions require the user's existing browser session.
  const liveContext = await browser.newContext()
  await liveContext.route('**/*', route => {
    const request = route.request()
    const remote = /\.sanity\.io\//.test(request.url())
    return remote && !['GET', 'HEAD', 'OPTIONS'].includes(request.method()) ? route.abort() : route.continue()
  })
  const studio = await liveContext.newPage()
  try {
    const response = await studio.goto(process.env.STUDIO_BASE_URL ?? 'http://localhost:3000/studio', {waitUntil: 'domcontentloaded', timeout: 60000})
    await studio.getByText(/Connect.*Studio|Sign in|Log in/).first().waitFor({timeout: 30000})
    studioBoundary = {status: response.status(), result: 'authentication/connection gate', liveDocumentControlsVerified: false}
    await studio.screenshot({path: 'migration/reports/studio-keys-auth-boundary.png', fullPage: true})
  } catch (error) {
    studioBoundary = {result: 'unavailable', reason: error.message.replace(/\u001b\[[\d;]*m/g, ''), liveDocumentControlsVerified: false}
    await studio.screenshot({path: 'migration/reports/studio-keys-auth-boundary.png', fullPage: true}).catch(() => {})
  }
  studioBoundary.visibleText = (await studio.locator('body').innerText()).slice(0, 2000)
  if (/Log in to your account/.test(studioBoundary.visibleText)) studioBoundary.result = 'normal Sanity login'
  const report = JSON.stringify({at: new Date().toISOString(), results, errors, sourceUnchanged: true, remoteWrites: 0, studioBoundary, boundary: 'Production selectors/guidance and actual Sanity FormValueProvider; array editing adapter is memory-only and document groups use a read-only schema inspection adapter. Native forms and drag/drop still require signed-in live Studio access.'}, null, 2) + '\n'
  fs.writeFileSync('migration/reports/studio-keyed-browser.json', report)
  fs.writeFileSync('migration/reports/studio-ux-browser.json', report)
  console.log(`${results.length} document scenarios passed isolated browser checks; live Studio: ${studioBoundary.result}`)
} finally {await browser.close(); await new Promise(resolve => server.close(resolve))}
