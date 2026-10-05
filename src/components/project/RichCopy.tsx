import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

export default function RichCopy({value,inline}: {value: PortableTextBlock[];inline?:boolean}) {
  return <PortableText value={value} components={{
    block:inline?{normal:({children})=><span className="project-copy-line">{children}</span>}:undefined,
    marks:{muted:({children})=><span className="project-muted">{children}</span>},
  }} />
}
