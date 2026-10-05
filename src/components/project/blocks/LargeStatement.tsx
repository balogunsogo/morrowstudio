import RichCopy from '../RichCopy'
import TextReveal from '../../site/TextReveal'
import TextRevealWords from '../../site/TextRevealWords'
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
      {body?.length ? <RichCopy value={body} revealParagraphs="all" /> : <TextReveal as="p"><TextRevealWords>{text}</TextRevealWords></TextReveal>}
    </section>
  )
}
