import type {SanityImageObject} from '@sanity/image-url'
import SanityImage from '../SanityImage'
import {childField, type EditingField} from '@/sanity/lib/dataAttribute'

type ContainedImageProps = {
  image?: SanityImageObject
  alt?: string
  caption?: string
  size?: 'small' | 'medium' | 'large'
  alignment?: 'left' | 'center' | 'right'
  editing?: EditingField
  imagePath?: string
}

export default function ContainedImage({
  image, alt, caption, size = 'medium', alignment = 'center', editing, imagePath = 'image',
}: ContainedImageProps) {
  return (
    <figure className="project-contained-image project-block" data-size={size} data-alignment={alignment}>
      <SanityImage
        image={image}
        editing={childField(editing, imagePath)}
        alt={alt}
        aspectRatio={16 / 10}
        sizes={`(max-width: 760px) 100vw, ${size === 'small' ? '50vw' : size === 'medium' ? '67vw' : '83vw'}`}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
