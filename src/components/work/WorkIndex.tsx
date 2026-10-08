'use client'

import {useEffect, useRef, useState, type ReactNode} from 'react'
import {stegaClean} from 'next-sanity'
import styles from './Work.module.scss'

type WorkEntry = {
  id: string
  disciplines: string[]
  row: ReactNode
  preview: ReactNode
  card: ReactNode
}

export default function WorkIndex({entries,intro}: {entries: WorkEntry[];intro?:string}) {
  const [hoveredId, setHoveredId] = useState<string>()
  const [focusedId, setFocusedId] = useState<string>()
  const [discipline, setDiscipline] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'grid'>('list')
  const filters = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const strip = filters.current
    if (!strip) return
    const mobile = matchMedia('(max-width: 760px)')
    let disposed = false
    const updatePeek = () => {
      if (disposed) return
      strip.style.removeProperty('--mobile-filter-gap')
      if (!mobile.matches) return
      const widths = Array.from(strip.children, child => child.getBoundingClientRect().width)
      const total = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * 24
      if (total <= strip.clientWidth) return
      // Keep complete labels readable, then expose 32px of the next filter.
      for (let count = widths.length - 1; count > 0; count--) {
        const complete = widths.slice(0, count).reduce((sum, width) => sum + width, 0)
        const gap = (strip.clientWidth - 32 - complete) / count
        if (gap < 12) continue
        strip.style.setProperty('--mobile-filter-gap', `${gap}px`)
        break
      }
    }
    const resize = new ResizeObserver(updatePeek)
    resize.observe(strip)
    mobile.addEventListener('change', updatePeek)
    document.fonts.addEventListener('loadingdone', updatePeek)
    void document.fonts.ready.then(updatePeek)
    return () => {
      disposed = true
      resize.disconnect()
      mobile.removeEventListener('change', updatePeek)
      document.fonts.removeEventListener('loadingdone', updatePeek)
      strip.style.removeProperty('--mobile-filter-gap')
    }
  }, [entries])
  const options = new Map<string, number>()
  for (const entry of entries) {
    // Filter labels aggregate several fields and are controls, not edit targets.
    // Keep editing metadata on the disciplines rendered in project rows/cards.
    for (const name of new Set(entry.disciplines.map(value => stegaClean(value)))) {
      if (name.trim()) options.set(name, (options.get(name) ?? 0) + 1)
    }
  }
  const visible = discipline === null
    ? entries
    : entries.filter((entry) => entry.disciplines.some(name => stegaClean(name) === discipline))
  const activeId = focusedId ?? hoveredId
  const active = visible.find((entry) => entry.id === activeId) ?? visible[0]

  function selectDiscipline(value: string | null) {
    setDiscipline(value)
    setHoveredId(undefined)
    setFocusedId(undefined)
  }

  return (
    <>
      <header className={styles.heading}><h1><span className={styles.titleRise}>Work<sup>({String(visible.length).padStart(2,'0')})</sup></span></h1>{intro&&<p>{intro}</p>}</header>
      {!!entries.length && <div className={styles.toolbar}>
        <div ref={filters} className={styles.filters} role="group" aria-label="Filter by discipline">
          <button type="button" aria-pressed={discipline === null} onClick={() => selectDiscipline(null)}>
            All <sup>{entries.length}</sup>
          </button>
          {[...options].map(([name, count]) => (
            <button key={name} type="button" aria-pressed={discipline === name} onClick={() => selectDiscipline(name)}>
              {name} <sup>{count}</sup>
            </button>
          ))}
        </div>
        <div className={styles.viewToggle} role="group" aria-label="Archive view">
          <button type="button" aria-pressed={view === 'list'} onClick={() => {setView('list'); setHoveredId(undefined); setFocusedId(undefined)}}>List</button>
          <button type="button" aria-pressed={view === 'grid'} onClick={() => {setView('grid'); setHoveredId(undefined); setFocusedId(undefined)}}>Grid</button>
        </div>
      </div>}
      <p className={styles.resultCount} role="status">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}{discipline !== null ? ` — ${discipline}` : ''}
      </p>
      {!visible.length ? <p className={styles.empty}>{entries.length ? 'No projects in this discipline.' : 'No published projects yet.'}</p> : view === 'grid' ? (
        <section aria-label="Project grid">
          <ol className={styles.grid}>
            {visible.map((entry) => <li key={entry.id}>{entry.card}</li>)}
          </ol>
        </section>
      ) : (
        <section className={styles.index} aria-label="Project index">
          <div className={styles.list}>
            <div className={styles.columns} aria-hidden="true">
              <span>No.</span><span>Project</span><span>Sector</span><span>Discipline</span><span>Year</span>
            </div>
            <ol data-interacting={Boolean(activeId)} onMouseLeave={() => setHoveredId(undefined)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedId(undefined)}}>
              {visible.map((entry) => (
                <li
                  key={entry.id}
                  data-active={entry.id === activeId}
                  onMouseEnter={() => {if (matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches) setHoveredId(entry.id)}}
                  onFocusCapture={() => setFocusedId(entry.id)}
                >
                  {entry.row}
                </li>
              ))}
            </ol>
          </div>
          <aside className={styles.preview} aria-hidden="true" data-preview-id={active?.id}>
            {active?.preview}
          </aside>
        </section>
      )}
    </>
  )
}
