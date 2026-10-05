'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'

export default function PreviewRefresh() {
  const router = useRouter()
  useEffect(() => {
    let previous: string | undefined
    let pending = false
    const controller = new AbortController()
    async function check() {
      if (pending || document.hidden) return
      pending = true
      try {
        const response = await fetch('/api/draft-mode/revision', {cache: 'no-store', signal: controller.signal})
        if (!response.ok) return
        const {revision} = await response.json() as {revision: string}
        if (previous && previous !== revision) router.refresh()
        previous = revision
      } catch {
        // A later poll retries transient failures; exiting preview aborts work.
      } finally {
        pending = false
      }
    }
    void check()
    const interval = window.setInterval(check, 3000)
    document.addEventListener('visibilitychange', check)
    return () => {
      controller.abort()
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', check)
    }
  }, [router])
  return null
}
