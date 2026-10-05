import fs from 'node:fs'
import assert from 'node:assert/strict'
import {JSDOM} from 'jsdom'
const base=process.env.APP_BASE_URL??'http://localhost:3100'
const projects=JSON.parse(fs.readFileSync('migration/data/source-mapping.json','utf8')).filter(doc=>doc._type==='project')
const routes=[{path:'/',title:'Morrow Studio'},{path:'/work',title:'Work — Morrow Studio'},{path:'/about',title:'About — Morrow Studio'},...projects.map(project=>({path:'/work/'+project.slug.current,title:project.title+' — Morrow Studio',summary:project.summary}))]
const configuredOrigin=process.env.SITE_URL??process.env.NEXT_PUBLIC_SITE_URL
const results=[]
for(const route of routes){
  const response=await fetch(base+route.path)
  assert.equal(response.status,200)
  const dom=new JSDOM(await response.text()).window.document
  const meta=name=>dom.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.getAttribute('content')
  assert.equal(dom.title,route.title)
  assert.ok(meta('description'))
  assert.ok(meta('og:title')&&meta('og:description')&&meta('twitter:card'))
  if(route.summary)assert.equal(meta('description'),route.summary)
  if(route.path!=='/work')assert.match(meta('og:image'),/^https:\/\/cdn\.sanity\.io\//)
  const canonical=dom.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if(!configuredOrigin)assert.equal(canonical,undefined)
  else assert.equal(canonical,new URL(route.path,configuredOrigin).href)
  results.push({route:route.path,title:dom.title,result:'pass',canonical:canonical??null,openGraph:true,twitter:true})
}
const robots=await (await fetch(base+'/robots.txt')).text()
const sitemap=await (await fetch(base+'/sitemap.xml')).text()
if(!configuredOrigin){assert.match(robots,/Disallow: \/\s/);assert.equal((sitemap.match(/<loc>/g)??[]).length,0)}
else assert.equal((sitemap.match(/<loc>/g)??[]).length,13)
assert.equal((await fetch(base+'/icon.svg')).status,200)
fs.writeFileSync('migration/reports/seo-verification.json',JSON.stringify({at:new Date().toISOString(),configuredOrigin:configuredOrigin??null,results,robots:true,sitemap:true,favicon:true,environmentSafe:!configuredOrigin},null,2)+'\n')
console.log('SEO verified:',results.length,'pages, robots, sitemap and favicon; configured origin:',!!configuredOrigin)
