import RichCopy from '../RichCopy'
import type {PortableTextBlock} from '@portabletext/types'
import {stegaClean} from 'next-sanity'

type TextBlockProps = {
  body: PortableTextBlock[]
  label?: string
}

export default function TextBlock({body, label}: TextBlockProps) {
  return (
    <section className="project-text project-block" data-label={stegaClean(label)}>
      {label && <h2>({label})</h2>}
      <div><RichCopy value={body} /></div>
    </section>
  )
}
