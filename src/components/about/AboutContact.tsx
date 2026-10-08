import type {About} from './types'
import styles from './About.module.scss'
import {contactEmail, creatorLinks} from '@/lib/creator'

export default function AboutContact({heading, email, socialLinks, brand,studioAddress,pressEmail}: {heading?: string | null; email?: string | null; socialLinks: About['socialLinks']; brand?: string | null;studioAddress?:string;pressEmail?:string}) {
  const primary = contactEmail(email)
  const press = pressEmail ? contactEmail(pressEmail) : undefined
  const links = creatorLinks(socialLinks)
  return <footer id="contact" className={styles.contact}>
    <div className={styles.contactGrid}>
      <h2 className={styles.label}>Contact</h2>
      <div className={styles.contactDetails}>
        {heading && <p className={styles.contactHeading}>{heading}</p>}
        <a className={styles.email} href={`mailto:${primary}`}>{primary}</a>
      </div>
      <div className={styles.social}><h3 className={styles.label}>Social</h3><ul>{links.map(link => <li key={link._key}><a href={link.url}>{link.label}</a></li>)}</ul></div>
      {studioAddress&&<div className={styles.studioContact}><h3 className={styles.label}>Studio</h3><p>{studioAddress}</p></div>}
      {press&&<div className={styles.backToTop}><h3 className={styles.label}>Press</h3>{press === primary ? <p>{press}</p> : <a href={`mailto:${press}`}>{press}</a>}</div>}
    </div>
    {brand && <div className={styles.wordmark} aria-hidden="true"><span className={styles.desktopBrand}>{brand}</span><span className={styles.mobileBrand}>{brand.trim().split(/\s+/)[0]}</span></div>}
  </footer>
}
