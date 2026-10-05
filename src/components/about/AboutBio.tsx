import {PortableText, type PortableTextComponents} from '@portabletext/react'
import TextReveal from '../site/TextReveal'
import TextRevealWords from '../site/TextRevealWords'
import type {About} from './types'
import styles from './About.module.scss'

const components: Partial<PortableTextComponents> = {
  block: {
    normal: ({children, index}) => index === 0
      ? <TextReveal as="p"><TextRevealWords>{children}</TextRevealWords></TextReveal>
      : <p>{children}</p>,
  },
}

export default function AboutBio({body,mobileBody}: {body: About['bio'];mobileBody?:About['bio']}) {
  if (!body?.length) return null
  return <section className={styles.bio} aria-labelledby="about-bio-heading">
    <h2 id="about-bio-heading" className={styles.label}>Studio</h2>
    <div className={styles.bioContent}><div className={mobileBody?.length?styles.desktopCopy:styles.bioCopy}><PortableText value={body} components={components}/></div>{mobileBody?.length&&<div className={styles.mobileCopy}><PortableText value={mobileBody} components={components}/></div>}</div>
  </section>
}
