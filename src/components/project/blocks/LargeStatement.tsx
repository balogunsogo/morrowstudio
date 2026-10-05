import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

type LargeStatementProps = {
  text?: string
  body?: PortableTextBlock[]
  alignment?: 'left' | 'center' | 'right'
}

export default function LargeStatement({
  text,
  body,
  alignment = 'left',
}: LargeStatementProps) {
  if (!body?.length && !text) return null
  return (
    <section className="project-statement project-block" data-alignment={alignment} style={{textAlign: alignment}}>
      {body?.length ? <PortableText value={body} components={{
        marks: {muted: ({children}) => <span className="project-muted">{children}</span>},
      }} /> : <p>{text}</p>}
    </section>
  )
}
