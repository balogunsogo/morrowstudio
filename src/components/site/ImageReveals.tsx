'use client'

import {useEffect} from 'react'

const selector = 'img[data-image-reveal]'

export default function ImageReveals() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = new Map<Element, Set<HTMLImageElement>>()
    const images = new Map<HTMLImageElement, Element>()
    let disposed = false

    const complete = (image: HTMLImageElement) => {image.dataset.imageReveal = 'complete'}
    const reveal = (image: HTMLImageElement) => {
      const ready = () => {
        if (disposed || !image.isConnected || image.dataset.imageReveal !== 'pending') return
        if (preference.matches) complete(image)
        else image.dataset.imageReveal = 'revealed'
      }
      if (image.complete && image.naturalWidth > 0) ready()
      else {
        image.loading = 'eager'
        void image.decode().then(ready, ready)
      }
    }

    const observer: IntersectionObserver | null = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const group = targets.get(entry.target)
        if (!group) continue
        observer?.unobserve(entry.target)
        targets.delete(entry.target)
        for (const image of group) {images.delete(image); reveal(image)}
      }
    }, {rootMargin: '0px 0px -24px 0px', threshold: .01}) : null

    function find(root: Element) {
      const descendants = [...root.querySelectorAll<HTMLImageElement>(selector)]
      return root instanceof HTMLImageElement && root.matches(selector) ? [root, ...descendants] : descendants
    }

    function register(root: Element) {
      for (const image of find(root)) {
        if (image.dataset.imageReveal !== 'pending' || images.has(image)) continue
        if (preference.matches || !observer) {complete(image); continue}
        // Observe the unmasked container so the image's own clip cannot hide it from detection.
        const target = image.parentElement ?? image
        const group = targets.get(target) ?? new Set<HTMLImageElement>()
        group.add(image)
        targets.set(target, group)
        images.set(image, target)
        observer.observe(target)
      }
    }

    function unregister(root: Element) {
      for (const image of find(root)) {
        const target = images.get(image)
        if (!target) continue
        images.delete(image)
        const group = targets.get(target)
        group?.delete(image)
        if (!group?.size) {observer?.unobserve(target); targets.delete(target)}
      }
    }

    const updatePreference = () => {
      if (!preference.matches) {register(document.body); return}
      observer?.disconnect()
      targets.clear()
      images.clear()
      document.querySelectorAll<HTMLImageElement>(selector).forEach(complete)
    }
    const finishAnimation = (event: AnimationEvent) => {
      if (event.animationName === 'morrow-image-reveal' && event.target instanceof HTMLImageElement) complete(event.target)
    }
    const mutations = new MutationObserver(records => {
      for (const record of records) for (const node of record.removedNodes) if (node instanceof Element) unregister(node)
      for (const record of records) for (const node of record.addedNodes) if (node instanceof Element) register(node)
    })
    mutations.observe(document.body, {childList: true, subtree: true})
    preference.addEventListener('change', updatePreference)
    document.addEventListener('animationend', finishAnimation, true)
    register(document.body)

    return () => {
      disposed = true
      observer?.disconnect()
      mutations.disconnect()
      preference.removeEventListener('change', updatePreference)
      document.removeEventListener('animationend', finishAnimation, true)
    }
  }, [])

  return null
}
