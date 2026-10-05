import RichCopy from '../RichCopy'
import type {PortableTextBlock} from '@portabletext/types'
import type {SanityImageObject} from '@sanity/image-url'
import SanityImage from '../SanityImage'
import {childField, type EditingField} from '@/sanity/lib/dataAttribute'

type ImageWithTextProps = {
  image?: SanityImageObject
  alt?: string
  body: PortableTextBlock[]
  layout?: 'imageLeft' | 'imageRight'
  editing?: EditingField
  label?: string
  imagePath?: string
}

export default function ImageWithText({
  image, alt, body, layout = 'imageLeft', editing, label = 'Image + text', imagePath = 'image',
}: ImageWithTextProps) {
  return (
    <section className="project-image-text project-block" data-layout={layout}>
      <figure><SanityImage image={image} alt={alt} editing={childField(editing, imagePath)} aspectRatio={4 / 5} sizes="(max-width: 760px) 100vw, 50vw" /></figure>
      <div>
        {label && <p className="project-module-label">({label})</p>}
        <div className="project-image-text-body"><RichCopy value={body} /></div>
      </div>
    </section>
  )
}
