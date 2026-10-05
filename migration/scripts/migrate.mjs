import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import {execFileSync} from 'node:child_process'
import {createClient} from '@sanity/client'
import {plans,assets,projects,globals,key,root} from './source.mjs'
import {validateKeys,validateMobileOrder,validateSelection,validatePair,validateStatement,validateVideo,validateDuration} from '../../src/sanity/schemaTypes/shared/validation.ts'

const dry=process.argv.includes('--dry-run'), publish=process.argv.includes('--publish')
const token=process.env.SANITY_API_WRITE_TOKEN
if(!token) throw new Error('SANITY_API_WRITE_TOKEN is required server-side.')
const client=createClient({projectId:'m2i4dwyo',dataset:'production',apiVersion:'2026-03-01',token,useCdn:false,perspective:'raw'})
const save=(file,data)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n')}
const stable=value=>JSON.stringify(value,(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v)
export function validate(documents) {
  assert.equal(documents.filter(d=>d._type==='project').length,10)
  const ranks=new Set(), slugs=new Set()
  for(const d of documents.filter(d=>d._type==='project')) {
    for(const f of ['title','summary','client','sector','location']) assert.ok(d[f]?.trim(),d.slug.current+': '+f)
    assert.ok(d.year&&d.services.length&&d.disciplines.length)
    assert.ok(d.heroImage.alt&&d.mobileHeroImage.alt&&d.coverImage.asset._ref)
    assert.ok(d.orderRank>=1&&d.orderRank<=10&&!ranks.has(d.orderRank));ranks.add(d.orderRank)
    assert.ok(!slugs.has(d.slug.current));slugs.add(d.slug.current)
    assert.equal(validateKeys(d.content),true)
    assert.equal(validateMobileOrder(d.mobileOrder,d.content),true)
    for(const b of d.content){
      if(b._type==='textBlock'||b._type==='imageWithText') {assert.ok(b.body?.length);assert.equal(validateKeys(b.body),true)}
      if(b._type==='imagePair')assert.equal(validatePair(b),true)
      if(b._type==='largeStatement')assert.equal(validateStatement(b),true)
      if(b._type==='gallery'){assert.equal(validateKeys(b.images),true);assert.equal(validateSelection(b.mobileImageKeys,b.images),true)}
      if(b._type==='quoteBlock')assert.ok(b.quote&&b.author)
      if(b._type==='creditsBlock'){assert.ok(b.items.length);assert.equal(validateKeys(b.items),true);assert.equal(validateSelection(b.mobileCreditKeys,b.items),true);for(const o of b.mobileOverrides??[])assert.ok(b.items.some(x=>x._key===o.creditKey))}
      if(b._type==='videoBlock'){assert.equal(validateVideo(b),true);assert.equal(validateDuration(b.duration),true);assert.ok(b.title&&b.duration&&b.sourceType==='unresolved'&&!b.videoUrl&&!b.videoFile)}
    }
  }
  return true
}
async function main(){
  const existing=await client.fetch('*[_type in ["project","homepage","about","sanity.imageAsset","sanity.fileAsset"]]')
  const stamp=new Date().toISOString().replace(/[:.]/g,'-')
  const backup=path.join(root,'migration/backups',stamp+(dry?'-dry-run':'')+'.json')
  save(backup,{projectId:'m2i4dwyo',dataset:'production',at:new Date().toISOString(),documents:existing})
  console.log('Backup saved:',path.relative(root,backup),'documents:',existing.length)
  const ids={}
  for(const p of plans){const matches=existing.filter(d=>d._type==='project'&&d.slug?.current===p.slug&&!d._id.startsWith('versions.'))
    const canonical=[...new Set(matches.map(d=>d._id.replace(/^drafts\./,'')))];assert.ok(canonical.length<=1,'Duplicate project slug '+p.slug)
    ids[p.slug]=canonical[0]??'morrow-project-'+p.slug}
  const map={},assetLog=[]
  for(const a of assets){
    const binary=fs.readFileSync(path.resolve(a.file))
    assert.equal(crypto.createHash('sha256').update(binary).digest('hex'),a.sha256,'Source hash changed '+a.filename)
    const found=existing.find(d=>d._type==='sanity.imageAsset'&&d.sha1hash===a.sha1)
    if(found){map[a.filename]=found._id;assetLog.push({filename:a.filename,sha256:a.sha256,id:found._id,action:'reused'})}
    else if(dry){map[a.filename]=`image-${a.sha1}-${a.width}x${a.height}-jpg`;assetLog.push({filename:a.filename,sha256:a.sha256,action:'would-upload'})}
    else if(publish){throw new Error('Publish requires assets already migrated: '+a.filename)}
    else {const asset=await client.assets.upload('image',binary,{filename:a.filename,contentType:'image/jpeg',label:'Morrow export '+a.sha256});map[a.filename]=asset._id;assetLog.push({filename:a.filename,sha256:a.sha256,id:asset._id,action:'uploaded'});console.log('Uploaded',a.filename)}
  }
  const generated=projects(map,ids),documents=[...generated.documents,...globals(map,ids)]
  validate(documents)
  const report={at:new Date().toISOString(),dryRun:dry,publish,backup:path.relative(root,backup),assets:assetLog,documents:documents.map(d=>({id:d._id,type:d._type,slug:d.slug?.current,action:existing.some(e=>e._id.replace(/^drafts\./,'')===d._id)?'patched':'created',blocks:d.content?.length,desktopBlocks:d.content?.filter(b=>b.visibility!=='mobile').length,mobileBlocks:d.mobileOrder?.length})),validated:true}
  fs.mkdirSync('migration/data',{recursive:true});save('migration/data/asset-map.json',map)
  save('migration/data/source-mapping.json',documents)
  save('migration/data/compositions.json',generated.compositions)
  if(dry){save('migration/reports/migration-dry-run.json',report);console.log('Dry run passed:',documents.length,'documents,',assets.length,'required assets. No writes.');return}
  const manifestPath='migration/data/applied.json'
  if(!publish){
    const revisions={}
    for(const d of documents){const live=existing.find(e=>e._id===d._id),draft=existing.find(e=>e._id==='drafts.'+d._id)
      revisions[d._id]=live?._rev??null
      const fields=Object.fromEntries(Object.entries(d).filter(([k])=>!k.startsWith('_')))
      if(draft)await client.patch(draft._id).ifRevisionId(draft._rev).set(fields).commit()
      else {const base=live?Object.fromEntries(Object.entries(live).filter(([k])=>!['_rev','_createdAt','_updatedAt'].includes(k))):{};await client.create({...base,...d,_id:'drafts.'+d._id})}
      console.log('Draft',d._id)
    }
    save(manifestPath,{revisions,sourceHash:key(stable(documents)),ids,backup:report.backup})
  }
  const drafts=await client.fetch('*[_id in $ids]',{ids:documents.map(d=>'drafts.'+d._id)})
  assert.equal(drafts.length,12,'All 12 drafts must exist')
  for(const d of documents){const draft=drafts.find(e=>e._id==='drafts.'+d._id);for(const [field,value] of Object.entries(d).filter(([k])=>!k.startsWith('_')))assert.equal(stable(draft[field]),stable(value),d._id+' mismatch '+field)}
  const assetIds=[...new Set(Object.values(map))],actual=await client.fetch('*[_id in $ids]._id',{ids:assetIds});assert.equal(actual.length,assetIds.length,'Missing referenced asset')
  const refs=[]
  function walk(v){if(!v||typeof v!=='object')return;if(v._ref)refs.push(v._ref);for(const child of Object.values(v))walk(child)}
  documents.forEach(walk)
  const allowed=new Set([...assetIds,...Object.values(ids)]);assert.ok(refs.every(r=>allowed.has(r)),'Unknown reference')
  report.verification={draftCount:drafts.length,projects:10,assetReferences:assetIds.length,exactFieldComparison:true,keys:true,ranks:true,mobileReferences:true,homeReferences:true}
  if(publish){
    execFileSync(process.execPath,['--env-file=.env.local','--import','tsx','migration/scripts/validate-studio.mjs'],{stdio:'inherit',timeout:120000})
    const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));assert.equal(manifest.sourceHash,key(stable(documents)),'Source changed since draft verification')
    function strengthen(v){if(!v||typeof v!=='object')return;if(v._type==='reference')delete v._weak;for(const child of Object.values(v))strengthen(child)}
    documents.forEach(strengthen)
    const transaction=client.transaction()
    for(const d of documents){const live=existing.find(e=>e._id===d._id);assert.equal(live?._rev??null,manifest.revisions[d._id],'Live document changed since backup: '+d._id)
      const fields=Object.fromEntries(Object.entries(d).filter(([k])=>!k.startsWith('_')))
      if(live)transaction.patch(live._id,p=>p.ifRevisionId(live._rev).set(fields))
      else transaction.create(d)
      const draft=drafts.find(e=>e._id==='drafts.'+d._id)
      transaction.patch(draft._id,p=>p.ifRevisionId(draft._rev).set({_migrationVerified:true}))
      transaction.delete(draft._id)
    }
    await transaction.commit();report.published=documents.map(d=>d._id)
    const live=await client.fetch('*[_id in $ids]',{ids:documents.map(d=>d._id)});assert.equal(live.length,12)
    for(const d of documents){const actual=live.find(e=>e._id===d._id);for(const [f,v]of Object.entries(d).filter(([k])=>!k.startsWith('_')))assert.equal(stable(actual[f]),stable(v))}
    console.log('Published verified documents:',live.length)
  }
  save('migration/reports/'+(publish?'migration-published':'migration-verification')+'.json',report)
  console.log('Verification passed:',report.verification)
}
if(process.argv[1]?.endsWith('migrate.mjs'))main().catch(error=>{console.error(String(error.message).replaceAll(token,'[redacted]'));process.exitCode=1})
