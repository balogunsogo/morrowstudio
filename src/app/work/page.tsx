import SiteNavigation from '@/components/home/SiteNavigation'
import SiteFooter from '@/components/site/SiteFooter'
import MobileMenuDetails from '@/components/site/MobileMenuDetails'
import type {Homepage} from '@/components/home/types'
import type {Metadata} from 'next'
import {pageMetadata} from '@/lib/seo'
import {sanityFetch} from '@/sanity/lib/live'
import {PROJECTS_QUERY, HOMEPAGE_QUERY} from '@/sanity/lib/queries'
import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import WorkIndex from '@/components/work/WorkIndex'
import WorkRow from '@/components/work/WorkRow'
import WorkCard from '@/components/work/WorkCard'
import type {WorkProject} from '@/components/work/types'
import styles from '@/components/work/Work.module.scss'

export const metadata: Metadata = pageMetadata('Work','Selected identities, digital experiences and visual systems by Morrow Studio.','/work')

export default async function WorkPage() {
  const [{data}, {data: homepage}] = await Promise.all([sanityFetch({query: PROJECTS_QUERY}), sanityFetch({query: HOMEPAGE_QUERY})])
  const home = homepage as Homepage | null
  const projects = (data ?? []) as WorkProject[]

  const entries = projects.map((project, index) => ({
    id: project._id,
    disciplines: project.disciplines ?? [],
    row: <WorkRow project={project} index={index} />,
    card: <WorkCard project={project} />,
    preview: (
      <figure>
        <div className={styles.previewImage}>
          {isSanityImage(project.coverImage) ? (
            <SanityImage image={project.coverImage} alt="" editing={{id: project._id, path: 'coverImage'}} aspectRatio={4 / 5} sizes="33vw" />
          ) : <p className={styles.missingPreview}>No cover image available</p>}
        </div>
        <figcaption className={styles.previewCaption}>
          <span>{project.title}</span>
          <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </figcaption>
        <p className={styles.disciplines}>{project.sector} — {project.disciplines?.join(', ')}</p>
      </figure>
    ),
  }))

  return (
    <div className={styles.page} id="top">
      <SiteNavigation title={home?.heroTitle} eyebrow={home?.heroEyebrow} location={home?.location} count={projects.length} menuDetails={<MobileMenuDetails home={home} />} />
      <main className={styles.content}>
        <WorkIndex entries={entries} intro={home?.archiveIntro}/>
      </main>
      {home && <SiteFooter archive heading={home.footerHeading} email={home.footerEmail} socialLinks={home.socialLinks} location={home.footerLocation} brand={home.heroTitle} />}
    </div>
  )
}
