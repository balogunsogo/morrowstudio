import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import type {FeaturedItem} from './types'
import ProjectImage from './ProjectImage'
import styles from './Home.module.scss'

export default function FeaturedProject({item, lead = false}: {item: FeaturedItem; lead?: boolean}) {
  const project = item.project
  if (!project?.slug?.current) return null
  const layout = stegaClean(item.layout) ?? 'large'
  const ratio = layout === 'full' ? 21 / 9 : lead ? 3 / 2 : layout === 'pair' ? 4 / 3 : 4 / 5
  return <article className={styles.featuredProject} data-layout={layout} data-lead={lead || undefined}>
    <Link href={`/work/${stegaClean(project.slug.current)}`} className={styles.featuredLink}>
      <figure className={styles.featuredImage}><ProjectImage project={project} ratio={ratio} mobileRatio={layout === 'full' ? 4 / 3 : 4 / 5} sizes={layout === 'full' ? '100vw' : '(max-width: 760px) 100vw, 66vw'} /></figure>
      <div className={styles.featuredMetadata}>
        {lead&&<p className={styles.projectNumber}>{String(project.orderRank??1).padStart(2,'0')}</p>}
        <h3><span className={styles.titleLink}>{project.title}</span></h3>
        <p className={styles.featuredYear}>{project.year}</p>
        <p className={styles.projectDiscipline}>{item.description??[project.sector,project.disciplines?.join(', ')].filter(Boolean).join(' — ')}</p>
      </div>
    </Link>
  </article>
}
