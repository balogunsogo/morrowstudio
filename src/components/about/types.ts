import type {PortableTextBlock} from '@portabletext/types'
import type {Homepage} from '@/components/home/types'

export type About = {
  studioAddress?:string;pressEmail?:string
  statementBody?:PortableTextBlock[];mobileStatementBody?:PortableTextBlock[];mobileBio?:PortableTextBlock[]
  primaryCaption?:string;secondaryCaption?:string;mobileClients?:string[]
  capabilityItems?:{_key:string;title:string;description?:string;mobileDescription?:string}[]
  eyebrow?: string | null
  statement?: string | null
  bio?: PortableTextBlock[] | null
  primaryImage?: unknown
  secondaryImage?: unknown
  capabilities?: string[] | null
  clients?: string[] | null
  recognition?: {_key: string; title?: string | null; year?: number | null;project?:string}[] | null
  contactHeading?: string | null
  contactEmail?: string | null
  socialLinks?: Homepage['socialLinks']
}
