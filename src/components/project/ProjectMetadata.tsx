import type {Project} from './types'

export default function ProjectMetadata({project}: {project: Project}) {
  const services = project.services ?? project.disciplines
  const mobileServices = project.mobileMetadata?.services ?? services
  const client = project.client
  const mobileClient = project.mobileMetadata?.client ?? client
  const render = (labels?: string[], name?: string) => <dl className="project-meta">
    <div><dt>Year</dt><dd>{project.year}</dd></div>
    {!!labels?.length && <div><dt>Services</dt><dd><ul>{labels.map((label, index) => <li key={`${index}-${label}`}>{label}</li>)}</ul></dd></div>}
    {name && <div><dt>Client</dt><dd>{name}</dd></div>}
  </dl>
  return project.mobileMetadata ? <>
    <div className="project-meta-variant project-desktop-only">{render(services, client)}</div>
    <div className="project-meta-variant project-mobile-only">{render(mobileServices, mobileClient)}</div>
  </> : render(services, client)
}
