import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import type {Homepage} from '../home/types'
import SanityImage, {isSanityImage} from '../project/SanityImage'
import styles from './MobileMenu.module.scss'

export default function MobileMenuDetails({home}: {home: Homepage | null}) {
  if (!home) return null
  const project = home.featuredProjects?.find(item => item.project?.slug?.current)?.project
  return <>
    {project?.slug?.current && <Link className={styles.teaser} href={`/work/${stegaClean(project.slug.current)}`}>
      <span className={styles.thumbnail}>{isSanityImage(project.coverImage) && <SanityImage image={project.coverImage} alt="" aspectRatio={4 / 5} sizes="72px" />}</span>
      <span><span className={styles.muted}>Latest project</span><span className={styles.teaserTitle}>{project.title} →</span></span>
    </Link>}
    <div className={styles.details}>
      <div>{home.footerEmail && <><p className={styles.muted}>New business</p><a href={`mailto:${stegaClean(home.footerEmail)}`}>{home.footerEmail}</a></>}</div>
      <p className={`${styles.location} ${styles.muted}`}>{home.footerLocation || home.location}</p>
      <ul className={styles.socials}>{home.socialLinks?.map(link => <li key={link._key}>{link.url && /^https?:\/\//i.test(stegaClean(link.url)) ? <a href={stegaClean(link.url)}>{link.label}</a> : link.label}</li>)}</ul>
    </div>
  </>
}
