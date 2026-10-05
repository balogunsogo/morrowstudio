import type {PortableTextBlock} from '@portabletext/types'
import type {SanityImageObject} from '@sanity/image-url'

export type ProjectImage = SanityImageObject & {_type?: 'image'; alt?: string; caption?: string; _key?: string}
export type ImageUse = {image?: ProjectImage; alt?: string; caption?: string}
export type CreditItem = {_key?: string; role: string; name: string}
export type VideoFile = {asset: {_ref?: string; url?: string}}
type Base<T extends string> = {_key: string; _type: T; visibility?: 'all' | 'desktop' | 'mobile'}
type Aligned = {alignment?: 'left' | 'center' | 'right'}

export type TextContent = Base<'textBlock'> & {label?: string; body?: PortableTextBlock[]; mobile?: {body?: PortableTextBlock[]}}
export type FigureContent = Base<'fullWidthImage' | 'containedImage'> & ImageUse & Aligned & {
  size?: 'small' | 'medium' | 'large'; mobile?: ImageUse
}
export type PairContent = Base<'imagePair'> & {
  left?: ImageUse; right?: ImageUse; leftImage?: ProjectImage; rightImage?: ProjectImage; sharedCaption?: string
  mobile?: {left?: ImageUse; right?: ImageUse; sharedCaption?: string; order?: ('left' | 'right')[]}
}
export type StatementContent = Base<'largeStatement'> & Aligned & {text?: string; body?: PortableTextBlock[]}
export type ImageTextContent = Base<'imageWithText'> & ImageUse & {
  label?: string; body?: PortableTextBlock[]; layout?: 'imageLeft' | 'imageRight'
  mobile?: ImageUse & {body?: PortableTextBlock[]}
}
export type GalleryImage = ProjectImage & {_key: string; visibility?: 'all' | 'desktop' | 'mobile'; mobile?: {alt?: string; caption?: string}}
export type GalleryContent = Base<'gallery'> & {
  images?: GalleryImage[]; mobileImageKeys?: string[]; layout?: 'grid' | 'strip' | 'stack'
}
export type QuoteContent = Base<'quoteBlock'> & {
  quote?: string; author?: string; role?: string; alignment?: 'left' | 'center'
  mobile?: {quote?: string; author?: string; role?: string}
}
export type CreditsContent = Base<'creditsBlock'> & {
  title?: string; items?: CreditItem[]; mobileCreditKeys?: string[]
  mobileOverrides?: {_key: string; creditKey: string; role?: string; name?: string}[]
}
export type VideoContent = Base<'videoBlock'> & {
  title?: string; duration?: string; sourceType?: 'file' | 'url' | 'unresolved'
  videoFile?: VideoFile; videoUrl?: string; poster?: ProjectImage; caption?: string
  autoplay?: boolean; loop?: boolean; muted?: boolean
}
export type ContentBlock = TextContent | FigureContent | PairContent | StatementContent |
  ImageTextContent | GalleryContent | QuoteContent | CreditsContent | VideoContent

export type Project = {
  _id: string; title: string; slug: {current: string}; year: number; client?: string
  sector?: string; location?: string; services?: string[]; orderRank?: number
  disciplines?: string[]; summary?: string; summaryBody?: PortableTextBlock[]; coverImage?: ProjectImage
  heroImage?: ProjectImage; mobileHeroImage?: ProjectImage
  mobileMetadata?: {client?: string; services?: string[]}
  content?: ContentBlock[]; mobileOrder?: string[]
}
