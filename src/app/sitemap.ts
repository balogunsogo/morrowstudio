import type {MetadataRoute} from 'next'
import {siteUrl} from '@/lib/seo'
import {client} from '@/sanity/lib/client'
// A metadata route has no mounted SanityLive client to invalidate its output.
export const dynamic = 'force-dynamic'
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  if(!siteUrl)return []
  const projects=await client.fetch<{slug:string;updated:string}[]>('*[_type=="project" && defined(slug.current)]{"slug":slug.current,"updated":_updatedAt}',{},{perspective:'published',stega:false,cache:'no-store'})
  return [...['/','/work','/about'].map(path=>({url:new URL(path,siteUrl).href})),...projects.map(p=>({url:new URL('/work/'+p.slug,siteUrl).href,lastModified:p.updated}))]
}
