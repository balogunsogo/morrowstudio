import type {WorkProject} from '@/components/work/types'
import type {PortableTextBlock} from '@portabletext/types'

export type FeaturedItem = {_key: string; description?:string;layout?: 'large' | 'small' | 'full' | 'pair' | null; project?: WorkProject | null}
export type Homepage = {
  generalEmail?:string;studioHours?:string
  mobileProjectIndex?:WorkProject[]
  established?:string; availability?:string; mobileHeroIntro?:string;archiveIntro?:string
  studioBody?:PortableTextBlock[]; studioStatementBody?:PortableTextBlock[]; projectIndex?:WorkProject[]
  studioCapabilities?:string[]
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroIntro?: string | null
  heroImage?: unknown
  location?: string | null
  featuredProjects?: FeaturedItem[] | null
  studioStatement?: string | null
  projectIndexHeading?: string | null
  footerHeading?: string | null
  footerEmail?: string | null
  socialLinks?: {_key: string; label?: string | null; url?: string | null}[] | null
  footerLocation?: string | null
}
