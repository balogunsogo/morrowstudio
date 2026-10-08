'use client'

import {useEffect, useState, type ReactNode} from 'react'
import {usePathname} from 'next/navigation'

export default function DeferredLive({children, preview}: {children: ReactNode; preview: boolean}) {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const studio = pathname.startsWith('/studio')

  useEffect(() => {
    if (preview || ready || studio) return
    let disposed = false
    let started = false
    let timer = 0
    let idle = 0
    const start = () => {
      if (disposed || started) return
      started = true
      setReady(true)
    }
    const schedule = () => {
      // Let initial images, fonts and reveals settle before the live client loads.
      timer = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(start, {timeout: 1000})
        else start()
      }, 1500)
    }
    const options = {once: true, passive: true}
    window.addEventListener('pointerdown', start, options)
    window.addEventListener('keydown', start, options)
    window.addEventListener('wheel', start, options)
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, {once: true})

    return () => {
      disposed = true
      clearTimeout(timer)
      if (idle) window.cancelIdleCallback(idle)
      window.removeEventListener('load', schedule)
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
      window.removeEventListener('wheel', start)
    }
  }, [pathname, preview, ready, studio])

  return studio || !(preview || ready) ? null : children
}
