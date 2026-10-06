import SanityImage, {isSanityImage} from '@/components/project/SanityImage'
import {stegaClean} from 'next-sanity'
import {dataAttribute} from '@/sanity/lib/dataAttribute'
import type {Homepage} from './types'
import styles from './Home.module.scss'

export default function HomeHero({home}: {home: Homepage}) {
  const [first, ...rest] = (home.heroTitle ?? '').trim().split(/\s+/)
  const image = isSanityImage(home.heroImage) ? home.heroImage : undefined
  const alt = image && 'alt' in image && typeof image.alt === 'string' ? image.alt : ''
  return <section className={styles.hero} aria-labelledby="home-title">
    <div className={styles.heroEyebrow}><span>{home.established??home.heroEyebrow}</span><span>Identity / Digital / Visual systems</span><span>{home.location}</span><span className={styles.availability}>{home.availability}</span></div>
    <div className={styles.heroComposition}>
      <div className={styles.heroFirstRow}>
      <h1 id="home-title" className={styles.heroTitle} data-sanity={dataAttribute({id: 'homepage', type: 'homepage', path: 'heroTitle'})} aria-label={stegaClean(home.heroTitle) ?? undefined}><span className={styles.heroLine}><span className={styles.rise}>{first}</span></span>{rest.length > 0 && <span className={styles.heroAccessibleSuffix}> {rest.join(' ')}</span>}</h1>
      {image && <figure className={styles.heroImage}><SanityImage eager image={image} alt={alt} editing={{id: 'homepage', type: 'homepage', path: 'heroImage'}} aspectRatio={9 / 4} mobileAspectRatio={4 / 5} sizes="(max-width: 760px) calc(100vw - 112px), 32vw" /></figure>}
      </div>
      <div className={styles.heroSecondRow}>
      <div className={styles.heroIntro}>{home.heroIntro && <p className={home.mobileHeroIntro?styles.desktopCopy:undefined}>{home.heroIntro}</p>}{home.mobileHeroIntro&&<p className={styles.mobileCopy}>{home.mobileHeroIntro}</p>}<span className={styles.heroLocation}><span className={styles.desktopCopy}>(Scroll) Selected work</span><span className={styles.mobileCopy}>{home.location}</span></span></div>
      {rest.length > 0 && <p className={styles.heroSecondTitle} aria-hidden="true"><span className={styles.heroLine}><span className={styles.rise}>{rest.join(' ')}</span></span></p>}
      </div>
    </div>
  </section>
}
