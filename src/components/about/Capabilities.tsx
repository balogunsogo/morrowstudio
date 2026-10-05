import styles from './About.module.scss'
import type {About} from './types'

export default function Capabilities({items,details}: {items?: string[] | null;details?:About['capabilityItems']}) {
  if (!items?.length) return null
  return <section className={styles.capabilities} aria-labelledby="capabilities-heading">
    <div className={styles.sectionHeading}><h2 id="capabilities-heading" className={styles.label}>Capabilities</h2></div>
    <ol className={styles.capabilityList}>{items.map((item, index) => <li key={`${index}-${item}`}><span className={styles.itemNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className={styles.capabilityName}>{item}</span>{details?.[index]&&<div className={styles.capabilityDescription}><p className={styles.desktopCopy}>{details[index].description}</p><p className={styles.mobileCopy}>{details[index].mobileDescription??details[index].description}</p></div>}</li>)}</ol>
  </section>
}
