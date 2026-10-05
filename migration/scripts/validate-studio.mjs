import fs from 'node:fs'
import {resolveConfig,validateDocument} from 'sanity'
import {firstValueFrom} from 'rxjs'
import {createClient} from '@sanity/client'
import {schema} from '../../src/sanity/schemaTypes/index.ts'
const token=process.env.SANITY_API_WRITE_TOKEN
const client=createClient({projectId:'m2i4dwyo',dataset:'production',apiVersion:'2026-03-01',token,useCdn:false,perspective:'raw'})
try {
  const [workspace]=await firstValueFrom(resolveConfig({name:'default',title:'Morrow',projectId:'m2i4dwyo',dataset:'production',schema}))
  const docs=await client.fetch('*[_type in ["project","homepage","about"] && _id in path("drafts.**")]')
  const ids=new Set((await client.fetch('*[]._id')).map(id=>id.replace(/^drafts\./,'')))
  const results=[]
  for(const document of docs){
    const markers=await validateDocument({document,workspace,environment:'cli',getClient:options=>client.withConfig(options),getDocumentExists:async({id})=>ids.has(id.replace(/^drafts\./,''))})
    results.push({id:document._id,markers})
    console.log(document.title??document._type,markers.filter(m=>m.level==='error').length,'errors',markers.filter(m=>m.level==='warning').length,'warnings')
  }
  fs.writeFileSync('migration/reports/studio-validation.json',JSON.stringify(results,null,2)+'\n')
  if(results.some(r=>r.markers.some(m=>m.level==='error')))process.exitCode=1
}catch(error){console.error(String(error.message).replaceAll(token,'[redacted]'));process.exitCode=1}
// Studio configuration owns long-lived observable services; this one-off CLI
// has finished once the complete validation report is saved.
process.exit(process.exitCode??0)
