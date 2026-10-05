import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {JSDOM} from 'jsdom'

export const root = process.cwd()
export const load = name => JSON.parse(fs.readFileSync(path.join(root, 'migration/reports', name + '.json'), 'utf8'))
export const plans = load('project-plan')
export const cases = load('case-studies')
export const assets = load('asset-manifest').filter(a => a.uses.length && a.filename !== 'aster-2.jpg')
const blobMap = load('source-asset-map')
// Global image mappings verified against the decoded About frame inventory.
blobMap['/_blob/4ea64745b99e99cc838c3e11274dea9f']=['studio.jpg']
blobMap['/_blob/079d6305e80137538890871e9aed114d']=['portrait.jpg']
const sourceRoot = 'morrow-export-master/morrow-export-3-assets-source/morrow-studio-export/source'
export const source = name => new JSDOM(fs.readFileSync(path.join(sourceRoot, name + '.dc.html'), 'utf8')).window.document
export const key = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 16)
export const text = el => {
  if (!el) return ''
  const read = node => node.nodeName === 'BR' ? ' ' : node.nodeType === 3 ? node.textContent : [...node.childNodes].map(read).join('')
  return read(el).trim().replace(/\s+/g, ' ')
}
export const filename = img => blobMap[img.getAttribute('src')]?.[0] ?? path.basename(img.getAttribute('src') ?? '')
export function image(use, map) {
  const name = use.filename ?? filename(use)
  if (!map[name]) throw new Error('Missing asset mapping: ' + name)
  const alt = use.alt ?? use.getAttribute?.('alt') ?? ''
  const style = use.style?.cssText ?? (typeof use.style === 'string' ? use.style : '')
  const match = style.match(/object-position:\s*([\d.]+)%\s*([\d.]+)%/)
  return {_type: 'image', asset: {_type: 'reference', _ref: map[name]}, alt,
    ...(match ? {hotspot: {_type: 'sanity.imageHotspot', x: Number(match[1])/100, y: Number(match[2])/100, width: .01, height: .01}} : {})}
}
export function portable(elements, seed) {
  return elements.filter(el => text(el)).map((el, i) => {
    const children = []
    function visit(node, marks = []) {
      if (node.nodeType === 3) {if (node.textContent) children.push({_type:'span', _key:key(seed+i+children.length), text:node.textContent, marks}); return}
      if (node.nodeType !== 1) return
      if (node.tagName === 'BR') {children.push({_type:'span', _key:key(seed+i+children.length), text:'\n', marks}); return}
      const next = [...marks]
      if (node.classList.contains('grey')) next.push('muted')
      if (['B','STRONG'].includes(node.tagName)) next.push('strong')
      if (['EM','I'].includes(node.tagName)) next.push('em')
      for (const child of node.childNodes) visit(child, next)
    }
    for (const child of el.childNodes) visit(child)
    while(children.length&&!children[0].text.trim())children.shift()
    while(children.length&&!children.at(-1).text.trim())children.pop()
    if(children.length){children[0].text=children[0].text.trimStart();children.at(-1).text=children.at(-1).text.trimEnd()}
    return {_type:'block', _key:key(seed+i), style: /^H[23]$/.test(el.tagName) ? 'h3' : 'normal', markDefs:[], children}
  })
}
const fragment = html => new JSDOM(html).window.document.body
function caption(el) {
  if (!el) return ''
  return [...el.childNodes].map(n => text(n)).filter(Boolean).join(' ')
}
function block(section, spec, seed, map) {
  const dom = fragment(section.sourceHtml || section.html)
  const el = dom.firstElementChild
  const type = spec.block === 'fullWidthImage' && el.querySelector('button[aria-label*="Play"]') ? 'videoBlock' : spec.block
  const b = {_key:key(seed), _type:type, visibility:'all'}
  const body = [...el.querySelectorAll('p,h2,h3')].filter(p => !p.closest('figcaption') && !p.classList.contains('mono') && !/^\(.+\)$/.test(text(p)))
  const label = (text(el.querySelector('p.mono,h2.mono')) || spec.label).replace(/^\(|\)$/g, '')
  const imgs = spec.images
  const uses = imgs.map(img => {const data=image(img,map);delete data.alt;return {image:data,alt:img.alt}})
  switch (type) {
    case 'textBlock': return {...b, label, body:portable(body,seed+'body')}
    case 'imageWithText': return {...b, label: text(el.querySelector('p.mono,h2.mono')).replace(/^\(|\)$/g,'') || '', ...uses[0], body:portable(body,seed+'body'), layout: el.querySelector('figure')?.getAttribute('style')?.includes('7 /') ? 'imageRight':'imageLeft'}
    case 'fullWidthImage': case 'containedImage': return {...b,...uses[0],caption:caption(el.querySelector('figcaption'))}
    case 'imagePair': {
      const captions = [...el.querySelectorAll('figcaption')]
      const shared = captions.length === 1 && !captions[0].closest('figure')
      return {...b,left:{...uses[0],caption:shared?'':caption(captions[0])},right:{...uses[1],caption:shared?'':caption(captions[1])},sharedCaption:shared?caption(captions[0]):''}
    }
    case 'largeStatement': return {...b,body:portable([el.matches('p')?el:el.querySelector('p')],seed+'statement')}
    case 'gallery': return {...b,layout:'strip',images:imgs.map((img,i)=>({...image(img,map),_key:key(seed+img.filename+i),caption:caption([...el.querySelectorAll('figure')][i]?.querySelector('figcaption'))}))}
    case 'quoteBlock': return {...b,quote:text(el.querySelector('blockquote p') ?? el.querySelector('p')).replace(/^[“"]|[”"]$/g,''),author:text(el.querySelector('figcaption') ?? el.querySelector('footer')).replace(/^—\s*/, '')}
    case 'creditsBlock': return {...b,title:'Credits',items:[...el.querySelectorAll('dl > div')].map((c,i)=>({_type:'object',_key:key(seed+'credit'+i),role:text(c.querySelector('dt')),name:text(c.querySelector('dd'))}))}
    case 'videoBlock': {
      const title = el.querySelector('button')?.getAttribute('aria-label')?.replace(/^Play (film|trailer):\s*/i,'').replace(/\s*—\s*\d.*$/,'') || section.label || 'Film'
      const duration = text(el).match(/\b\d{2}:\d{2}\b/)?.[0]
      return {...b,title,duration,sourceType:'unresolved',poster:uses[0].image,caption:caption(el.querySelector('figcaption'))}
    }
    default: throw new Error('Unsupported source block '+type)
  }
}
export function projects(map, ids = {}) {
  const output = [], compositions = []
  for (const p of plans) {
    const frame = cases.find(c=>c.frame.startsWith('desktop/') && c.title===p.title)
    const mobile = cases.find(c=>c.frame.startsWith('mobile/') && c.frame.endsWith(p.slug))
    const desktopBlocks = p.desktopBlocks.map(s=>block(frame.sections.find(t=>t.order===s.section),s,p.slug+'d'+s.section,map))
    const mobileBlocks = p.mobileBlocks.map(s=>block(mobile.sections.find(t=>t.order===s.section),s,p.slug+'m'+s.section,map))
    const content = desktopBlocks.map(b=>({...b,visibility:'desktop'})), mobileOrder = []
    const used = new Set()
    for (let i=0;i<mobileBlocks.length;i++) {
      const mb = mobileBlocks[i]
      let index = desktopBlocks.findIndex((db,j)=>!used.has(j) && db._type===mb._type &&
        (['quoteBlock','creditsBlock','gallery','videoBlock','largeStatement'].includes(db._type) ||
         (db.label && db.label===mb.label) ||
         (db.image?.asset._ref && db.image.asset._ref===mb.image?.asset._ref) ||
         (db.left?.image.asset._ref && [mb.left?.image.asset._ref,mb.right?.image.asset._ref].includes(db.left.image.asset._ref))))
      // Different statements are distinct editorial sections, without inventing a new mobile body field.
      if (index>=0 && mb._type==='largeStatement' && JSON.stringify(desktopBlocks[index].body.map(b=>b.children.map(c=>c.text)))!==JSON.stringify(mb.body.map(b=>b.children.map(c=>c.text)))) index=-1
      if(index>=0&&mb._type==='videoBlock'&&desktopBlocks[index].caption!==mb.caption)index=-1
      let target
      if(index<0) {target={...mb,visibility:'mobile'};content.push(target)}
      else {
        used.add(index);target=content[index];target.visibility='all'
        if(['textBlock','imageWithText'].includes(mb._type)) target.mobile={body:mb.body,...(mb.image?{image:mb.image,alt:mb.alt}:{})}
        if(['fullWidthImage','containedImage'].includes(mb._type)) target.mobile={image:mb.image,alt:mb.alt,caption:mb.caption}
        if(mb._type==='imagePair') target.mobile={left:mb.left,right:mb.right,sharedCaption:mb.sharedCaption,order:['left','right']}
        if(mb._type==='quoteBlock') target.mobile={quote:mb.quote,author:mb.author,role:mb.role}
        if(mb._type==='gallery') {
          target.mobileImageKeys=mb.images.map(img=>{
            let item=target.images.find(x=>x.asset._ref===img.asset._ref)
            if(!item){item={...img,visibility:'mobile'};target.images.push(item)}
            else item.mobile={alt:img.alt,caption:img.caption}
            return item._key
          })
        }
        if(mb._type==='creditsBlock') {
          target.mobileCreditKeys=[];target.mobileOverrides=[]
          for(const item of mb.items){let orig=target.items.find(x=>x.role===item.role) ?? target.items.find(x=>x.name===item.name&&!target.mobileCreditKeys.includes(x._key));
            if(!orig){orig=item;target.items.push(orig)}
            target.mobileCreditKeys.push(orig._key);target.mobileOverrides.push({_type:'creditOverride',_key:key(target._key+orig._key),creditKey:orig._key,role:item.role,name:item.name})}
        }
      }
      mobileOrder.push(target._key)
      compositions.push({slug:p.slug,key:target._key,viewport:'mobile',type:mb._type,section:mobile.sections.find(t=>t.order===p.mobileBlocks[i].section)})
    }
    for(let i=0;i<desktopBlocks.length;i++) compositions.push({slug:p.slug,key:content[i]._key,viewport:'desktop',type:content[i]._type,section:frame.sections.find(t=>t.order===p.desktopBlocks[i].section)})
    const metadata = mobile.metadata
    const summaryEl = fragment(frame.sections[0].sourceHtml).querySelector('.st')
    output.push({_id:ids[p.slug]??'morrow-project-'+p.slug,_type:'project',title:p.title,slug:{_type:'slug',current:p.slug},year:p.year,client:p.client,sector:p.sector,location:p.location,disciplines:p.disciplines,services:p.services,summary:p.summary,summaryBody:portable(summaryEl?[summaryEl]:[],p.slug+'summary'),orderRank:p.orderRank,coverImage:image({filename:p.cover,alt:p.title},map),heroImage:image(p.hero[0],map),mobileHeroImage:image(p.mobileHero[0],map),mobileMetadata:{client:metadata.find(m=>m.label==='Client')?.value??p.client,services:fragment(metadata.find(m=>m.label==='Services')?.html??'').innerHTML.split(/<br\s*\/?\s*>/i).map(s=>text(fragment(s))).filter(Boolean)},content,mobileOrder})
  }
  return {documents:output,compositions}
}
export function globals(map, ids) {
  const main=source('Main'), about=source('About'), mobileAbout=source('MobileAbout')
  const sections=[...main.querySelectorAll('main > section')]
  const featureNames=[...sections[1].querySelectorAll('a.proj')].map(a=>text(a.querySelector('h2,h3')??a.querySelector('.h-p'))).filter(Boolean)
  const featured=featureNames.map((name,i)=>{const p=plans.find(p=>p.title===name);if(!p)throw new Error('Unknown featured project '+name);return {_key:key('feature'+p.slug),_type:'object',layout:['large','small','large','full','pair','pair'][i],project:{_type:'reference',_ref:ids[p.slug]}}})
  const featureLinks=[...sections[1].querySelectorAll('a.proj')].filter(a=>a.querySelector('h2,h3'))
  featured.forEach((item,i)=>{item.description=text(featureLinks[i].querySelector('p.grey:not(.mono)'))})
  const intro=sections[0]
  const email=main.querySelector('footer a[href^="mailto:"]')
  const foot=main.querySelector('footer')
  const socialLinks=[...foot.querySelectorAll('a[href^="https:"]')].map((a,i)=>({_key:key('social'+i),_type:'object',label:text(a),url:a.getAttribute('href')}))
  const home={_id:'homepage',_type:'homepage',heroTitle:'Morrow Studio',heroEyebrow:'Independent creative practice',established:text(intro.querySelector('.mono p')),availability:text([...intro.querySelectorAll('.mono p')].at(-1)),heroIntro:text(intro.querySelector('.lead')),mobileHeroIntro:text([...source('MobileHome').querySelectorAll('main > section p')].find(p=>text(p).startsWith('An independent'))),heroImage:image(intro.querySelector('img'),map),location:'London / Worldwide',featuredProjects:featured,projectIndex:plans.map(p=>({_key:key('index'+p.slug),_type:'reference',_ref:ids[p.slug]})),studioStatement:text(sections[2].querySelector('.st')),studioBody:portable([...sections[2].querySelectorAll('p')].filter(p=>!p.classList.contains('st')&&!p.classList.contains('mono')),'studio'),projectIndexHeading:'Selected work',footerHeading:text(foot.querySelector('.st')),footerEmail:text(email),socialLinks,footerLocation:'London / Worldwide'}
  home.footerHeading=text(foot.querySelector('.mono.grey'))
  home.archiveIntro=text(source('Work').querySelector('.lead'))
  home.studioStatementBody=portable([sections[2].querySelector('.st')],'studio-statement')
  home.studioCapabilities=[...sections[2].querySelectorAll('ul li')].map(text)
  home.mobileProjectIndex=[...source('MobileHome').querySelectorAll('section[aria-labelledby="ix"] .hp')].map(el=>{const p=plans.find(p=>p.title===text(el));if(!p)throw new Error('Unknown mobile index project');return {_key:key('mobile-index'+p.slug),_type:'reference',_ref:ids[p.slug]}})
  home.generalEmail=text(foot.querySelector('a[href="mailto:studio@morrow.studio"]'))
  home.studioHours=text([...foot.querySelectorAll('p')].find(p=>text(p).includes('Mon–Fri')))
  const a=[...about.querySelectorAll('main > section')], m=[...mobileAbout.querySelectorAll('main > section')]
  const capabilityItems=[...a[3].querySelectorAll('li')].map((li,i)=>{const paras=[...li.querySelectorAll('p')];return {_key:key('cap'+i),_type:'capability',title:text(li.querySelector('.t')),description:text(paras.at(-1)),mobileDescription:text([...m[3].querySelectorAll('li')][i]?.querySelector('p:last-child'))}})
  const recognition=[...a[5].querySelectorAll('.rec')].filter(row=>!row.classList.contains('mono')).map((row,i)=>{const p=[...row.children];return {_key:key('recognition'+i),_type:'object',year:Number(text(p[0])),title:text(p[1]),project:text(p[2])}})
  const aboutDoc={_id:'about',_type:'about',eyebrow:'About Morrow',statement:text(a[0].querySelector('h1')),statementBody:portable([a[0].querySelector('h1')],'about-statement'),bio:portable([...a[2].querySelectorAll('p')],'bio'),mobileBio:portable([...m[2].querySelectorAll('p')],'mobile-bio'),primaryImage:image(a[1].querySelectorAll('img')[0],map),secondaryImage:image(a[1].querySelectorAll('img')[1],map),primaryCaption:text(a[1].querySelectorAll('figcaption')[0]),secondaryCaption:text(a[1].querySelectorAll('figcaption')[1]),capabilities:capabilityItems.map(c=>c.title),capabilityItems,clients:[...a[4].querySelectorAll('li')].map(text),mobileClients:[...m[4].querySelectorAll('li')].map(text),recognition,contactHeading:text(about.querySelector('footer .st')),contactEmail:text(about.querySelector('footer a[href^="mailto:"]')),socialLinks}
  // References to unpublished canonical IDs resolve to drafts in Presentation.
  aboutDoc.mobileStatementBody=portable([m[0].querySelector('h1')],'mobile-about-statement')
  aboutDoc.statementBody=portable([...a[0].querySelectorAll('h1 > .line')],'about-statement')
  aboutDoc.mobileStatementBody=portable([...m[0].querySelectorAll('h1 > .line')],'mobile-about-statement')
  aboutDoc.contactHeading=text(about.querySelector('footer .lead'))
  aboutDoc.studioAddress=text([...about.querySelectorAll('footer p')].find(p=>text(p).includes('[Studio address]')))
  aboutDoc.pressEmail=text(about.querySelector('a[href="mailto:press@morrow.studio"]'))
  // They are strengthened in the guarded publish transaction.
  for(const item of home.featuredProjects)item.project._weak=true
  for(const ref of home.projectIndex)ref._weak=true
  for(const ref of home.mobileProjectIndex)ref._weak=true
  return [home,aboutDoc]
}
