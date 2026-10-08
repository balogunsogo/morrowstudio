import MobileMenuDetails from '@/components/site/MobileMenuDetails'
import Link from '../site/IntentLink'
import {stegaClean} from 'next-sanity'
import type {Homepage} from './types'
import type {WorkProject} from '@/components/work/types'
import HomeHero from './HomeHero'
import FeaturedProjects from './FeaturedProjects'
import StudioStatement from './StudioStatement'
import ProjectHoverIndex from './ProjectHoverIndex'
import HomeFooter from './HomeFooter'
import SiteNavigation from './SiteNavigation'
import ProjectImage from './ProjectImage'
import styles from './Home.module.scss'

export default function HomePage({home}: {home: Homepage | null}) {
  if (!home) return <main id="main-content" tabIndex={-1} className={styles.page}><div className={styles.empty}><h1>Morrow Studio</h1><p>Homepage content is currently unavailable.</p><Link href="/work">Work</Link></div></main>
  const featured = (home.featuredProjects ?? []).filter(item => item?.project?.slug?.current)
  const projects = home.projectIndex?.length ? home.projectIndex.filter(project => project?.slug?.current) : featured.flatMap(item => item.project ? [item.project] : [])
  const mobileProjects = home.mobileProjectIndex?.length ? home.mobileProjectIndex.filter(project => project?.slug?.current) : undefined
  const indexRow = (project: WorkProject, index: number) => <Link href={`/work/${stegaClean(project.slug!.current)}`} className={styles.indexLink}>
    <span className={styles.indexNumber}>{String(index + 1).padStart(2, '0')}</span>
    <span className={styles.indexThumbnail}><ProjectImage project={project} ratio={4 / 5} sizes="52px" /></span>
    <span className={styles.indexTitle}>{project.title}</span><span className={styles.indexYear}>{project.year}</span>
  </Link>
  return <div className={styles.page} id="top">
    <SiteNavigation menuDetails={<MobileMenuDetails home={home} />} title={home.heroTitle} eyebrow={home.heroEyebrow} location={home.location} count={projects.length} />
    <main id="main-content" tabIndex={-1}>
      <HomeHero home={home} />
      <FeaturedProjects items={featured} count={featured.length} heading={home.projectIndexHeading} />
      <StudioStatement text={home.studioStatement} body={home.studioBody} statementBody={home.studioStatementBody} capabilities={home.studioCapabilities} />
      <section className={styles.index} aria-labelledby="project-index-heading">
        <div className={styles.sectionHeader}><h2 id="project-index-heading">(03) Index</h2><span className={styles.indexHint}>Hover or focus to explore</span><span>{String(projects.length).padStart(2, '0')} projects</span></div>
        <ProjectHoverIndex mobileItems={mobileProjects?.map((project, index) => ({id: project._id, row: indexRow(project, index)}))} items={projects.map((project, index) => ({
          id: project._id,
          row: indexRow(project, index),
          preview: <figure><ProjectImage project={project} ratio={4 / 5} sizes="(max-width: 760px) 52px, (max-width: 1024px) calc(33.333vw - 26.667px), calc(33.333vw - 34.667px)" /><figcaption>{project.title} — {project.year}<br />{project.disciplines?.join(' / ')}</figcaption></figure>,
        }))} />
        <Link className={styles.archiveLink} href="/work">Full project archive</Link>
      </section>
    </main>
    <HomeFooter home={home} />
  </div>
}
