// Comparison evidence only: source references at left, final screenshots at right.
import fs from 'node:fs'
import sharp from 'sharp'
const records=[...JSON.parse(fs.readFileSync('migration/reports/global-pages.json','utf8')),...JSON.parse(fs.readFileSync('migration/reports/case-studies.json','utf8'))]
const routes={'home':'01-home','work':'02-work','about':'03-about','work-aster-house':'case-01-aster-house','work-nocturne':'case-02-nocturne','work-forma':'case-03-forma','work-arc-athletics':'case-04-arc-athletics','work-open-room':'case-10-open-room'}
const evidence=[]
fs.mkdirSync('migration/reports/visual-qa',{recursive:true})
for(const [route,frame]of Object.entries(routes))for(const width of [1440,390]){
  const viewport=width===1440?'desktop':'mobile'
  const reference=records.find(record=>record.frame===viewport+'/'+(viewport==='mobile'&&route==='work'?'03-work':viewport==='mobile'&&route==='about'?'04-about':frame)).file.replace('.html','.png')
  const screenshot=`migration/reports/screenshots/${route}-${width}.png`
  const left=await sharp(reference).resize({width:400}).png().toBuffer(),right=await sharp(screenshot).resize({width:400}).png().toBuffer()
  const a=await sharp(left).metadata(),b=await sharp(right).metadata()
  const file=`migration/reports/visual-qa/${route}-${width}.png`
  await sharp({create:{width:816,height:Math.max(a.height,b.height),channels:3,background:'#ffffff'}}).composite([{input:left,left:0,top:0},{input:right,left:416,top:0}]).png().toFile(file)
  evidence.push({route,viewport,reference,screenshot,comparison:file,referenceDimensions:await sharp(reference).metadata().then(m=>({width:m.width,height:m.height})),screenshotDimensions:await sharp(screenshot).metadata().then(m=>({width:m.width,height:m.height}))})
}
const menuReference=records.find(r=>r.frame==='mobile/02-menu').file.replace('.html','.png')
const menuLeft=await sharp(menuReference).resize({width:390}).png().toBuffer(),menuRight=await sharp('migration/reports/screenshots/menu-390.png').resize({width:390}).png().toBuffer()
const height=Math.max((await sharp(menuLeft).metadata()).height,(await sharp(menuRight).metadata()).height)
await sharp({create:{width:796,height,channels:3,background:'#ffffff'}}).composite([{input:menuLeft,left:0,top:0},{input:menuRight,left:406,top:0}]).png().toFile('migration/reports/visual-qa/menu-390.png')
fs.writeFileSync('migration/reports/visual-qa.json',JSON.stringify({at:new Date().toISOString(),convention:'Source reference left; application right. Visual comparisons, not a pixel-identity assertion.',evidence,menu:{reference:menuReference,screenshot:'migration/reports/screenshots/menu-390.png',comparison:'migration/reports/visual-qa/menu-390.png'}},null,2)+'\n')
console.log('Created 17 source/application comparison sheets.')
