import assert from 'node:assert/strict'
import fs from 'node:fs'
import {chromium} from 'playwright'
const documents=JSON.parse(fs.readFileSync('migration/data/source-mapping.json','utf8'))
const projects=documents.filter(d=>d._type==='project')
const base=process.env.APP_BASE_URL??'http://localhost:3000'
const widths=[1440,1024,768,760,390,320]
const routes=['/','/work',...projects.map(p=>'/work/'+p.slug.current),'/about','/studio']
const visualRoutes=['/','/work','/about','/work/aster-house','/work/nocturne','/work/forma','/work/arc-athletics','/work/open-room']
const results=[],screenshots=[],failures=[],security=[]
fs.mkdirSync('migration/reports/screenshots',{recursive:true})
const browser=await chromium.launch({headless:true})
try{
  const page=await browser.newPage()
  await page.emulateMedia({reducedMotion:'reduce'})
  for(const width of widths)for(const route of routes){
    const errors=[]
    const pageError=e=>errors.push(e.message)
    const consoleError=m=>{if(m.type()==='error'&&/hydration|hydrating|React error/i.test(m.text()))errors.push(m.text())}
    page.on('pageerror',pageError);page.on('console',consoleError)
    try{
      await page.setViewportSize({width,height:900})
      const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:90000})
      assert.equal(response.status(),200)
      const html=await response.text()
      for(const token of [process.env.SANITY_API_READ_TOKEN,process.env.SANITY_API_WRITE_TOKEN].filter(Boolean))assert.ok(!html.includes(token),'Secret appeared in page HTML')
      await page.evaluate(()=>document.fonts.ready)
      if(route==='/studio')await page.getByText(/Connect this studio|Sign in|Content/).first().waitFor({timeout:45000})
      else{
        await page.locator('main').waitFor()
        // Let native lazy loading run. Changing loading attributes before React
        // hydrates would itself introduce a false hydration mismatch.
        await page.waitForTimeout(750)
        for(const img of await page.locator('img').all())if(await img.isVisible()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode())}
        await page.locator('.project-gallery-images').evaluateAll(tracks=>tracks.forEach(el=>{el.scrollLeft=0}))
        await page.locator('[data-composition="pair"]').evaluateAll(tracks=>tracks.forEach(el=>{el.scrollLeft=0}))
        await page.waitForTimeout(100)
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)
        assert.ok(overflow<=1,'Horizontal overflow '+overflow+'px')
        const p=projects.find(p=>route==='/work/'+p.slug.current)
        if(route==='/'){
          const home=documents.find(doc=>doc._type==='homepage')
          const selected=width<=760?home.mobileProjectIndex:home.projectIndex
          const expected=selected.map(ref=>'/work/'+projects.find(project=>project._id===ref._ref).slug.current)
          const actual=await page.locator('section[aria-labelledby="project-index-heading"] ol >li:visible a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))
          assert.deepEqual(actual,expected,'Home index selection differs from the export')
        }
        if(p){
          const viewport=width<=760?'mobile':'desktop'
          const branch=page.locator(`[data-content-viewport="${viewport}"]`)
          assert.equal(await branch.isVisible(),true)
          const expected=viewport==='mobile'?p.mobileOrder:p.content.filter(b=>b.visibility!=='mobile').map(b=>b._key)
          assert.deepEqual(await branch.locator('[data-content-key]').evaluateAll(nodes=>nodes.map(n=>n.dataset.contentKey)),expected)
          assert.equal(await page.locator('h1').innerText(),p.title)
          assert.equal(await page.locator('.project-next').getAttribute('href'),'/work/'+projects[p.orderRank%10].slug.current)
          assert.equal(await branch.locator('[data-media-state="unresolved"] button, [data-media-state="unresolved"] video').count(),0)
          if(width<=760)for(const pair of await branch.locator('.project-image-pair').all()){
            const display=await pair.evaluate(el=>getComputedStyle(el).display)
            if(display==='grid')for(const pairImage of await pair.locator('img').all())assert.ok((await pairImage.boundingBox()).width>=width*.3,'Mobile grid pair image is narrower than its source composition')
          }
          if(await branch.locator('.project-gallery').count()){
            const gallery=branch.locator('.project-gallery').first(),track=gallery.locator('.project-gallery-images')
            if(width>760){const next=gallery.getByRole('button',{name:'Next gallery image'});await next.click();await page.waitForTimeout(150);assert.ok(await track.locator('figure').nth(1).evaluate(el=>Math.abs(el.getBoundingClientRect().left)<1));assert.equal(await gallery.getByRole('button',{name:'Previous gallery image'}).isEnabled(),true)}
            else {await track.evaluate(el=>{el.scrollLeft=200});assert.ok(await track.evaluate(el=>el.scrollLeft)>0)}
            await track.evaluate(el=>{el.scrollLeft=0})
          }
        }
        if(width<=760){await page.getByRole('button',{name:'Menu +'}).click();const menu=page.getByRole('dialog');assert.equal(await menu.isVisible(),true);if(route==='/'&&width===390){const file='migration/reports/screenshots/menu-390.png';await page.screenshot({path:file});screenshots.push(file)}await page.getByRole('button',{name:/Close/}).click();assert.equal(await menu.isVisible(),false)}
        if(route==='/work'){
          assert.equal(await page.locator('section[aria-label="Project index"] ol > li').count(),10)
          const filters=page.getByRole('group',{name:'Filter by discipline'})
          await filters.getByRole('button',{name:/^Identity/}).click();assert.equal(await page.locator('section[aria-label="Project index"] ol > li').count(),4)
          await page.getByRole('button',{name:'Grid',exact:true}).click();assert.equal(await page.locator('section[aria-label="Project grid"] li').count(),4)
          await filters.getByRole('button',{name:/^All/}).click();assert.equal(await page.locator('section[aria-label="Project grid"] li').count(),10)
          await page.getByRole('button',{name:'List',exact:true}).click()
        }
        if(visualRoutes.includes(route)&&(width===1440||width===390)){
          await page.evaluate(()=>scrollTo(0,0))
          const file=`migration/reports/screenshots/${route==='/'?'home':route.replaceAll('/','-').slice(1)}-${width}.png`
          await page.screenshot({path:file,fullPage:true});screenshots.push(file)
        }
      }
      assert.deepEqual(errors,[])
      results.push({route,width,status:200,result:'pass'})
    }catch(e){const failure={route,width,error:e.message};failures.push(failure);results.push({...failure,result:'fail'});console.log('FAIL',route,width,e.message.slice(0,240))}
    finally{page.off('pageerror',pageError);page.off('console',consoleError)}
  }
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.setViewportSize({width:1440,height:900});await page.goto(base+'/work/aster-house')
  const normal=await page.locator('.project-title-rise').evaluate(el=>getComputedStyle(el).animationName)
  await page.emulateMedia({reducedMotion:'reduce'})
  const reduced=await page.locator('.project-title-rise').evaluate(el=>getComputedStyle(el).animationName)
  assert.notEqual(normal,'none');assert.equal(reduced,'none')
  for(const [route,status] of [['/api/draft-mode/revision',403],['/api/draft-mode/enable?sanity-preview-secret=invalid',401]]){
    const response=await page.request.get(base+route)
    assert.equal(response.status(),status)
    assert.ok(!response.headers()['set-cookie'])
    security.push({route,status,result:'pass'})
  }
  fs.writeFileSync('migration/reports/browser-completion.json',JSON.stringify({at:new Date().toISOString(),base,widths,results,screenshots,failures,security,reducedMotion:{normal,reduced}},null,2)+'\n')
  console.log('Browser checks:',results.length-failures.length+'/'+results.length,'passed;',screenshots.length,'screenshots')
  assert.equal(failures.length,0,'See browser-completion.json for remaining failures')
}finally{await browser.close()}
