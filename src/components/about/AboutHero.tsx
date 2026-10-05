import styles from './About.module.scss'
import RichCopy from '../project/RichCopy'
import type {PortableTextBlock} from '@portabletext/types'

export default function AboutHero({eyebrow, statement,body,mobileBody}: {eyebrow?: string | null; statement?: string | null;body?:PortableTextBlock[];mobileBody?:PortableTextBlock[]}) {
  if (!eyebrow && !statement) return null
  return <section className={styles.hero} aria-label="About the studio">
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    {statement && <h1><span className={mobileBody?.length?styles.desktopCopy:undefined}>{body?.length?<RichCopy inline value={body}/>:statement}</span>{mobileBody?.length&&<span className={styles.mobileCopy}><RichCopy inline value={mobileBody}/></span>}</h1>}
  </section>
}
