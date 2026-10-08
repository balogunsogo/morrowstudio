import styles from './About.module.scss'

export default function Clients({items, headingId = 'clients-heading'}: {items?: string[] | null; headingId?: string}) {
  if (!items?.length) return null
  return <section className={styles.clients} aria-labelledby={headingId}><h2 id={headingId} className={styles.label}>Selected clients</h2><ul className={styles.clientList}>{items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>
}
