import assert from 'node:assert/strict'
import fs from 'node:fs'
import {firefox} from 'playwright'

const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const {routes} = JSON.parse(fs.readFileSync('.tmp/awwwards/baseline/results.json', 'utf8'))
const browser = await firefox.launch({headless: true})
const report = {checks: [], failures: []}
try {
  const page = await browser.newPage({reducedMotion: 'reduce'})
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [320, 390, 1440]) for (const route of routes) {
    errors.length = 0
    try {
      await page.setViewportSize({width, height: 900})
      const response = await page.goto(base + route, {waitUntil: 'load', timeout: 90000})
      assert.ok([200, 304].includes(response.status()), 'Successful response or valid cache revalidation')
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(200)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      assert.equal(await page.locator('h1:visible').count(), 1)
      assert.deepEqual(errors, [])
      report.checks.push({route, width, result: 'pass'})
    } catch (error) {report.failures.push({route, width, error: error.message})}
  }
  await page.setViewportSize({width: 390, height: 844})
  await page.goto(base, {waitUntil: 'load'})
  await page.keyboard.press('Tab')
  assert.equal(await page.locator('.skip-link').evaluate(el => document.activeElement === el), true)
  await page.keyboard.press('Enter')
  assert.equal(await page.locator('main').evaluate(el => document.activeElement === el), true)
  await page.getByRole('button', {name: 'Menu +'}).click()
  await page.getByRole('dialog').waitFor()
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('button', {name: 'Menu +'}).evaluate(el => document.activeElement === el), true)
  report.menuAndSkip = 'pass'
} catch (error) {report.failures.push({scenario: 'keyboard', error: error.message})}
finally {await browser.close(); fs.writeFileSync('.tmp/awwwards/firefox.json', JSON.stringify(report, null, 2) + '\n')}
console.log(JSON.stringify({checks: report.checks.length, failures: report.failures.length, menuAndSkip: report.menuAndSkip}))
if (report.failures.length) process.exitCode = 1
