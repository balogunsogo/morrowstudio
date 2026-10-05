import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {JSDOM} from 'jsdom'
import {renderToStaticMarkup} from 'react-dom/server'
import {Schema} from '@sanity/schema'
import {parse,evaluate} from 'groq-js'
import {imageConfigDefault} from 'next/dist/shared/lib/image-config'
import nextConfig from '../next.config'
import {schema} from '@/sanity/schemaTypes'
import {PROJECTS_QUERY,HOMEPAGE_QUERY} from '@/sanity/lib/queries'
import ProjectContent from '@/components/project/ProjectContent'
import type {Project} from '@/components/project/types'
import type {PortableTextBlock} from '@portabletext/types'
import {contentForViewport,creditsForViewport,galleryForViewport,pairForViewport} from '@/components/project/contract'

const documents=JSON.parse(readFileSync('migration/data/source-mapping.json','utf8')) as (Project & Record<string,unknown>)[]
const projects=documents.filter(d=>d._type==='project')
const plans=JSON.parse(readFileSync('migration/reports/project-plan.json','utf8')) as {slug:string;desktopBlocks:{block:string;images:{filename:string}[]}[];mobileBlocks:{block:string;images:{filename:string}[]}[]}[]
const assetMap=JSON.parse(readFileSync('migration/data/asset-map.json','utf8')) as Record<string,string>
imageConfigDefault.remotePatterns=nextConfig.images?.remotePatterns??[]
const compiled=Schema.compile({name:'migration',types:schema.types})
const compositions=JSON.parse(readFileSync('migration/data/compositions.json','utf8')) as {slug:string;key:string;viewport:string;type:string;section:{sourceHtml:string}}[]
const normalize=(text:string)=>text.replace(/[“”]/g,'').replace(/\s+/g,' ').trim()

for(const project of projects)test(`${project.slug.current}: canonical/mobile structure, copy and exact asset sequence`,()=>{
  const plan=plans.find(p=>p.slug===project.slug.current)!
  const dom=new JSDOM(renderToStaticMarkup(<ProjectContent content={project.content} mobileOrder={project.mobileOrder}/>)).window.document
  for(const viewport of ['desktop','mobile'] as const){
    const blocks=contentForViewport(project.content??[],viewport,project.mobileOrder)
    const expected=viewport==='desktop'?plan.desktopBlocks:plan.mobileBlocks
    assert.equal(blocks.length,expected.length)
    assert.equal(dom.querySelectorAll(`[data-content-viewport="${viewport}"] [data-content-key]`).length,expected.length)
    blocks.forEach((block,i)=>{
      const composition=compositions.find(c=>c.slug===project.slug.current&&c.key===block._key&&c.viewport===viewport)!
      const source=new JSDOM(composition.section.sourceHtml).window.document.body.firstElementChild!
      const rendered=dom.querySelector(`[data-content-viewport="${viewport}"] [data-content-key="${block._key}"]`)!
      if(block._type==='textBlock'){
        const label=source.querySelector('p.mono,h2.mono')?.textContent?.trim().replace(/^\(|\)$/g,'')
        if(label)assert.equal(block.label,label,`${project.slug.current} ${viewport} source label`)
      }
      if(block._type==='videoBlock'){
        const figureCaption=source.querySelector('figcaption')
        const caption=figureCaption?.children.length?[...figureCaption.children].map(column=>column.textContent??'').join(' '):figureCaption?.textContent??''
        assert.equal(normalize(block.caption??''),normalize(caption),`${project.slug.current} ${viewport} film caption`)
      }
      const paragraphs=[...(source.matches('p')?[source]:[]),...source.querySelectorAll('p,h2,h3')].filter(p=>!p.classList.contains('mono')&&!p.closest('figcaption')&&!['gallery','creditsBlock','videoBlock'].includes(block._type))
      for(const paragraph of paragraphs)assert.ok(normalize(rendered.textContent??'').includes(normalize(paragraph.textContent??'')),`${project.slug.current} ${viewport} missing source copy: ${normalize(paragraph.textContent??'').slice(0,100)}`)
      const expectedRefs=expected[i].images.map(image=>assetMap[image.filename])
      let actualRefs:(string|undefined)[]=[]
      if(block._type==='imagePair')actualRefs=pairForViewport(block,viewport).uses.map(use=>use.image?.asset?._ref)
      else if(block._type==='gallery')actualRefs=galleryForViewport(block.images??[],viewport,block.mobileImageKeys).map(image=>image.asset?._ref)
      else if(block._type==='videoBlock')actualRefs=[block.poster?.asset?._ref]
      else if('image' in block)actualRefs=[(viewport==='mobile'?block.mobile?.image??block.image:block.image)?.asset?._ref]
      assert.deepEqual(actualRefs,expectedRefs,project.slug.current+' '+viewport+' '+i)
      if(block._type==='creditsBlock')assert.ok(creditsForViewport(block,viewport).every(c=>c.role&&c.name))
      const body='body' in block?(viewport==='mobile'&&'mobile' in block?block.mobile?.body??block.body:block.body):undefined
      for(const p of (body??[]) as PortableTextBlock[])assert.ok(p.children.every(span=>span._key))
      assert.ok(compiled.get(block._type))
    })
  }
  assert.equal(dom.querySelectorAll('video').length,0)
  assert.equal(dom.querySelectorAll('a[href="undefined"]').length,0)
})
test('archive rank sequence, filters and next-project wrap match all ten projects',async()=>{
  const result=await (await evaluate(parse(PROJECTS_QUERY),{dataset:projects})).get() as Project[]
  assert.deepEqual(result.map(p=>p.orderRank),[1,2,3,4,5,6,7,8,9,10])
  assert.deepEqual(result.map(p=>p.slug.current),plans.map(p=>p.slug))
  assert.equal(result[(result.length-1+1)%result.length].slug.current,'aster-house')
  const counts=Object.fromEntries(['Identity','Digital','Art Direction','Editorial'].map(tag=>[tag,result.filter(p=>p.disciplines?.includes(tag)).length]))
  assert.deepEqual(counts,{Identity:4,Digital:4,'Art Direction':3,Editorial:3})
})
test('Home resolves six curated features and all ten index references',async()=>{
  const result=await (await evaluate(parse(HOMEPAGE_QUERY),{dataset:documents})).get() as {featuredProjects:{project:Project}[];projectIndex:Project[];mobileProjectIndex:Project[];heroImage:{asset:{_ref:string}}}
  assert.deepEqual(result.featuredProjects.map(p=>p.project.slug.current),['aster-house','field-notes','forma','nocturne','arc-athletics','sola-ceramics'])
  assert.equal(result.projectIndex.length,10)
  assert.deepEqual(result.mobileProjectIndex.map(project=>project.slug.current),['kiln','meridian','open-room'])
  assert.ok(result.projectIndex.every(p=>p.slug.current))
  assert.equal(result.heroImage.asset._ref,assetMap['aster.jpg'])
})
test('About contains supplied descriptions and explicit source placeholders',()=>{
  const about=documents.find(d=>d._type==='about')!
  assert.equal((about.capabilityItems as unknown[]).length,5)
  assert.equal((about.recognition as unknown[]).length,4)
  assert.equal((about.mobileClients as unknown[]).length,10)
  assert.equal(about.secondaryCaption,'[Founder name], founder')
})
test('used asset mapping includes 65 originals and skips unused aster-2',()=>{
  assert.equal(Object.keys(assetMap).length,65)
  assert.equal(new Set(Object.values(assetMap)).size,65)
  assert.equal(assetMap['aster-2.jpg'],undefined)
})
