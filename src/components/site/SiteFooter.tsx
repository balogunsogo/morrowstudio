import type {Homepage} from '../home/types'
import {stegaClean} from 'next-sanity'
import styles from './SiteFooter.module.scss'

type SiteFooterProps = {heading?: string | null; email?: string | null; socialLinks?: Homepage['socialLinks']; location?: string | null; brand?: string | null;compact?:boolean;archive?:boolean;generalEmail?:string;studioHours?:string}

export default function SiteFooter({heading, email, socialLinks, location, brand,compact,archive,generalEmail,studioHours}: SiteFooterProps) {
  return <footer className={`${styles.footer} ${compact?styles.compact:''} ${archive?styles.archive:''}`} id="contact">
    <div className={styles.footerGrid}>
      {heading && <h2>{heading}</h2>}
      {(compact||archive)&&<p className={styles.copyright}>© 2026 Morrow Studio</p>}
      {email && <a className={styles.footerEmail} href={`mailto:${stegaClean(email)}`}>{email}</a>}
      <ul className={styles.socialLinks}>{socialLinks?.map(link => <li key={link._key}>{link.url && /^https?:\/\//i.test(stegaClean(link.url)) ? <a href={stegaClean(link.url)}>{link.label} ↗</a> : link.label}</li>)}</ul>
      <p className={styles.footerLocation}>{studioHours?<><span className={styles.desktopLocation}>{studioHours}</span><span className={styles.mobileLocation}>{location}</span></>:location}</p>
      <div className={styles.backToTop}>{generalEmail&&<p>General<br/><a href={`mailto:${stegaClean(generalEmail)}`}>{generalEmail}</a></p>}<a href="#top">Back to top ↑</a></div>
    </div>
    <div className={styles.footerWordmark} aria-hidden="true"><span className={styles.desktopWordmark}>{brand}</span><span className={styles.mobileWordmark}>{brand?.trim().split(/\s+/)[0]}</span></div>
  </footer>
}
