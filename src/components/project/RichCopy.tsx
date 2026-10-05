import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import TextReveal from '../site/TextReveal'
import TextRevealWords from '../site/TextRevealWords'

export default function RichCopy({value,inline,revealWords,revealParagraphs}: {value: PortableTextBlock[];inline?:boolean;revealWords?:boolean;revealParagraphs?:'first'|'all'}) {
  const components: Partial<PortableTextComponents> = {
    block: inline ? {
      normal: ({children}) => <span className="project-copy-line">{revealWords ? <TextRevealWords>{children}</TextRevealWords> : children}</span>,
    } : revealParagraphs || revealWords ? {
      normal: ({children, index}) => revealParagraphs === 'all' || (revealParagraphs === 'first' && index === 0)
        ? <TextReveal as="p"><TextRevealWords>{children}</TextRevealWords></TextReveal>
        : <p>{revealWords ? <TextRevealWords>{children}</TextRevealWords> : children}</p>,
    } : undefined,
    marks:{muted:({children})=><span className="project-muted">{children}</span>},
  }
  return <PortableText value={value} components={components} />
}
