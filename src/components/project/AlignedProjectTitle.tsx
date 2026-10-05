'use client'

import {useEffect, useRef} from 'react'
import {stegaClean} from 'next-sanity'

export default function AlignedProjectTitle({title}: {title: string}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const context = document.createElement('canvas').getContext('2d')
    if (!context) return
    let disposed = false
    let fontsReady = false

    const align = () => {
      if (disposed || !fontsReady) return
      const font = getComputedStyle(element)
      const firstLetter = Array.from(stegaClean(title).trimStart())[0]
      if (!firstLetter) return
      context.font = `${font.fontStyle} ${font.fontWeight} ${font.fontSize} ${font.fontFamily}`
      const offset = context.measureText(firstLetter).actualBoundingBoxLeft
      if (Number.isFinite(offset)) element.style.setProperty('--project-title-offset', `${offset}px`)
    }

    const resize = new ResizeObserver(align)
    resize.observe(element.parentElement ?? element)
    document.fonts.addEventListener('loadingdone', align)
    void document.fonts.ready.then(() => {fontsReady = true; align()})

    return () => {
      disposed = true
      resize.disconnect()
      document.fonts.removeEventListener('loadingdone', align)
    }
  }, [title])

  return <span ref={ref}>{title}</span>
}
