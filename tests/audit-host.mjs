import fs from 'node:fs'
import path from 'node:path'
import {JSDOM} from 'jsdom'

const origin = 'https://morrowstudio.balogunoluwasogo.com'
const inventory = JSON.parse(fs.readFileSync('.tmp/awwwards/baseline/results.json', 'utf8'))
const report = {createdAt: new Date().toISOString(), pages: [], endpoints: [], artifacts: []}
for (const route of inventory.routes) {
  try {
    const response = await fetch(origin + route, {signal: AbortSignal.timeout(30000)})
    const document = new JSDOM(await response.text()).window.document
    report.pages.push({route, status: response.status, title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: [...document.querySelectorAll('meta[name="robots"]')].map(el => el.content),
      description: document.querySelector('meta[name="description"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      ogUrl: document.querySelector('meta[property="og:url"]')?.content,
      h1: [...document.querySelectorAll('h1')].map(el => el.textContent)})
  } catch (error) {report.pages.push({route, error: error.cause?.code ?? error.name})}
}
for (const route of ['/robots.txt', '/sitemap.xml', '/api/draft-mode/revision', '/api/draft-mode/enable', '/work/audit-missing-project']) {
  try {
    const response = await fetch(origin + route, {signal: AbortSignal.timeout(30000)})
    const body = await response.text()
    report.endpoints.push({route, status: response.status, ...(/robots|sitemap/.test(route) ? {body} : {})})
  } catch (error) {report.endpoints.push({route, error: error.cause?.code ?? error.name})}
}
const secrets = [process.env.SANITY_API_READ_TOKEN, process.env.SANITY_API_WRITE_TOKEN].filter(Boolean)
let secretFound = false
function scan(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) scan(file)
    else if (/\.(js|css|html|json|map)$/.test(file)) {
      const buffer = fs.readFileSync(file)
      if (secrets.some(secret => buffer.includes(secret))) secretFound = true
      report.artifacts.push({file, bytes: buffer.length})
    }
  }
}
scan('.next/static')
if (fs.existsSync('dist')) scan('dist')
report.configuredSecretsAbsent = report.artifacts.length > 0 && !secretFound
fs.writeFileSync('.tmp/awwwards/hosting.json', JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify({pages: report.pages.length, statuses: report.pages.map(({route, status, canonical}) => ({route, status, canonical})),
  endpoints: report.endpoints, artifactsScanned: report.artifacts.length, configuredSecretsAbsent: report.configuredSecretsAbsent}, null, 2))
if (secretFound || !report.artifacts.length) process.exitCode = 1
