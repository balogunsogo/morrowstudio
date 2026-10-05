import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import type {FeaturedItem} from './types'
import FeaturedProject from './FeaturedProject'
import styles from './Home.module.scss'

export default function FeaturedProjects({items, count, heading}: {items: FeaturedItem[]; count: number; heading?: string | null}) {
  items = items.map(item => ({...item, layout: stegaClean(item.layout)}))
  const groups: FeaturedItem[][] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const next = items[i + 1]
    if (next && ((item.layout === 'pair' && next.layout === 'pair') || (item.layout === 'small' && next.layout === 'large') || (item.layout === 'large' && i > 0 && next.layout === 'small'))) {
      groups.push([item, next]); i++
    } else groups.push([item])
  }
  return <section className={styles.featured} aria-labelledby="featured-heading">
    <div className={styles.sectionHeader}><h2 id="featured-heading">{heading} ({String(count).padStart(2, '0')})</h2><Link href="/work">Full archive ↗</Link></div>
    {groups.map((group, index) => <div key={group[0]._key} className={styles.featuredGroup} data-composition={group.length > 1 ? group[0].layout === 'pair' ? 'pair' : 'mixed' : group[0].layout ?? 'large'}>
      {group.map(item => <FeaturedProject key={item._key} item={item} lead={index === 0 && group.length === 1 && item.layout === 'large'} />)}
    </div>)}
  </section>
}
