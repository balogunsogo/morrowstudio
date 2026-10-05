import styles from './About.module.scss'

export default function Clients({items}: {items?: string[] | null}) {
  if (!items?.length) return null
  return <section className={styles.clients} aria-labelledby="clients-heading"><h2 id="clients-heading" className={styles.label}>Selected clients</h2><ul className={styles.clientList}>{items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>
}
