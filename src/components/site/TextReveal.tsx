'use client'

import {useEffect, useRef, type ReactNode} from 'react'
import styles from './TextReveal.module.scss'

export default function TextReveal({children, className, as: Tag = 'div'}: {children: ReactNode; className?: string; as?: 'div' | 'h1' | 'p'}) {
  const ref = useRef<HTMLElement | null>(null)
  const setRef = (element: HTMLElement | null) => {ref.current = element}

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    const complete = () => {element.dataset.textReveal = 'complete'; observer?.disconnect()}
    const observer: IntersectionObserver | null = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      if (preference.matches) complete()
      else {element.dataset.textReveal = 'revealed'; observer?.disconnect()}
    }, {rootMargin: '0px 0px -24px 0px', threshold: .01}) : null

    const sequenceLines = () => {
      if (element.dataset.textReveal !== 'pending') return
      const tops: number[] = []
      for (const word of element.querySelectorAll<HTMLElement>('[data-reveal-word]')) {
        const mask = word.parentElement
        if (!mask?.getClientRects().length) continue
        const top = mask.getBoundingClientRect().top
        let line = tops.findIndex(value => Math.abs(value - top) < 2)
        if (line < 0) {line = tops.length; tops.push(top)}
        word.style.setProperty('--text-reveal-delay', `${line * .08}s`)
      }
    }
    const updatePreference = () => {if (preference.matches) complete()}
    const revealForFocus = () => complete()
    preference.addEventListener('change', updatePreference)
    element.addEventListener('focusin', revealForFocus)
    const resize = new ResizeObserver(sequenceLines)
    resize.observe(element)

    if (preference.matches || !observer) complete()
    else void document.fonts.ready.then(() => {
      if (disposed || element.dataset.textReveal !== 'pending') return
      sequenceLines()
      observer.observe(element)
    })

    return () => {
      disposed = true
      observer?.disconnect()
      resize.disconnect()
      preference.removeEventListener('change', updatePreference)
      element.removeEventListener('focusin', revealForFocus)
    }
  }, [])

  return <Tag ref={setRef} className={`${styles.reveal} ${className ?? ''}`} data-text-reveal="pending">{children}</Tag>
}
