import Link from '../site/IntentLink'
import {stegaClean} from 'next-sanity'
import type {FeaturedItem} from './types'
import ProjectImage from './ProjectImage'
import styles from './Home.module.scss'

export default function FeaturedProject({item, lead = false, trailing = false}: {item: FeaturedItem; lead?: boolean; trailing?: boolean}) {
  const project = item.project
  if (!project?.slug?.current) return null
  const layout = stegaClean(item.layout) ?? 'large'
  const ratio = layout === 'full' ? 21 / 9 : lead ? 3 / 2 : layout === 'pair' ? 4 / 3 : 4 / 5
  const tabletSize = lead ? 'calc(66.667vw - 37.333px)'
    : layout === 'small' ? 'calc(33.333vw - 26.667px)'
    : layout === 'pair' ? trailing ? 'calc(41.667vw - 29.333px)' : 'calc(50vw - 32px)'
    : 'calc(58.333vw - 34.667px)'
  const desktopSize = lead ? 'calc(66.667vw - 49.333px)'
    : layout === 'small' ? 'calc(25vw - 31px)'
    : layout === 'pair' ? trailing ? 'calc(41.667vw - 38.333px)' : 'calc(50vw - 42px)'
    : 'calc(58.333vw - 45.667px)'
  const sizes = layout === 'full' ? '100vw' : `(max-width: 760px) 100vw, (max-width: 1024px) ${tabletSize}, ${desktopSize}`
  return <article className={styles.featuredProject} data-layout={layout} data-lead={lead || undefined}>
    <Link href={`/work/${stegaClean(project.slug.current)}`} className={styles.featuredLink}>
      <figure className={styles.featuredImage}><ProjectImage project={project} ratio={ratio} mobileRatio={4 / 5} sizes={sizes} /></figure>
      <div className={styles.featuredMetadata}>
        {lead&&<p className={styles.projectNumber}>{String(project.orderRank??1).padStart(2,'0')}</p>}
        <h3><span className={styles.titleLink}>{project.title}</span></h3>
        <p className={styles.featuredYear}>{project.year}</p>
        <p className={styles.projectDiscipline}>{item.description??[project.sector,project.disciplines?.join(', ')].filter(Boolean).join(' — ')}</p>
      </div>
    </Link>
  </article>
}
