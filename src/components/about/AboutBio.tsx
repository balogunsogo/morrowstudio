import {PortableText} from '@portabletext/react'
import type {About} from './types'
import styles from './About.module.scss'

export default function AboutBio({body,mobileBody}: {body: About['bio'];mobileBody?:About['bio']}) {
  if (!body?.length) return null
  return <section className={styles.bio} aria-labelledby="about-bio-heading">
    <h2 id="about-bio-heading" className={styles.label}>Studio</h2>
    <div className={styles.bioContent}><div className={mobileBody?.length?styles.desktopCopy:styles.bioCopy}><PortableText value={body}/></div>{mobileBody?.length&&<div className={styles.mobileCopy}><PortableText value={mobileBody}/></div>}</div>
  </section>
}
