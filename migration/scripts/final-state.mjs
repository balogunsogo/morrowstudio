import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createClient} from '@sanity/client'

const token=process.env.SANITY_API_READ_TOKEN
assert.ok(token,'Server read token is required')
const client=createClient({projectId:'m2i4dwyo',dataset:'production',apiVersion:'2026-03-01',useCdn:false,token,perspective:'raw'})
const stable=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.entries(item).sort(([a],[b])=>a.localeCompare(b))):item)
async function main(){
  const before=JSON.parse(fs.readFileSync('migration/backups/2026-10-05T00-05-44-131Z-dry-run.json','utf8')).documents
  const expected=JSON.parse(fs.readFileSync('migration/data/source-mapping.json','utf8'))
  function strengthen(value){if(!value||typeof value!=='object')return;if(value._type==='reference')delete value._weak;Object.values(value).forEach(strengthen)}
  expected.forEach(strengthen)
  const after=await client.fetch('*[_type in ["project","homepage","about","sanity.imageAsset","sanity.fileAsset"]]')
  for(const doc of expected){
    const actual=after.find(item=>item._id===doc._id)
    assert.ok(actual,doc._id+' missing')
    for(const [field,value] of Object.entries(doc).filter(([key])=>!key.startsWith('_')))assert.equal(stable(actual[field]),stable(value),'Published source mismatch: '+doc._id+' '+field)
    const original=before.find(item=>item._id===doc._id)
    for(const [field,value] of Object.entries(original??{}).filter(([key])=>!key.startsWith('_')&&!(key in doc)))assert.equal(stable(actual[field]),stable(value),'Unmapped field changed: '+doc._id+' '+field)
  }
  assert.equal(after.filter(doc=>doc._type==='project'&&!doc._id.startsWith('drafts.')).length,10)
  assert.equal(after.filter(doc=>expected.some(item=>'drafts.'+item._id===doc._id)).length,0)
  assert.ok(before.filter(doc=>!doc._id.startsWith('drafts.')).every(doc=>after.some(item=>item._id===doc._id)),'Original published document/asset removed')
  const originalAssets=new Set(before.filter(doc=>doc._type==='sanity.imageAsset').map(doc=>doc._id))
  const mappedAssets=JSON.parse(fs.readFileSync('migration/reports/migration-published.json','utf8')).assets
  const uploaded=mappedAssets.filter(asset=>!originalAssets.has(asset.id)).length
  const reused=mappedAssets.length-uploaded
  assert.equal(uploaded,56);assert.equal(reused,9)
  const unused=JSON.parse(fs.readFileSync('migration/reports/asset-manifest.json','utf8')).find(asset=>asset.filename==='aster-2.jpg')
  const originalUnused=before.find(doc=>doc.sha1hash===unused.sha1)
  const currentUnused=after.find(doc=>doc.sha1hash===unused.sha1)
  assert.equal(currentUnused?._id,originalUnused?._id,'Unused source newly uploaded')
  assert.ok(!mappedAssets.some(asset=>asset.filename==='aster-2.jpg'))
  const report={at:new Date().toISOString(),projectId:'m2i4dwyo',dataset:'production',publishedProjects:10,publishedGlobals:2,migratedDraftsRemaining:0,exactMappedFields:true,unmappedFieldsPreserved:true,originalPublishedIdsPreserved:true,assets:{used:65,uploaded,reused,unusedSkipped:'aster-2.jpg',unusedAlreadyExisted:!!originalUnused,unusedOriginalRetained:!!currentUnused,latestRunReused:65},documents:expected.map(doc=>({id:doc._id,type:doc._type,title:doc.title??doc._type,rank:doc.orderRank,status:'published',action:before.some(item=>item._id===doc._id)?'patched':'created'})),counts:Object.fromEntries([...new Set(after.map(doc=>doc._type))].map(type=>[type,after.filter(doc=>doc._type===type).length]))}
  fs.writeFileSync('migration/reports/final-state.json',JSON.stringify(report,null,2)+'\n')
  console.log('Final state verified: 10 published projects, 2 globals, 56 uploaded / 9 reused assets, original IDs and unmapped fields preserved.')
}
main().catch(error=>{console.error(String(error.message).replaceAll(token,'[redacted]'));process.exitCode=1})
