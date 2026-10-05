import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import type {WorkProject} from './types'
import styles from './Work.module.scss'

export default function WorkRow({project, index}: {project: WorkProject; index: number}) {
  const content = (
    <>
      <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className={styles.thumbnail} aria-hidden="true">
        {isSanityImage(project.coverImage) ? (
          <SanityImage image={project.coverImage} alt="" editing={{id: project._id, path: 'coverImage'}} aspectRatio={4 / 5} sizes="64px" />
        ) : <span className={styles.missingThumbnail}>No image</span>}
      </span>
      <span className={styles.title}>{project.title}</span>
      <span className={styles.sector}>{project.sector}</span>
      <span className={styles.disciplines}><span className={styles.mobileSector}>{project.sector} — </span>{project.disciplines?.join(', ')}</span>
      <span className={styles.year}><span className={styles.mobileRank}>{String(project.orderRank??index+1).padStart(2,'0')}<br/></span>{project.year}</span>
    </>
  )

  return project.slug?.current ? (
    <Link className={styles.row} href={`/work/${stegaClean(project.slug.current)}`}>{content}</Link>
  ) : <div className={styles.row}>{content}</div>
}
