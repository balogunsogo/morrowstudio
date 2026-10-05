import {HOMEPAGE_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import HomePage from '@/components/home/HomePage'
import type {Homepage} from '@/components/home/types'
import {pageMetadata,siteDescription} from '@/lib/seo'
import {isSanityImage} from '@/components/project/SanityImage'

export async function generateMetadata(){const {data}=await sanityFetch({query:HOMEPAGE_QUERY,stega:false});const home=data as Homepage|null;return {...pageMetadata('Morrow Studio',home?.heroIntro??siteDescription,'/',isSanityImage(home?.heroImage)?home.heroImage:undefined),title:{absolute:'Morrow Studio'}}}

export default async function Home() {
  const {data} = await sanityFetch({query: HOMEPAGE_QUERY})
  return <HomePage home={data as Homepage | null} />
}
