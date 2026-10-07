import assert from 'node:assert/strict'
import {build} from 'esbuild'
import {chromium} from 'playwright'

// Mount the actual handler in a browser without depending on CMS/network data.
const {outputFiles} = await build({
  stdin: {
    contents: `import React from 'react'; import {createRoot} from 'react-dom/client';
      import SmoothScrolling from './src/components/site/SmoothScrolling';
      createRoot(document.getElementById('root')).render(React.createElement(SmoothScrolling));`,
    resolveDir: process.cwd(), loader: 'tsx',
  },
  bundle: true, write: false, format: 'iife',
  plugins: [{name: 'pathname', setup(builder) {
    builder.onResolve({filter: /^next\/navigation$/}, () => ({path: 'pathname', namespace: 'test'}))
    builder.onLoad({filter: /.*/, namespace: 'test'}, () => ({contents: `export const usePathname = () => '/work'`}))
  }}],
})
const browser = await chromium.launch({headless: true})
try {
  const page = await browser.newPage({viewport: {width: 1366, height: 768}})
  await page.setContent(`<style>html{scroll-behavior:smooth}body{height:6000px;margin:0}
    #nested{height:100px;width:200px;overflow:auto}#nested div{height:800px}</style>
    <div id="root"></div><div id="nested"><div></div></div>`)
  await page.addScriptTag({content: outputFiles[0].text})
  // Allow React's effect to install the wheel listener.
  await page.waitForTimeout(100)
  await page.evaluate(() => {
    window.wheelResults = []
    window.addEventListener('wheel', e => window.wheelResults.push(e.defaultPrevented))
  })
  await page.mouse.move(600, 300)
  const y = () => page.evaluate(() => scrollY)
  const dispatch = (options, nested = false) => page.evaluate(({options, nested}) => {
    const event = new WheelEvent('wheel', {bubbles: true, cancelable: true, ...options})
    document.querySelector(nested ? '#nested' : 'body').dispatchEvent(event)
    return event.defaultPrevented
  }, {options, nested})

  // Real browser wheel events simulate a dense trackpad stream with a decaying
  // momentum tail and diagonal axis changes. Position must never reverse.
  let previous = await y()
  for (const [dx, dy] of [[0, 30], [4, 25], [30, 18], [0, 12], [2, 7], [0, 3]]) {
    await page.mouse.wheel(dx, dy)
    await page.waitForTimeout(35)
    const current = await y()
    assert.ok(current >= previous, 'Downward trackpad stream must not reverse')
    previous = current
  }
  assert.ok(previous > 0, 'Native wheel events must scroll the page')
  assert.deepEqual(await page.evaluate(() => window.wheelResults), Array(6).fill(false))
  const settled = await y()
  await page.waitForTimeout(750)
  assert.equal(await y(), settled, 'No custom animation tail after pixel scrolling')
  assert.equal(await dispatch({deltaY: -0.5, deltaMode: 0}), false, 'Fractional upward input stays native')

  assert.equal(await dispatch({deltaY: 3, deltaMode: 1}), true, 'Line wheel retains smooth glide')
  await page.waitForTimeout(750)
  assert.ok(await y() > settled, 'Line wheel animation advances the page')
  assert.equal(await dispatch({deltaY: 1, deltaMode: 2}), true, 'Page wheel retains smooth glide')
  // Switching from a mouse animation to a pixel gesture cancels stale movement.
  assert.equal(await dispatch({deltaY: 4, deltaMode: 0}), false)
  const switched = await y()
  await page.waitForTimeout(750)
  assert.equal(await y(), switched, 'Pixel input cancels the pending custom glide')
  assert.equal(await dispatch({deltaY: 3, deltaMode: 1}, true), false, 'Nested scroll areas stay native')
  assert.equal(await dispatch({deltaY: 3, deltaMode: 1, ctrlKey: true}), false, 'Zoom gestures stay native')
  await page.emulateMedia({reducedMotion: 'reduce'})
  assert.equal(await dispatch({deltaY: 3, deltaMode: 1}), false, 'Reduced motion stays native')
  console.log('PASS: native trackpad stream, axis changes, momentum, mouse glide, handoff, nested scrolling, zoom and reduced motion')
} finally {
  await browser.close()
}
