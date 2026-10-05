import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import type {WorkProject} from './types'
import styles from './Work.module.scss'

export default function WorkCard({project}: {project: WorkProject}) {
  const content = (
    <>
      <span className={styles.cardImage} aria-hidden="true">
        {isSanityImage(project.coverImage) ? (
          <SanityImage image={project.coverImage} alt="" editing={{id: project._id, path: 'coverImage'}} aspectRatio={4 / 5} sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : <span className={styles.missingPreview}>No cover image available</span>}
      </span>
      <span className={styles.cardMeta}>
        <span className={styles.title}><span className={styles.titleLink}>{project.title}</span></span>
        <span className={styles.year}>{project.year}</span>
        <span className={styles.disciplines}>{project.disciplines?.join(', ')}</span>
      </span>
    </>
  )

  return project.slug?.current ? (
    <Link className={styles.card} href={`/work/${stegaClean(project.slug.current)}`}>{content}</Link>
  ) : <div className={styles.card}>{content}</div>
}
