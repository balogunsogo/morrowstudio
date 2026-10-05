import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import styles from './About.module.scss'

export default function AboutImages({primaryImage, secondaryImage,primaryCaption,secondaryCaption}: {primaryImage?: unknown; secondaryImage?: unknown;primaryCaption?:string;secondaryCaption?:string}) {
  const primary = isSanityImage(primaryImage) ? primaryImage : undefined
  const secondary = isSanityImage(secondaryImage) ? secondaryImage : undefined
  if (!primary && !secondary) return null
  const alt = (image: NonNullable<typeof primary>) => 'alt' in image && typeof image.alt === 'string' ? image.alt : ''
  return <section className={styles.images} data-paired={!!primary && !!secondary} aria-label="Studio imagery">
    {primary && <figure className={styles.primaryImage}><SanityImage image={primary} alt={alt(primary)} editing={{id: 'about', type: 'about', path: 'primaryImage'}} aspectRatio={4 / 3} sizes="(max-width: 760px) calc(100vw - 32px), 58vw" />{primaryCaption&&<figcaption>{primaryCaption}</figcaption>}</figure>}
    {secondary && <figure className={styles.secondaryImage}><SanityImage image={secondary} alt={alt(secondary)} editing={{id: 'about', type: 'about', path: 'secondaryImage'}} aspectRatio={3 / 4} sizes="(max-width: 760px) 58vw, 25vw" />{secondaryCaption&&<figcaption>{secondaryCaption}</figcaption>}</figure>}
  </section>
}
