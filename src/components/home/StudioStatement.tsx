import styles from './Home.module.scss'
import type {PortableTextBlock} from '@portabletext/types'
import RichCopy from '../project/RichCopy'
import Link from '../site/IntentLink'
import TextReveal from '../site/TextReveal'
import TextRevealWords from '../site/TextRevealWords'

export default function StudioStatement({text,body,statementBody,capabilities}: {text?: string | null;body?:PortableTextBlock[];statementBody?:PortableTextBlock[];capabilities?:string[]}) {
  if (!text) return null
  return <section className={styles.statement} aria-labelledby="studio-heading"><h2 id="studio-heading">(02) Studio</h2><TextReveal className={styles.studioStatement}>{statementBody?.length?<RichCopy value={statementBody} revealWords/>:<p><TextRevealWords>{text}</TextRevealWords></p>}</TextReveal><div className={styles.studioDetails}>{body?.length&&<RichCopy value={body}/>}{capabilities?.length&&<ul className={styles.studioCapabilities}>{capabilities.map(label=><li key={label}>{label}</li>)}</ul>}<Link href="/about">About the studio</Link></div></section>
}
