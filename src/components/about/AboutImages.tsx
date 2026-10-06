import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import styles from './About.module.scss'

export default function AboutImages({primaryImage, secondaryImage,primaryCaption,secondaryCaption}: {primaryImage?: unknown; secondaryImage?: unknown;primaryCaption?:string;secondaryCaption?:string}) {
  const primary = isSanityImage(primaryImage) ? primaryImage : undefined
  const secondary = isSanityImage(secondaryImage) ? secondaryImage : undefined
  if (!primary && !secondary) return null
  const alt = (image: NonNullable<typeof primary>) => 'alt' in image && typeof image.alt === 'string' ? image.alt : ''
  return <section className={styles.images} data-paired={!!primary && !!secondary} aria-label="Studio imagery">
    {primary && <figure className={styles.primaryImage}><SanityImage image={primary} alt={alt(primary)} editing={{id: 'about', type: 'about', path: 'primaryImage'}} aspectRatio={4 / 3} sizes="(max-width: 760px) 100vw, (max-width: 1024px) calc(58.333vw - 34.667px), calc(58.333vw - 45.667px)" />{primaryCaption&&<figcaption>{primaryCaption}</figcaption>}</figure>}
    {secondary && <figure className={styles.secondaryImage}><SanityImage image={secondary} alt={alt(secondary)} editing={{id: 'about', type: 'about', path: 'secondaryImage'}} aspectRatio={3 / 4} sizes="(max-width: 760px) 52vw, (max-width: 1024px) calc(33.333vw - 26.667px), calc(25vw - 31px)" />{secondaryCaption&&<figcaption>{secondaryCaption}</figcaption>}</figure>}
  </section>
}
