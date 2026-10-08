import Link from './IntentLink'
import {stegaClean} from 'next-sanity'
import type {Homepage} from '../home/types'
import SanityImage, {isSanityImage} from '../project/SanityImage'
import styles from './MobileMenu.module.scss'
import {contactEmail, creatorLinks} from '@/lib/creator'

export default function MobileMenuDetails({home}: {home: Homepage | null}) {
  if (!home) return null
  const email = contactEmail(home.footerEmail)
  const links = creatorLinks(home.socialLinks)
  const project = home.featuredProjects?.find(item => item.project?.slug?.current)?.project
  return <>
    {project?.slug?.current && <Link className={styles.teaser} href={`/work/${stegaClean(project.slug.current)}`}>
      <span className={styles.thumbnail}>{isSanityImage(project.coverImage) && <SanityImage image={project.coverImage} alt="" aspectRatio={4 / 5} sizes="72px" />}</span>
      <span className={styles.teaserCopy}><span className={styles.muted}>Latest project</span><span className={styles.teaserTitle}>{project.title}</span></span>
    </Link>}
    <div className={styles.details}>
      <div><p className={styles.muted}>New business</p><a href={`mailto:${email}`}>{email}</a></div>
      <p className={`${styles.location} ${styles.muted}`}>{home.footerLocation || home.location}</p>
      <ul className={styles.socials} aria-label="Creator links" role="list">{links.map(link => <li key={link._key}><a href={link.url}>{link.label}</a></li>)}</ul>
    </div>
  </>
}
