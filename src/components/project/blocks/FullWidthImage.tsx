import type {SanityImageObject} from '@sanity/image-url'
import SanityImage from '../SanityImage'
import {childField, type EditingField} from '@/sanity/lib/dataAttribute'

type FullWidthImageProps = {
  image?: SanityImageObject
  alt?: string
  caption?: string
  editing?: EditingField
  imagePath?: string
}

export default function FullWidthImage({image, alt, caption, editing, imagePath = 'image'}: FullWidthImageProps) {
  const parts=caption?.match(/^(Fig\.\s*\d+)\s*(?:—\s*)?([\s\S]*)$/)
  return (
    <figure className="project-full-image project-block">
      <SanityImage image={image} alt={alt} editing={childField(editing, imagePath)} aspectRatio={2} mobileAspectRatio={1} />
      {caption && <figcaption>{parts?<><span>{parts[1]}</span><span>{parts[2]}</span></>:<span>{caption}</span>}</figcaption>}
    </figure>
  )
}
