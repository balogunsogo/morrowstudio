/* Local browser verification: no Sanity mutations, no login, no saved Studio edits. */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import {chromium} from 'playwright'

async function main() {
  const root = process.cwd()
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname
    if (!pathname.startsWith('/migration/fixtures/') && !pathname.startsWith('/morrow-export-master/morrow-export-3-assets-source/morrow-studio-export/assets/')) {
      response.writeHead(404).end(); return
    }
    const file = path.resolve(root, `.${decodeURIComponent(pathname)}`)
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end(); return
    }
    response.setHeader('Content-Type', file.endsWith('.html') ? 'text/html' : file.endsWith('.jpg') ? 'image/jpeg' : 'font/woff2')
    fs.createReadStream(file).pipe(response)
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const fixtureUrl = `http://127.0.0.1:${server.address().port}/migration/fixtures/contract-preview.html`
  let browser
  const results = []
  try {
    browser = await chromium.launch({headless: true})
    const page = await browser.newPage()
    for (const [width, viewport] of [[1440, 'desktop'], [760, 'mobile'], [761, 'desktop'], [390, 'mobile']]) {
      await page.setViewportSize({width, height: 900})
      await page.goto(fixtureUrl)
      await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => null))))
      const active = page.locator(`[data-content-viewport="${viewport}"]`)
      const hidden = page.locator(`[data-content-viewport="${viewport === 'desktop' ? 'mobile' : 'desktop'}"]`)
      assert.equal(await active.isVisible(), true)
      assert.equal(await hidden.isVisible(), false)
      assert.equal(await active.locator('[data-content-key]').first().getAttribute('data-content-key'), viewport === 'mobile' ? 'outcome' : 'intro')
      assert.equal(await active.locator('[data-content-key="intro"] .project-text > div').innerText(), viewport === 'mobile' ? 'Short mobile introduction.' : 'Desktop introduction.')
      assert.equal(await active.locator('[data-content-key="gallery"] img').count(), 2)
      for (const image of await active.locator('[data-content-key="pair"] img').all()) {
        assert.equal(await image.isVisible(), true)
        assert.ok(await image.evaluate(element => element.naturalWidth > 0))
      }
      assert.equal(await page.locator(`.project-hero .project-${viewport}-only img`).getAttribute('alt'), `${viewport}hero`)
      assert.equal(await active.locator('[data-media-state="unresolved"] button, [data-media-state="unresolved"] video').count(), 0)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
      assert.equal(overflow, false)
      if (width === 1440 || width === 390) await page.screenshot({path: `migration/fixtures/contract-${viewport}.png`, fullPage: true})
      results.push({fixture: 'contract', width, viewport, result: 'pass'})
    }
    const appUrl = process.env.APP_BASE_URL || 'http://127.0.0.1:3100'
    for (const route of ['/', '/work', '/work/aster-house', '/about', '/studio']) {
      const errors = []
      const listener = error => errors.push(error.name)
      page.on('pageerror', listener)
      const response = await page.goto(appUrl + route, {waitUntil: 'domcontentloaded'})
      assert.equal(response.status(), 200, route)
      if (route === '/work/aster-house') {
        const branch=page.locator('[data-content-viewport="mobile"]')
        await branch.locator('.project-statement').waitFor()
        assert.equal(await branch.locator('[data-content-key]').count(), 11)
        assert.equal(await branch.locator('.project-image-pair img').count(), 4)
        assert.equal(await branch.locator('[data-media-state="unresolved"] img').count(), 1)
      } else if (route !== '/studio') assert.ok((await page.locator('body').innerText()).trim().length > 0)
      else {
        await page.getByText(/Sign in|Connect this studio to your project/).first().waitFor({timeout: 30000})
      }
      assert.equal(errors.length, 0, `${route} browser exceptions`)
      page.removeListener('pageerror', listener)
      results.push({route, status: response.status(), result: route === '/studio' ? 'Studio connection gate mounted (no registration, login or edit)' : 'pass'})
    }
    fs.writeFileSync('migration/reports/phase-2-browser-verification.json', JSON.stringify(results, null, 2))
    console.log(JSON.stringify(results, null, 2))
  } finally {
    if (browser) await browser.close()
    await new Promise(resolve => server.close(resolve))
  }
}

main().catch(error => {console.error(error.message); process.exitCode = 1})
