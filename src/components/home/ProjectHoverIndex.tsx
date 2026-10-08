'use client'

import {useState, type ReactNode} from 'react'
import styles from './Home.module.scss'

export default function ProjectHoverIndex({items,mobileItems}: {items: {id: string; row: ReactNode; preview: ReactNode}[];mobileItems?:{id:string;row:ReactNode}[]}) {
  const [activeId, setActiveId] = useState<string>()
  const active = items.find(item => item.id === activeId) ?? items[0]
  const mobile = mobileItems ?? items
  if (!active && !mobile.length) return null
  return <div className={styles.indexComposition}>
    <ol className={`${styles.indexList} ${styles.indexDesktopList}`} data-index-viewport="desktop">{items.map(item => <li key={item.id} data-active={item.id === active?.id} onMouseEnter={() => {if (matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches) setActiveId(item.id)}} onFocus={() => setActiveId(item.id)}>{item.row}</li>)}</ol>
    <ol className={`${styles.indexList} ${styles.indexMobileList}`} data-index-viewport="mobile">{mobile.map(item => <li key={item.id}>{item.row}</li>)}</ol>
    {active && <div className={styles.indexPreview} data-project-id={active.id}>{active.preview}</div>}
  </div>
}
