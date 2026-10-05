'use client'

import {useState, type ReactNode} from 'react'
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

  if (!entries.length) return <p className={styles.empty}>No published projects yet.</p>

  return (
    <>
      <header className={styles.heading}><h1><span className={styles.titleRise}>Work<sup>({String(visible.length).padStart(2,'0')})</sup></span></h1>{intro&&<p>{intro}</p>}</header>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter by discipline">
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
      </div>
      <p className={styles.resultCount} role="status">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}{discipline !== null ? ` — ${discipline}` : ''}
      </p>
      {!visible.length ? <p className={styles.empty}>No projects in this discipline.</p> : view === 'grid' ? (
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
                  onMouseEnter={() => setHoveredId(entry.id)}
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
