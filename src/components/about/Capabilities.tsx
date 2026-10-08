import styles from './About.module.scss'
import type {About} from './types'

export default function Capabilities({items,details}: {items?: string[] | null;details?:About['capabilityItems']}) {
  const entries = details?.length ? details : (items ?? []).map((title, index) => ({_key: `${index}-${title}`, title, description: undefined, mobileDescription: undefined}))
  if (!entries.length) return null
  return <section className={styles.capabilities} aria-labelledby="capabilities-heading">
    <div className={styles.sectionHeading}><h2 id="capabilities-heading" className={styles.label}>Capabilities</h2></div>
    <ol className={styles.capabilityList}>{entries.map((item, index) => <li key={item._key}><span className={styles.itemNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className={styles.capabilityName}>{item.title}</span>{(item.description || item.mobileDescription) && <div className={styles.capabilityDescription}><p className={styles.desktopCopy}>{item.description}</p><p className={styles.mobileCopy}>{item.mobileDescription??item.description}</p></div>}</li>)}</ol>
  </section>
}
