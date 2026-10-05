import type {GalleryImage} from '../types'
import SanityImage from '../SanityImage'
import {childField, type EditingField} from '@/sanity/lib/dataAttribute'
import GalleryTrack from './GalleryTrack'

export type {GalleryImage} from '../types'

type GalleryProps = {
  images?: GalleryImage[]
  layout?: 'grid' | 'strip' | 'stack'
  editing?: EditingField
}

export default function Gallery({images, layout = 'grid', editing}: GalleryProps) {
  if (!images?.length) return null

  const figures=images.map((image,index)=><figure key={image._key}>
    <SanityImage image={image} editing={childField(editing,`images[_key==${JSON.stringify(image._key)}]`)} alt={image.alt} aspectRatio={layout==='strip'?(index===0?4/3:4/5):3/2} sizes={layout==='stack'?'(max-width: 760px) 100vw, 67vw':'56vw'}/>
    {image.caption&&<figcaption>{image.caption}</figcaption>}
  </figure>)
  return (
    <section className="project-gallery project-block" data-layout={layout} aria-label="Project gallery">
      <header className="project-gallery-heading">
        <h2>(Gallery)</h2>
        <p>{layout === 'strip' ? 'Swipe — ' : ''}{String(images.length).padStart(2, '0')}</p>
      </header>
      {layout==='strip'?<GalleryTrack count={images.length}>{figures}</GalleryTrack>:<div className="project-gallery-images">{figures}</div>}
    </section>
  )
}
