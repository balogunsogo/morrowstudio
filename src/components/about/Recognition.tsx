import type {About} from './types'
import styles from './About.module.scss'

export default function Recognition({items}: {items: About['recognition']}) {
  if (!items?.length) return null
  return <section className={styles.recognition} aria-labelledby="recognition-heading">
    <h2 id="recognition-heading" className={styles.label}>Recognition</h2>
    <table className={styles.recognitionTable}>
      <thead><tr><th scope="col">Year</th><th scope="col">Award</th><th scope="col">Project</th></tr></thead>
      <tbody>{items.map(item => <tr key={item._key}><td>{item.year ?? '—'}</td><td>{item.title}</td><td>{item.project}</td></tr>)}</tbody>
    </table>
  </section>
}
