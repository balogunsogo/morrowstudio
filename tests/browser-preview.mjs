// Read-only local preview verification; no Studio login or CMS mutation.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {chromium} from 'playwright'

const base=process.env.APP_BASE_URL??'http://localhost:3100'
const tokens=[process.env.SANITY_API_READ_TOKEN,process.env.SANITY_API_WRITE_TOKEN].filter(Boolean)
const browser=await chromium.launch({headless:true})
const results=[]
try {
  const context=await browser.newContext()
  const manifest=JSON.parse(fs.readFileSync('.next/prerender-manifest.json','utf8'))
  // This simulates an existing local Draft Mode session. It does not test the
  // real Studio-generated secret handshake, which requires a signed-in user.
  await context.addCookies([{name:'__prerender_bypass',value:manifest.preview.previewModeId,url:base}])
  const page=await context.newPage()
  for(const route of ['/','/work','/work/aster-house','/about']) {
    const errors=[]
    const onError=error=>errors.push(error.message)
    page.on('pageerror',onError)
    const response=await page.goto(base+route,{waitUntil:'domcontentloaded'})
    assert.equal(response.status(),200)
    const html=await response.text()
    assert.ok(tokens.every(token=>!html.includes(token)), 'Secret in preview HTML')
    await page.getByRole('link',{name:'Exit preview'}).waitFor()
    assert.ok(await page.locator('main').innerText())
    assert.deepEqual(errors,[])
    page.off('pageerror',onError)
    results.push({route,status:200,result:'pass',draftMode:true})
  }
  const revision=await page.request.get(base+'/api/draft-mode/revision')
  assert.equal(revision.status(),200)
  assert.ok(/no-store/.test(revision.headers()['cache-control']))
  assert.match((await revision.json()).revision,/^[a-f0-9]{64}$/)
  results.push({route:'/api/draft-mode/revision',result:'pass',draftMode:true,noStore:true})
  let polls=0
  const onRequest=request=>{if(request.url().endsWith('/api/draft-mode/revision'))polls++}
  page.on('request',onRequest)
  await page.waitForTimeout(6500)
  assert.ok(polls>=2,'Draft revision polling did not continue')
  page.off('request',onRequest)
  await page.getByRole('link',{name:'Exit preview'}).click()
  await page.waitForURL(base+'/')
  assert.equal((await page.request.get(base+'/api/draft-mode/revision')).status(),403)
  results.push({action:'exit preview',result:'pass',draftMode:false})

  let scanned=0
  function scan(folder) {
    for(const entry of fs.readdirSync(folder,{withFileTypes:true})) {
      const file=folder+'/'+entry.name
      if(entry.isDirectory())scan(file)
      else if(/\.(js|css|map|json)$/.test(file)) {
        const source=fs.readFileSync(file,'utf8')
        assert.ok(tokens.every(token=>!source.includes(token)), 'Secret in static browser asset')
        scanned++
      }
    }
  }
  scan('.next/static')
  fs.writeFileSync('migration/reports/preview-security.json',JSON.stringify({at:new Date().toISOString(),results,staticAssetsScanned:scanned,secretsAbsent:true,boundary:'Simulated local Draft Mode session. Real Studio activation and live author mutation/field focus still require a signed-in Presentation session.'},null,2)+'\n')
  console.log('Preview checks:',results.length,'passed; browser assets scanned:',scanned,'; secrets absent')
} finally {
  await browser.close()
}

