import type {MetadataRoute} from 'next'
import {siteUrl} from '@/lib/seo'
export default function robots():MetadataRoute.Robots {
  return {rules:siteUrl?{userAgent:'*',allow:'/',disallow:['/studio','/api/']}:{userAgent:'*',disallow:'/'},sitemap:siteUrl?new URL('/sitemap.xml',siteUrl).href:undefined}
}
