import SanityImage from '../SanityImage'
import type {ImageUse} from '../types'
import {childField, type EditingField} from '@/sanity/lib/dataAttribute'
type Props = {uses: (ImageUse & {side: 'left' | 'right'; imagePath: string})[]; sharedCaption?: string; editing?: EditingField}
export default function ImagePair({uses, sharedCaption, editing}: Props) {
  return <section className="project-image-pair project-block">
    {uses.map(use => <figure key={use.side} data-image-side={use.side}>
      <SanityImage image={use.image} alt={use.alt} editing={childField(editing, use.imagePath)} aspectRatio={4 / 5} sizes="50vw" />
      {use.caption && <figcaption>{use.caption}</figcaption>}
    </figure>)}
    {sharedCaption && <p className="project-pair-caption">{sharedCaption}</p>}
  </section>
}
