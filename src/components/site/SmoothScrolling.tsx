'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'

// Increase for more glide; decrease for a quicker, more native response.
export const SMOOTH_SCROLL_DURATION_MS = 640

function hasNativeScrollArea(target: EventTarget | null) {
  let element = target instanceof Element ? target : null
  if (element?.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return true
  while (element && element !== document.body && element !== document.documentElement) {
    const style = getComputedStyle(element)
    if (/auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1) return true
    if (/auto|scroll/.test(style.overflowX) && element.scrollWidth > element.clientWidth + 1) return true
    element = element.parentElement
  }
  return false
}

export default function SmoothScrolling() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/studio')) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let target = window.scrollY
    let start = target
    let startedAt = 0
    let applied = target

    const maximum = () => Math.max(0, (document.scrollingElement?.scrollHeight ?? document.documentElement.scrollHeight) - innerHeight)
    const clamp = (value: number) => Math.max(0, Math.min(maximum(), value))
    const locked = () => document.body.style.position === 'fixed'
      || /hidden|clip/.test(getComputedStyle(document.body).overflowY)
      || /hidden|clip/.test(getComputedStyle(document.documentElement).overflowY)
      || Boolean(document.querySelector('dialog[open]'))
    const cancel = () => {
      cancelAnimationFrame(frame)
      frame = 0
      target = window.scrollY
      applied = target
    }
    const step = (now: number) => {
      if (preference.matches || locked()) {cancel(); return}
      target = clamp(target)
      const progress = Math.min(1, (now - startedAt) / SMOOTH_SCROLL_DURATION_MS)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = progress === 1 ? target : start + (target - start) * eased
      window.scrollTo({top: next, behavior: 'instant'})
      applied = window.scrollY
      if (progress < 1) frame = requestAnimationFrame(step)
      else {frame = 0; target = applied}
    }
    const wheel = (event: WheelEvent) => {
      // Pixel streams already carry native precision/momentum. Re-easing each
      // event fights trackpad inertia, especially when a gesture changes axis.
      // deltaMode describes units, not hardware: pixel-mode mice stay native too.
      if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
        cancel()
        return
      }
      if (event.defaultPrevented || !event.cancelable || preference.matches || locked()
        || event.ctrlKey || event.metaKey || event.shiftKey || !event.deltaY
        || Math.abs(event.deltaX) > Math.abs(event.deltaY) || hasNativeScrollArea(event.target)) {
        cancel()
        return
      }
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? innerHeight
        : event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1
      const destination = clamp((frame ? target : window.scrollY) + event.deltaY * unit)
      if (!frame && Math.abs(destination - window.scrollY) < .5) return
      event.preventDefault()
      cancelAnimationFrame(frame)
      start = window.scrollY
      target = destination
      startedAt = performance.now()
      frame = requestAnimationFrame(step)
    }
    // Yield to native/programmatic scrolling, focus changes and direct input.
    const synchronize = () => {if (frame && Math.abs(window.scrollY - applied) > 1) cancel()}
    document.addEventListener('wheel', wheel, {passive: false})
    document.addEventListener('pointerdown', cancel, {passive: true})
    document.addEventListener('touchstart', cancel, {passive: true})
    document.addEventListener('keydown', cancel, true)
    document.addEventListener('visibilitychange', cancel)
    window.addEventListener('scroll', synchronize, {passive: true})
    window.addEventListener('resize', cancel)
    window.addEventListener('blur', cancel)
    preference.addEventListener('change', cancel)

    return () => {
      cancel()
      document.removeEventListener('wheel', wheel)
      document.removeEventListener('pointerdown', cancel)
      document.removeEventListener('touchstart', cancel)
      document.removeEventListener('keydown', cancel, true)
      document.removeEventListener('visibilitychange', cancel)
      window.removeEventListener('scroll', synchronize)
      window.removeEventListener('resize', cancel)
      window.removeEventListener('blur', cancel)
      preference.removeEventListener('change', cancel)
    }
  }, [pathname])

  return null
}
