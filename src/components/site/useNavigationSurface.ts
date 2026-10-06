'use client'

import {useEffect, type RefObject} from 'react'

export default function useNavigationSurface(ref: RefObject<HTMLElement | null>, pathname: string) {
  useEffect(() => {
    const header = ref.current
    if (!header || !('IntersectionObserver' in window)) return
    let observer: IntersectionObserver | undefined
    const targets = new Set<Element>()
    const overlapping = new Set<Element>()
    let frame = 0

    const register = () => {
      // Read geometry only when the viewport/header changes, never on each scroll.
      const height = Math.ceil(header.getBoundingClientRect().height)
      observer?.disconnect()
      targets.clear()
      overlapping.clear()
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRect.height > 0) overlapping.add(entry.target)
          else overlapping.delete(entry.target)
        }
        header.dataset.overMedia = String(overlapping.size > 0)
      }, {rootMargin: `0px 0px -${Math.max(0, innerHeight - height)}px 0px`, threshold: 0})

      for (const image of document.querySelectorAll('main img[data-image-reveal]')) {
        const target = image.closest('figure') ?? image.parentElement ?? image
        if (!targets.has(target)) {targets.add(target); observer.observe(target)}
      }
      for (const footer of document.querySelectorAll('footer')) {targets.add(footer); observer.observe(footer)}
    }

    const resize = new ResizeObserver(register)
    resize.observe(header)
    window.addEventListener('resize', register)
    const mutations = new MutationObserver(records => {
      const changed = records.some(record => [...record.addedNodes, ...record.removedNodes].some(node =>
        node instanceof Element && (node.matches('main, img, figure, footer') || node.querySelector('main img, footer')),
      ))
      if (!changed || frame) return
      frame = requestAnimationFrame(() => {frame = 0; register()})
    })
    mutations.observe(document.body, {childList: true, subtree: true})
    register()

    return () => {
      observer?.disconnect()
      resize.disconnect()
      mutations.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', register)
    }
  }, [ref, pathname])
}
