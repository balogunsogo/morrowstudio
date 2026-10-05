import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import type {WorkProject} from '@/components/work/types'
import styles from './Home.module.scss'

export default function ProjectImage({project, ratio, mobileRatio, sizes}: {
  project: WorkProject; ratio: number; mobileRatio?: number; sizes: string
}) {
  if (!isSanityImage(project.coverImage)) return <span className={styles.imagePlaceholder}>Image unavailable</span>
  const image = project.coverImage
  const alt = 'alt' in image && typeof image.alt === 'string' ? image.alt : project.title
  return <SanityImage image={image} alt={alt} editing={{id: project._id, path: 'coverImage'}} aspectRatio={ratio} mobileAspectRatio={mobileRatio} sizes={sizes} />
}
