'use client'

import Link from '../site/IntentLink'
import {stegaClean} from 'next-sanity'
import {usePathname} from 'next/navigation'
import {useEffect, useId, useRef, useState, type ReactNode} from 'react'
import menu from '../site/MobileMenu.module.scss'
import styles from './Home.module.scss'
import useNavigationSurface from '../site/useNavigationSurface'

const contactHref = 'mailto:hello@morrow.studio'

export default function SiteNavigation({title, eyebrow, location, count, menuDetails}: {title?: string | null; eyebrow?: string | null; location?: string | null; count?: number; menuDetails?: ReactNode}) {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  useNavigationSurface(header, pathname)
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const menuHeader = useRef<HTMLDivElement>(null)
  const id = useId()
  useEffect(() => {
    if (!open || !dialog.current) return
    const modal = dialog.current
    const trigger = button.current
    const body = document.body
    const scrollY = window.scrollY
    const previous = {overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width}
    Object.assign(body.style, {overflow: 'hidden', position: 'fixed', top: `-${scrollY}px`, width: '100%'})
    if (!modal.open) modal.showModal()
    menuHeader.current?.focus({preventScroll: true})
    const mobile = window.matchMedia('(max-width: 760px)')
    const resize = () => {if (!mobile.matches) setOpen(false)}
    mobile.addEventListener('change', resize)
    return () => {
      mobile.removeEventListener('change', resize)
      modal.close()
      Object.assign(body.style, previous)
      window.scrollTo({top: scrollY, behavior: 'instant'})
      if (trigger?.isConnected && mobile.matches) trigger.focus({preventScroll: true})
      else if (trigger?.isConnected) modal.parentElement?.querySelector<HTMLAnchorElement>('nav[aria-label="Main navigation"] a')?.focus({preventScroll: true})
    }
  }, [open])
  return <header ref={header} className={styles.navigation} data-site-navigation>
    <Link href="/" className={styles.brand} aria-label={stegaClean(title) || 'Home'} aria-current={pathname === '/' ? 'page' : undefined}>{title || 'Home'}</Link>
    <span className={styles.navEyebrow}>{eyebrow}</span><span className={styles.navLocation}>{location}</span>
    <button ref={button} className={styles.menuButton} aria-expanded={open} aria-controls={id} aria-haspopup="dialog" onClick={() => setOpen(true)}>Menu +</button>
    <nav className={styles.navLinks} aria-label="Main navigation">
      <Link href="/work" aria-current={pathname?.startsWith('/work') ? 'page' : undefined} onClick={() => setOpen(false)}>Work {count !== undefined && <sup>{String(count).padStart(2, '0')}</sup>}</Link>
      <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} onClick={() => setOpen(false)}>About</Link>
      <Link href={contactHref} onClick={() => setOpen(false)}>Contact</Link>
    </nav>
    <dialog ref={dialog} id={id} className={menu.menu} aria-label="Site menu" onCancel={event => {event.preventDefault(); setOpen(false)}} onClose={event => {if (!event.currentTarget.open) setOpen(false)}} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const modal = event.currentTarget
      const targets = [...modal.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), [tabindex="0"]')].filter(element => element.getClientRects().length)
      const first = targets[0], last = targets.at(-1)
      if (!first || !last) return
      if (document.activeElement === menuHeader.current) {event.preventDefault(); (event.shiftKey ? last : first).focus(); return}
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus()}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus()}
    }} onClick={event => {if ((event.target as Element).closest('a')) setOpen(false)}}>
      <div ref={menuHeader} className={menu.header} tabIndex={-1}>
        <Link href="/" className={menu.brand}>{title || 'Home'}</Link>
        <button className={menu.close} onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button>
      </div>
      <nav className={menu.links} aria-label="Primary">
        <ol>{[{href: '/', label: 'Index'}, {href: '/work', label: 'Work'}, {href: '/about', label: 'About'}, {href: contactHref, label: 'Contact'}].map(link => <li key={link.href}>
          <Link href={link.href} aria-current={(link.href === '/work' ? pathname.startsWith('/work') : pathname === link.href) ? 'page' : undefined}>
            <span className={menu.label}>{link.label}{link.href === '/work' && count !== undefined && <sup>{String(count).padStart(2, '0')}</sup>}</span>
          </Link>
        </li>)}</ol>
      </nav>
      {menuDetails}
    </dialog>
  </header>
}
