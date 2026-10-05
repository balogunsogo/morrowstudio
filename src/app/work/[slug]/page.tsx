import {notFound} from 'next/navigation'
import Link from 'next/link'
import ProjectContent from '@/components/project/ProjectContent'
import {sanityFetch} from '@/sanity/lib/live'
import {PROJECT_BY_SLUG_QUERY, PROJECTS_QUERY, HOMEPAGE_QUERY} from '@/sanity/lib/queries'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectMetadata from '@/components/project/ProjectMetadata'
import type {Project} from '@/components/project/types'
import RichCopy from '@/components/project/RichCopy'
import NextProject from '@/components/project/NextProject'
import SiteNavigation from '@/components/home/SiteNavigation'
import SiteFooter from '@/components/site/SiteFooter'
import MobileMenuDetails from '@/components/site/MobileMenuDetails'
import type {Homepage} from '@/components/home/types'
import type {WorkProject} from '@/components/work/types'
import shell from '@/components/home/Home.module.scss'
import {pageMetadata} from '@/lib/seo'
import '@/styles/globals.scss'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({params}:ProjectPageProps) {
  const {slug}=await params
  const {data}=await sanityFetch({query:PROJECT_BY_SLUG_QUERY,params:{slug},stega:false})
  const project=data as Project|null
  return project ? pageMetadata(project.title,project.summary??'',`/work/${slug}`,project.coverImage??project.heroImage) : {title:'Project unavailable',robots:{index:false}}
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const {slug} = await params

  const {data} = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: {slug},
  })

  const project = data as Project | null

  if (!project) {
    notFound()
  }

  const [{data:archive},{data:homepage}]=await Promise.all([sanityFetch({query:PROJECTS_QUERY}),sanityFetch({query:HOMEPAGE_QUERY})])
  const projects=(archive??[]) as WorkProject[],home=homepage as Homepage|null
  const next=projects[(projects.findIndex(p=>p._id.replace(/^drafts\./,'')===project._id.replace(/^drafts\./,''))+1)%projects.length]
  return (
    <div className={shell.page} id="top">
    <SiteNavigation title={home?.heroTitle} count={projects.length} menuDetails={<MobileMenuDetails home={home}/>} />
    <main className="morrow-project" data-project-slug={slug}>
      <article>
        <header className="project-intro">
          <div className="project-header-line"><p className="project-eyebrow">{project.orderRank ? `(Project ${String(project.orderRank).padStart(2, '0')} / ${String(projects.length).padStart(2,'0')})` : 'Case study'}</p><p className="project-sector">{project.sector} — {project.disciplines?.join(', ')}</p><p className="project-location">{project.location} — {project.year}</p></div>
          <div className="project-header-mobile"><Link href="/work">All work</Link><span>{String(project.orderRank??1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span></div>
          <h1><span className="project-title-line"><span className="project-title-rise">{project.title}</span></span></h1>
          <div className="project-intro-details">
            <div className="project-summary">{project.summaryBody?.length ? <RichCopy value={project.summaryBody}/> : project.summary&&<p>{project.summary}</p>}</div>
            <ProjectMetadata project={project} />
          </div>
        </header>
        <ProjectHero project={project} />
        <div className="project-content">
          <ProjectContent content={project.content} mobileOrder={project.mobileOrder} documentId={project._id} />
        </div>
      </article>
      {next&&<NextProject project={next} total={projects.length}/>}
    </main>
    <SiteFooter compact email={home?.footerEmail} location={home?.footerLocation} brand={home?.heroTitle} socialLinks={home?.socialLinks} showArrows={false}/>
    </div>
  )
}
