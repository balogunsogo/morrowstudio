'use client'

import {useEffect, useRef} from 'react'
import {stegaClean} from 'next-sanity'
import styles from './SiteFooter.module.scss'

function inkTop(element: HTMLElement, context: CanvasRenderingContext2D) {
  const font = getComputedStyle(element)
  const value = stegaClean(element.textContent ?? '')
  const text = font.textTransform === 'uppercase' ? value.toUpperCase() : value
  context.font = `${font.fontStyle} ${font.fontWeight} ${font.fontSize} ${font.fontFamily}`
  const bounds = context.measureText(text)
  const baseline = (parseFloat(font.lineHeight) + bounds.fontBoundingBoxAscent - bounds.fontBoundingBoxDescent) / 2
  return baseline - bounds.actualBoundingBoxAscent
}

export default function FooterWordmark({brand}: {brand?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const label = brand?.trim() ?? ''

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const context = document.createElement('canvas').getContext('2d')
    if (!context) return
    let disposed = false
    let fontsReady = false
    let lastWidth = -1

    const fit = () => {
      if (disposed || !fontsReady) return
      const frame = getComputedStyle(element)
      const available = element.clientWidth - parseFloat(frame.paddingLeft) - parseFloat(frame.paddingRight)
      if (available <= 0) return
      for (const word of element.querySelectorAll<HTMLElement>('span')) {
        const text = word.textContent ?? ''
        if (!text) continue
        const font = getComputedStyle(word)
        const currentSize = parseFloat(font.fontSize)
        const tracking = (parseFloat(font.letterSpacing) || 0) / currentSize
        context.font = `${font.fontStyle} ${font.fontWeight} 100px ${font.fontFamily}`
        const bounds = context.measureText(text)
        const inkWidth = bounds.actualBoundingBoxLeft + bounds.actualBoundingBoxRight + tracking * 100 * (Array.from(text).length - 1)
        if (inkWidth <= 0) continue
        const size = available * 100 / inkWidth
        word.style.fontSize = `${size}px`
        // Account for the leading glyph's side bearing, aligning the visible M.
        word.style.marginInlineStart = `${bounds.actualBoundingBoxLeft * size / 100}px`
      }

      const footer = element.closest('footer')
      const email = footer?.querySelector<HTMLAnchorElement>(`.${styles.footerEmail}`)
      const heading = footer?.querySelector<HTMLHeadingElement>('h2')
      if (!email || !heading) return
      if (matchMedia('(max-width: 760px)').matches) {
        email.style.removeProperty('--footer-email-offset')
        return
      }
      // Align the actual glyph tops, compensating for each font's line-box metrics.
      const previous = parseFloat(email.style.getPropertyValue('--footer-email-offset')) || 0
      const offset = heading.getBoundingClientRect().top + inkTop(heading, context)
        - (email.getBoundingClientRect().top - previous + inkTop(email, context))
      if (Number.isFinite(offset)) email.style.setProperty('--footer-email-offset', `${offset}px`)
    }

    const resize = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? 0
      if (Math.abs(width - lastWidth) < .5) return
      lastWidth = width
      fit()
    })
    resize.observe(element)
    const refreshFont = () => fit()
    document.fonts.addEventListener('loadingdone', refreshFont)
    void document.fonts.ready.then(() => {fontsReady = true; fit()})

    return () => {
      disposed = true
      resize.disconnect()
      document.fonts.removeEventListener('loadingdone', refreshFont)
    }
  }, [label])

  return <div ref={ref} className={styles.footerWordmark} aria-hidden="true">
    <span className={styles.desktopWordmark}>{label}</span>
    <span className={styles.mobileWordmark}>{label.split(/\s+/)[0]}</span>
  </div>
}
