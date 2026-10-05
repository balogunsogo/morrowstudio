import Image, {getImageProps} from 'next/image'
import type {CSSProperties} from 'react'
import {stegaClean} from 'next-sanity'
import type {SanityImageObject} from '@sanity/image-url'
import {urlFor} from '@/sanity/lib/image'
import {dataAttribute, type EditingField} from '@/sanity/lib/dataAttribute'

export function isSanityImage(value: unknown): value is SanityImageObject {
  if (!value || typeof value !== 'object' || !('asset' in value)) return false
  const asset = value.asset
  return !!asset && typeof asset === 'object' &&
    '_ref' in asset && typeof asset._ref === 'string' &&
    /^image-.+-\d+x\d+-[a-z]+$/.test(asset._ref)
}

type SanityImageProps = {
  image?: SanityImageObject
  alt?: string
  aspectRatio?: number
  mobileAspectRatio?: number
  sizes?: string
  editing?: EditingField
}

export default function SanityImage({
  image, alt = '', aspectRatio, mobileAspectRatio, sizes = '100vw', editing,
}: SanityImageProps) {
  if (!isSanityImage(image)) return null
  // Alt is an attribute, not visible editable text.
  const cleanAlt = stegaClean(alt)

  // Sanity asset filenames encode dimensions; the builder's rect reflects crop.
  const source = new URL(urlFor(image).url())
  const dimensions = source.pathname.match(/-(\d+)x(\d+)\.[a-z]+$/)
  if (!dimensions) return null

  const rect = source.searchParams.get('rect')?.split(',').map(Number)
  const sourceWidth = rect ? rect[2] : Number(dimensions[1])
  const sourceHeight = rect ? rect[3] : Number(dimensions[2])
  if (!(sourceWidth > 0 && sourceHeight > 0)) return null

  const width = Math.min(sourceWidth, 1920)
  const height = Math.max(1, Math.round(width / (aspectRatio ?? sourceWidth / sourceHeight)))
  // Preserve the full original: source compositions crop through CSS, while
  // editor hotspots determine the per-use focal point without double cropping.
  const builder = urlFor(image).width(width)

  const media = (
    <Image
      data-sanity={!mobileAspectRatio ? dataAttribute(editing) : undefined}
      src={builder.auto('format').url()}
      alt={cleanAlt}
      width={width}
      height={height}
      sizes={sizes}
      style={{'--image-ratio':aspectRatio,'--mobile-image-ratio':mobileAspectRatio,objectPosition:image.hotspot ? `${image.hotspot.x*100}% ${image.hotspot.y*100}%` : undefined} as CSSProperties}
    />
  )

  if (!mobileAspectRatio) return media

  const mobileWidth = Math.min(sourceWidth, 1520)
  const mobileHeight = Math.max(1, Math.round(mobileWidth / mobileAspectRatio))
  const {props: mobile} = getImageProps({
    src: urlFor(image).width(mobileWidth).auto('format').url(),
    alt: cleanAlt,
    width: mobileWidth,
    height: mobileHeight,
    sizes,
  })

  return (
    <picture data-sanity={dataAttribute(editing)}>
      <source
        media="(max-width: 760px)"
        srcSet={mobile.srcSet}
        sizes={mobile.sizes}
        width={mobileWidth}
        height={mobileHeight}
      />
      {media}
    </picture>
  )
}
