'use client'

import {useIsPresentationTool} from 'next-sanity/hooks'
import styles from './DisableDraftMode.module.scss'

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  if (isPresentationTool) return null
  // A plain anchor avoids Next.js prefetch accidentally clearing preview cookies.
  return <a href="/api/draft-mode/disable" className={styles.control}>Exit preview</a>
}
