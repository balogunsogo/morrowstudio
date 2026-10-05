import {ABOUT_QUERY, HOMEPAGE_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import AboutPage from '@/components/about/AboutPage'
import type {About} from '@/components/about/types'
import type {Homepage} from '@/components/home/types'
import {pageMetadata,siteDescription} from '@/lib/seo'
import {isSanityImage} from '@/components/project/SanityImage'
export async function generateMetadata(){const {data}=await sanityFetch({query:ABOUT_QUERY,stega:false});const about=data as About|null;return pageMetadata('About',about?.statement??siteDescription,'/about',isSanityImage(about?.primaryImage)?about.primaryImage:undefined)}

export default async function AboutRoute() {
  const [about, home] = await Promise.all([
    sanityFetch({query: ABOUT_QUERY}),
    sanityFetch({query: HOMEPAGE_QUERY}),
  ])
  return <AboutPage about={about.data as About | null} home={home.data as Homepage | null} />
}
