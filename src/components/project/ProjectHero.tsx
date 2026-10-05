import SanityImage, {isSanityImage} from './SanityImage'
import {heroForProject} from './contract'
import type {Project} from './types'

export default function ProjectHero({project}: {project: Project}) {
  const hero = heroForProject(project)
  if (!isSanityImage(hero.desktop)) return null
  const desktop = <SanityImage image={hero.desktop} alt={hero.desktop.alt}
    editing={{id: project._id, path: hero.desktopPath}} aspectRatio={16 / 9} mobileAspectRatio={4 / 5} />
  return <figure className="project-hero">
    {isSanityImage(project.mobileHeroImage) ? <>
      <div className="project-desktop-only">{desktop}</div>
      <div className="project-mobile-only"><SanityImage image={project.mobileHeroImage} alt={project.mobileHeroImage.alt}
        editing={{id: project._id, path: hero.mobilePath}} aspectRatio={4 / 5} /></div>
    </> : desktop}
  </figure>
}
