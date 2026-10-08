import fs from 'node:fs'
import path from 'node:path'
import {execFile} from 'node:child_process'
import {promisify} from 'node:util'
import {chromium} from 'playwright'

const base = new URL(process.env.LIGHTHOUSE_BASE_URL ?? 'https://morrowstudio.balogunoluwasogo.com')
if (base.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(base.hostname)) throw new Error('Deployed HTTPS origin required; this is not a localhost performance test.')
const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx')
const candidates = fs.readdirSync(cache).map(name => path.join(cache, name, 'node_modules', 'lighthouse'))
  .filter(folder => fs.existsSync(path.join(folder, 'cli', 'index.js')))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
if (!candidates.length) throw new Error('Run npm.cmd exec --yes --package=lighthouse -- lighthouse --version first.')
const cli = path.join(candidates[0], 'cli', 'index.js')
const output = process.env.LIGHTHOUSE_OUTPUT_DIR ?? '.tmp/awwwards/phase-2/lighthouse'
fs.mkdirSync(output, {recursive: true})
const records = []
const modes = ['mobile', 'desktop'].filter(mode => !process.env.LIGHTHOUSE_MODES || process.env.LIGHTHOUSE_MODES.split(',').includes(mode))
const routes = ['/', '/work', '/about', '/work/aster-house', '/work/nocturne'].filter(route => !process.env.LIGHTHOUSE_ROUTES || process.env.LIGHTHOUSE_ROUTES.split(',').includes(route))
for (const mode of modes) for (const route of routes) {
  const name = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${mode}`
  const outputPath = path.resolve(output, name)
  let cliError
  try {
    await promisify(execFile)(process.execPath, [cli, new URL(route, base).href,
      '--quiet', '--chrome-flags=--headless=new', '--output=json', '--output=html', `--output-path=${outputPath}`,
      ...(mode === 'desktop' ? ['--preset=desktop'] : [])],
    {env: {...process.env, CHROME_PATH: chromium.executablePath()}, windowsHide: true, timeout: 240000, maxBuffer: 1024 * 1024})
  } catch (error) {cliError = (error.stderr || error.message).slice(0, 1000)}
  const file = outputPath + '.report.json'
  const result = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : undefined
  const valid = !!result && !result.runtimeError && Object.values(result.categories).every(category => category.score !== null)
  records.push({route, mode, file, valid, cliError, runtimeError: result?.runtimeError,
    version: result?.lighthouseVersion, at: result?.fetchTime, requestedUrl: result?.requestedUrl, finalUrl: result?.finalDisplayedUrl,
    config: result?.configSettings,
    scores: result && Object.fromEntries(Object.entries(result.categories).map(([key, value]) => [key, value.score === null ? null : Math.round(value.score * 100)])),
    metrics: result && Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'server-response-time'].map(id => [id, result.audits[id]?.numericValue])),
    findings: result && Object.values(result.audits).filter(audit => audit.score !== null && audit.score < 1).map(audit => ({id: audit.id, title: audit.title, displayValue: audit.displayValue, metricSavings: audit.metricSavings, details: audit.details}))})
  fs.writeFileSync(`${output}/summary.json`, JSON.stringify({base: base.origin, build: 'Existing deployed build; Phase 2 remains local', records}, null, 2))
  console.log(name, valid ? JSON.stringify(records.at(-1).scores) : 'UNAVAILABLE', cliError?.slice(0, 100) ?? '')
}
if (records.some(record => !record.valid)) process.exitCode = 1
