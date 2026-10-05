'use client'

import {useState, type ReactNode} from 'react'
import styles from './Home.module.scss'

export default function ProjectHoverIndex({items,mobileIds}: {items: {id: string; row: ReactNode; preview: ReactNode}[];mobileIds?:string[]}) {
  const [activeId, setActiveId] = useState<string>()
  const active = items.find(item => item.id === activeId) ?? items[0]
  if (!active) return null
  return <div className={styles.indexComposition}>
    <ol className={styles.indexList}>{items.map(item => <li key={item.id} data-mobile-visible={mobileIds?.includes(item.id)} data-active={item.id === active.id} onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)}>{item.row}</li>)}</ol>
    <div className={styles.indexPreview} data-project-id={active.id}>{active.preview}</div>
  </div>
}
