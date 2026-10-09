import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {chromium} from 'playwright'

const base = process.env.APP_BASE_URL ?? 'http://localhost:3100'
const output = '.tmp/mobile-menu-email'
fs.mkdirSync(output, {recursive: true})
const email = 'balogunoluwasogo@gmail.com'
const report = {at: new Date().toISOString(), base, cases: [], accessibility: [], failures: []}
const browser = await chromium.launch({headless: true})
try {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of ['/', '/about', '/work', '/work/sola-ceramics']) {
    for (const width of [320, 360, 374, 375, 390, 430, 479, 480, 760]) {
      for (const reduced of [false, true]) {
        try {
          errors.length = 0
          await page.setViewportSize({width, height: 640})
          await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'})
          assert.equal((await page.goto(base + route)).status(), 200)
          await page.evaluate(() => document.fonts.ready)
          const menu = page.getByRole('button', {name: 'Menu +', exact: true})
          await menu.click()
          const dialog = page.getByRole('dialog', {name: 'Site menu'})
          const mail = dialog.getByRole('link', {name: email, exact: true})
          await mail.scrollIntoViewIfNeeded()
          assert.equal(await mail.getAttribute('href'), `mailto:${email}`)
          const geometry = await mail.evaluate(el => {
            const range = document.createRange()
            range.selectNodeContents(el)
            const rects = [...range.getClientRects()]
            const box = el.getBoundingClientRect()
            const column = el.parentElement.getBoundingClientRect()
            const location = el.parentElement.nextElementSibling.getBoundingClientRect()
            return {
              lines: new Set(rects.map(rect => Math.round(rect.y))).size,
              textRight: Math.max(...rects.map(rect => rect.right)),
              columnRight: column.right,
              locationLeft: location.left,
              height: box.height,
              fontSize: getComputedStyle(el).fontSize,
              clipped: el.scrollWidth > el.clientWidth + 1,
            }
          })
          assert.equal(geometry.lines, 1, 'Email wraps')
          assert.ok(!geometry.clipped, 'Email is clipped')
          assert.ok(geometry.textRight <= geometry.columnRight + 1, 'Email escapes its column')
          assert.ok(geometry.textRight < geometry.locationLeft, 'Email overlaps the location')
          assert.ok(geometry.height >= 36, 'Email tap area shrank')
          assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1), 'Menu overflows')
          await page.keyboard.press('Tab')
          await mail.focus()
          assert.ok(await mail.evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'))
          if (route === '/' && [320, 390].includes(width) && !reduced) {
            await page.waitForTimeout(1200)
            await page.addScriptTag({path: path.resolve('node_modules/axe-core/axe.min.js')})
            const axe = await page.evaluate(() => window.axe.run(document.querySelector('dialog[open]'), {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']}}))
            report.accessibility.push({width, violations: axe.violations.map(item => ({id: item.id, nodes: item.nodes.length})), incomplete: axe.incomplete.map(item => item.id)})
            assert.equal(axe.violations.length, 0)
            await page.screenshot({path: `${output}/menu-${width}.png`})
          }
          await page.keyboard.press('Escape')
          assert.ok(await menu.evaluate(el => el === document.activeElement))
          assert.deepEqual(errors, [])
          report.cases.push({route, width, reduced, geometry, result: 'pass'})
        } catch (error) {
          report.failures.push({route, width, reduced, error: error.message})
          console.log('FAIL', route, width, reduced, error.message)
        }
        fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2))
      }
    }
  }
} finally {await browser.close()}
console.log(JSON.stringify({cases: report.cases.length, axeScans: report.accessibility.length, failures: report.failures.length}))
if (report.failures.length) process.exitCode = 1
