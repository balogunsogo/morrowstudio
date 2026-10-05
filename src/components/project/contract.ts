import {stegaClean} from 'next-sanity'
import {validateMobileOrder, validateSelection} from '@/sanity/schemaTypes/shared/validation'
import type {ContentBlock, CreditsContent, GalleryImage, ImageUse, PairContent, Project} from './types'

export type Viewport = 'desktop' | 'mobile'

export function selectKeys<T extends {_key?: string}>(items: T[], keys?: string[]): T[] {
  if (!Array.isArray(keys)) return items
  const cleanKeys = keys.map(key => stegaClean(key))
  // Studio rejects invalid references. An in-progress malformed draft falls back safely.
  if (validateSelection(cleanKeys, items) !== true) return items
  const byKey = new Map(items.map(item => [item._key, item]))
  return cleanKeys.flatMap(key => {const item = byKey.get(key); return item ? [item] : []})
}

export function contentForViewport(content: ContentBlock[], viewport: Viewport, mobileOrder?: string[]): ContentBlock[] {
  const order = mobileOrder?.map(key => stegaClean(key))
  const normalized = content.map(block => ({...block, visibility: stegaClean(block.visibility)}))
  const ordered = viewport === 'mobile' && validateMobileOrder(order, normalized) === true
    ? selectKeys(normalized, order) : normalized
  return ordered.filter(block => block.visibility !== (viewport === 'mobile' ? 'desktop' : 'mobile'))
}

export function needsResponsiveContent(content: ContentBlock[], mobileOrder?: string[]): boolean {
  return Array.isArray(mobileOrder) || content.some(block =>
    (block.visibility && stegaClean(block.visibility) !== 'all') ||
    ('mobile' in block && block.mobile != null) ||
    ('mobileImageKeys' in block && block.mobileImageKeys != null) ||
    (block._type === 'gallery' && block.images?.some(image => image.mobile != null || (image.visibility && stegaClean(image.visibility) !== 'all'))) ||
    ('mobileCreditKeys' in block && block.mobileCreditKeys != null) ||
    ('mobileOverrides' in block && block.mobileOverrides != null))
}

export function imageUseForViewport(use: ImageUse, mobile: ImageUse | undefined, viewport: Viewport): ImageUse {
  if (viewport === 'desktop' || !mobile) return use
  return {image: mobile.image ?? use.image, alt: mobile.alt ?? use.alt, caption: mobile.caption ?? use.caption}
}

export function pairForViewport(block: PairContent, viewport: Viewport): {
  uses: (ImageUse & {side: 'left' | 'right'; imagePath: string})[]; sharedCaption?: string
} {
  const uses = (['left', 'right'] as const).map(side => {
    const legacy = side === 'left' ? block.leftImage : block.rightImage
    const canonical = {...block[side], image: block[side]?.image ?? legacy}
    const override = viewport === 'mobile' ? block.mobile?.[side] : undefined
    return {...imageUseForViewport(canonical, override, viewport), side,
      imagePath: override?.image ? `mobile.${side}.image` : block[side]?.image ? `${side}.image` : `${side}Image`,
    }
  })
  const order = block.mobile?.order?.map(side => stegaClean(side))
  const reordered = viewport === 'mobile' && order?.length === 2 && new Set(order).size === 2 &&
    order.every(side => side === 'left' || side === 'right')
    ? order.flatMap(side => uses.filter(use => use.side === side)) : uses
  return {uses: reordered, sharedCaption: viewport === 'mobile' ? block.mobile?.sharedCaption ?? block.sharedCaption : block.sharedCaption}
}

export function galleryForViewport(images: GalleryImage[], viewport: Viewport, keys?: string[]): GalleryImage[] {
  const selected = viewport === 'mobile' ? selectKeys(images, keys) : images
  return selected.filter(image => stegaClean(image.visibility) !== (viewport === 'mobile' ? 'desktop' : 'mobile'))
    .map(image => viewport === 'mobile' ? {...image, alt: image.mobile?.alt ?? image.alt, caption: image.mobile?.caption ?? image.caption} : image)
}

export function creditsForViewport(block: CreditsContent, viewport: Viewport) {
  const rows = block.items ?? []
  if (viewport === 'desktop') return rows
  return selectKeys(rows, block.mobileCreditKeys).map(row => {
    const override = block.mobileOverrides?.find(item => stegaClean(item.creditKey) === row._key)
    return {...row, role: override?.role ?? row.role, name: override?.name ?? row.name}
  })
}

export function heroForProject(project: Pick<Project, 'heroImage' | 'mobileHeroImage' | 'coverImage'>) {
  // Only a legacy fallback: the canonical fields remain distinct in storage/query.
  const desktop = project.heroImage ?? project.coverImage
  return {desktop, mobile: project.mobileHeroImage ?? desktop,
    desktopPath: project.heroImage ? 'heroImage' : 'coverImage',
    mobilePath: project.mobileHeroImage ? 'mobileHeroImage' : project.heroImage ? 'heroImage' : 'coverImage',
  }
}
