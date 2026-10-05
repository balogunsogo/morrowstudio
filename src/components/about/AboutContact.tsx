import type {About} from './types'
import {stegaClean} from 'next-sanity'
import styles from './About.module.scss'

export default function AboutContact({heading, email, socialLinks, brand,studioAddress,pressEmail}: {heading?: string | null; email?: string | null; socialLinks: About['socialLinks']; brand?: string | null;studioAddress?:string;pressEmail?:string}) {
  return <footer id="contact" className={styles.contact}>
    <div className={styles.contactGrid}>
      <h2 className={styles.label}>Contact</h2>
      <div className={styles.contactDetails}>
        {heading && <p className={styles.contactHeading}>{heading}</p>}
        {email && <a className={styles.email} href={`mailto:${stegaClean(email)}`}>{email}</a>}
      </div>
      {!!socialLinks?.length && <div className={styles.social}><h3 className={styles.label}>Social</h3><ul>{socialLinks.map(link => <li key={link._key}>{link.url && /^https?:\/\//i.test(stegaClean(link.url)) ? <a href={stegaClean(link.url)}>{link.label} ↗</a> : link.label}</li>)}</ul></div>}
      {studioAddress&&<div className={styles.studioContact}><h3 className={styles.label}>Studio</h3><p>{studioAddress}</p></div>}
      {pressEmail&&<div className={styles.backToTop}><h3 className={styles.label}>Press</h3><a href={`mailto:${stegaClean(pressEmail)}`}>{pressEmail}</a></div>}
    </div>
    {brand && <div className={styles.wordmark} aria-hidden="true"><span className={styles.desktopBrand}>{brand}</span><span className={styles.mobileBrand}>{brand.trim().split(/\s+/)[0]}</span></div>}
  </footer>
}
