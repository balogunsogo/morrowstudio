import type {Metadata} from 'next'
import type {SanityImageObject} from '@sanity/image-url'
import {urlFor} from '@/sanity/lib/image'
import {isSanityImage} from '@/components/project/SanityImage'

const configured=process.env.SITE_URL??process.env.NEXT_PUBLIC_SITE_URL
export function parseSiteUrl(value?: string): URL | undefined {
  if (!value?.trim()) return undefined
  try {
    const url = new URL(value.trim())
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined
    return new URL(url.origin)
  } catch {
    return undefined
  }
}
export const siteUrl=parseSiteUrl(configured)
export const siteDescription='An independent creative practice making identities, digital experiences and visual systems.'
export function pageMetadata(title:string,description:string,path:string,image?:SanityImageObject):Metadata {
  const url=siteUrl?new URL(path,siteUrl).href:undefined
  const images=isSanityImage(image)?[{url:urlFor(image).width(1200).height(630).fit('crop').auto('format').url(),width:1200,height:630,alt:title}]:undefined
  return {title,description,alternates:url?{canonical:url}:undefined,openGraph:{title:title==='Morrow Studio'?title:`${title} — Morrow Studio`,description,type:'website',siteName:'Morrow Studio',url,images},twitter:{card:images?'summary_large_image':'summary',title,description,images}}
}
