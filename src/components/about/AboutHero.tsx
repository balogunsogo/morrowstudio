import styles from './About.module.scss'
import RichCopy from '../project/RichCopy'
import TextReveal from '../site/TextReveal'
import TextRevealWords from '../site/TextRevealWords'
import type {PortableTextBlock} from '@portabletext/types'

export default function AboutHero({eyebrow, statement,body,mobileBody}: {eyebrow?: string | null; statement?: string | null;body?:PortableTextBlock[];mobileBody?:PortableTextBlock[]}) {
  if (!eyebrow && !statement && !body?.length && !mobileBody?.length) return null
  return <section className={styles.hero} aria-label="About the studio">
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    {(statement || body?.length || mobileBody?.length) && <TextReveal as="h1"><span className={mobileBody?.length?styles.desktopCopy:undefined}>{body?.length?<RichCopy inline revealWords value={body}/>:<TextRevealWords>{statement}</TextRevealWords>}</span>{mobileBody?.length&&<span className={styles.mobileCopy}><RichCopy inline revealWords value={mobileBody}/></span>}</TextReveal>}
  </section>
}
