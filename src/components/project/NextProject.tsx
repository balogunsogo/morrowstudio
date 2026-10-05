import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import type {WorkProject} from '../work/types'
import SanityImage, {isSanityImage} from './SanityImage'

export default function NextProject({project,total}: {project:WorkProject;total:number}) {
  if(!project.slug?.current) return null
  const image=isSanityImage(project.heroImage)?project.heroImage:project.coverImage
  return <Link className="project-next" href={`/work/${stegaClean(project.slug.current)}`}>
    <div className="project-next-label"><span>Next project</span><span>{String(project.orderRank??1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
    <div className="project-next-heading"><h2><span>{project.title}</span></h2><p>{project.sector} — {project.disciplines?.join(', ')}<br/><span>{project.year}</span></p></div>
    {isSanityImage(image)&&<figure><SanityImage image={image} alt={project.title} editing={{id:project._id,path:isSanityImage(project.heroImage)?'heroImage':'coverImage'}} sizes="100vw" /></figure>}
  </Link>
}
