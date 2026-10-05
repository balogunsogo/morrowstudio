import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'

const secrets = [process.env.SANITY_API_WRITE_TOKEN, process.env.SANITY_API_READ_TOKEN, process.env.SANITY_AUTH_TOKEN].filter(Boolean)
assert.ok(secrets.length, 'Load .env.local so the browser artifact scan can check the configured secrets.')
let files = 0, bytes = 0
function scan(folder) {
  for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {
    const file = path.join(folder, entry.name)
    if (entry.isDirectory()) scan(file)
    else if (/\.(?:js|html|css|json|map)$/.test(file)) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(secrets.every(secret => !content.includes(secret)), `A configured secret appears in a public artifact: ${file}`)
      files++; bytes += Buffer.byteLength(content)
    }
  }
}
scan('dist')
scan('.next/static')
const baseline = JSON.parse(fs.readFileSync('migration/reports/studio-ux-baseline.json', 'utf8'))
for (const [file, expected] of Object.entries(baseline)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), expected, `Frontend/source changed: ${file}`)
const result = {at: new Date().toISOString(), publicArtifactFilesScanned: files, publicArtifactBytesScanned: bytes, configuredSecretsAbsent: true, frontendAndSourceFilesUnchanged: Object.keys(baseline).length}
fs.writeFileSync('migration/reports/studio-ux-security.json', JSON.stringify(result, null, 2) + '\n')
console.log(`${files} public artifacts contain no configured secrets; ${Object.keys(baseline).length} frontend/source files are unchanged.`)
