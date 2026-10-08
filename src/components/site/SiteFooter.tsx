import type {Homepage} from '../home/types'
import {stegaClean} from 'next-sanity'
import styles from './SiteFooter.module.scss'
import FooterWordmark from './FooterWordmark'
import {creator, contactEmail, creatorLinks} from '@/lib/creator'

type SiteFooterProps = {heading?: string | null; email?: string | null; socialLinks?: Homepage['socialLinks']; location?: string | null; brand?: string | null;compact?:boolean;archive?:boolean;generalEmail?:string;studioHours?:string;showArrows?:boolean}

export default function SiteFooter({heading, email, socialLinks, location, brand,compact,archive,generalEmail,studioHours}: SiteFooterProps) {
  const primary = contactEmail(email)
  const general = generalEmail ? contactEmail(generalEmail) : undefined
  const links = creatorLinks(socialLinks)
  return <footer className={`${styles.footer} ${compact?styles.compact:''} ${archive?styles.archive:''}`} id="contact">
    <div className={styles.footerGrid}>
      {heading && <h2>{heading}</h2>}
      <a className={styles.footerEmail} href={`mailto:${primary}`}>{primary}</a>
      <div className={styles.creatorCredit} data-creator-attribution>
        <p className={styles.copyright}>MORROW STUDIO © 2026</p>
        <p>An independent digital concept.</p>
        <p>Designed &amp; developed by <a href={creator.portfolio}>{creator.name}</a>.</p>
      </div>
      <ul className={styles.socialLinks} aria-label="Creator links" role="list">{links.map(link => <li key={link._key}><a href={link.url}>{link.label}</a></li>)}</ul>
      <p className={styles.footerLocation}>{studioHours?<><span className={styles.desktopLocation}>{studioHours}</span><span className={styles.mobileLocation}>{location}</span></>:location}</p>
      <div className={styles.backToTop}>{general && general !== primary && <p>General<br/><a href={`mailto:${general}`}>{general}</a></p>}<a href="#top">Back to top</a></div>
    </div>
    <FooterWordmark brand={stegaClean(brand)} />
  </footer>
}
