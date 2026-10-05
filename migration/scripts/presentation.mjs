import fs from 'node:fs'
import {JSDOM} from 'jsdom'
const compositions=JSON.parse(fs.readFileSync('migration/data/compositions.json','utf8'))
const rules=[]
function css(el,exclude=[]){if(!el)return '';return [...el.style].filter(p=>!exclude.includes(p)).map(p=>`${p}:${el.style.getPropertyValue(p)};`).join('')}
const kind={textBlock:'.project-text',fullWidthImage:'.project-full-image',containedImage:'.project-contained-image',imagePair:'.project-image-pair',largeStatement:'.project-statement',imageWithText:'.project-image-text',gallery:'.project-gallery',quoteBlock:'.project-quote',creditsBlock:'.project-credits',videoBlock:'.project-video'}
for(const c of compositions){
  const dom=new JSDOM(c.section.sourceHtml??c.section.html).window.document,el=dom.body.firstElementChild
  const base=`.morrow-project[data-project-slug="${c.slug}"] [data-content-viewport="${c.viewport}"] [data-content-key="${c.key}"] ${kind[c.type]}`
  const add=(selector,value)=>{if(value)rules.push(`${base}${selector}{${value}}`)}
  add('',css(el,['aspect-ratio','position','background']))
  if(c.viewport==='mobile'&&c.type==='imagePair'&&el.style.display!=='grid')add('','display:block;padding-inline:0;')
  if(c.viewport==='mobile'&&c.type==='imageWithText')add('',`display:block;padding-inline:${el.classList.contains('px')?'var(--m)':'0'};`)
  const imgs=[...el.querySelectorAll('img')]
  imgs.forEach((img,i)=>{
    const media=img.closest('.media'),figure=img.closest('figure')
    let selector=' img'
    if(c.type==='imagePair'||c.type==='gallery')selector=` figure:nth-of-type(${i+1}) img`
    add(selector,(media?.style.aspectRatio?`aspect-ratio:${media.style.aspectRatio};`:'')+css(img))
    if(c.type==='imagePair')add(` figure:nth-of-type(${i+1})`,css(figure))
    if(c.type==='gallery'){
      const slide=img.closest('.slide')??figure
      const width=slide?.style.width
      if(width)add(` .project-gallery-images figure:nth-child(${i+1})`,`flex:0 0 ${width};`)
    }
  })
  if(c.type==='textBlock'){
    const paras=[...el.querySelectorAll('p')].filter(p=>!p.classList.contains('mono'))
    // The source grid uses each paragraph's column span and margin. A nested
    // generic grid gap would otherwise add the same separation a second time.
    const columns=paras.map(p=>p.style.gridColumn.match(/^(\d+)\s*\/\s*span\s*(\d+)$/))
    if(c.viewport==='desktop'&&columns.length&&columns.every(Boolean)){
      const start=Math.min(...columns.map(match=>Number(match[1])))
      const end=Math.max(...columns.map(match=>Number(match[1])+Number(match[2])))
      add(' >div',`grid-column:${start} / span ${end-start};display:grid;grid-template-columns:repeat(${end-start},minmax(0,1fr));gap:0 var(--gap);`)
      columns.forEach((match,i)=>add(` >div >p:nth-of-type(${i+1})`,`grid-column:${Number(match[1])-start+1} / span ${match[2]};`))
    }
    paras.forEach((p,i)=>{let s=css(p,['grid-column',...(c.viewport==='mobile'&&i===0?['margin-top']:[])]);if(p.classList.contains('lead-l'))s+='font-size:clamp(24px,2.4vw,36px);line-height:1.2;letter-spacing:-.025em;';if(p.classList.contains('lead'))s+='font-size:clamp(19px,1.6vw,24px);line-height:1.3;';if(p.closest('.grey'))s+='color:var(--grey);';add(` >div >p:nth-of-type(${i+1})`,s)})
  }
  if(c.type==='largeStatement')add(' p',css(el.matches('p')?el:el.querySelector('p')))
  if(c.type==='imageWithText'){
    const fig=el.querySelector('figure'),body=[...el.children].find(x=>x!==fig&&x.querySelector('p'))
    add(' >figure',css(fig));add(' >div',css(body))
    add(' .project-module-label','margin-bottom:0;')
    if(c.viewport==='mobile'&&body?.classList.contains('px'))add(' >div','padding-inline:var(--m);')
    const headings=[...el.querySelectorAll('h2,h3')].filter(x=>!x.classList.contains('mono'))
    headings.forEach((h,i)=>{const language=h.classList.contains('st')?'font-size:clamp(32px,4.4vw,66px);line-height:1.02;letter-spacing:-.035em;':h.classList.contains('lead-l')?'font-size:clamp(24px,2.4vw,36px);line-height:1.2;letter-spacing:-.025em;':'';add(` .project-image-text-body h3:nth-of-type(${i+1})`,language+css(h)+'font-weight:400;')})
    const paragraphs=[...el.querySelectorAll('p')].filter(p=>!p.classList.contains('mono'))
    paragraphs.forEach((p,i)=>add(` .project-image-text-body p:nth-of-type(${i+1})`,css(p)+(p.closest('.grey')?'color:var(--grey);':'')))
  }
  if(c.type==='quoteBlock')add(' blockquote p',css(el.querySelector('blockquote p')??el.querySelector('p')))
  if(c.type==='gallery')add(' .project-gallery-images',c.viewport==='desktop'?'overflow-x:auto;padding-bottom:16px;':'scrollbar-width:none;')
  if(c.type==='videoBlock'){const media=el.querySelector('.media');add(' .project-video-preview img',css(media,['position','background'])+'object-fit:cover;')}
}
const desktop=rules.filter(r=>r.includes('viewport="desktop"')),mobile=rules.filter(r=>r.includes('viewport="mobile"'))
for(const c of JSON.parse(fs.readFileSync('migration/reports/case-studies.json','utf8'))){
  const viewport=c.frame.startsWith('desktop/')?'desktop':'mobile'
  const slug=c.frame.replace(/^(desktop|mobile)\/case-\d+-/,'')
  const hero=new JSDOM(c.sections[1].sourceHtml??c.sections[1].html).window.document.body.firstElementChild
  const target=viewport==='desktop'?desktop:mobile
  const base=`.morrow-project[data-project-slug="${slug}"] .project-hero`
  target.push(`${base}{${css(hero,['aspect-ratio'])}}`,`${base} img{aspect-ratio:${hero.style.aspectRatio};}`)
}
desktop.push('.morrow-project[data-project-slug] .project-content{padding-bottom:0;}')
mobile.push('.morrow-project[data-project-slug] .project-content{padding-bottom:0;}')
fs.writeFileSync('src/styles/_source-compositions.scss','// Generated presentation rules from the audited Claude source. No content stored here.\n@media(min-width:761px){\n'+desktop.join('\n')+'\n}\n@media(max-width:760px){\n'+mobile.join('\n')+'\n}\n')
console.log('Generated source composition rules:',rules.length)
