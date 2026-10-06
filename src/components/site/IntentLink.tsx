'use client'

import Link from 'next/link'
import {useState, type ComponentProps} from 'react'

// Keep client navigation, but fetch another route only after hover, focus or touch.
export default function IntentLink({onMouseEnter, onFocus, onTouchStart, ...props}: Omit<ComponentProps<typeof Link>, 'prefetch'>) {
  const [active, setActive] = useState(false)
  return <Link {...props} prefetch={active ? null : false}
    onMouseEnter={event => {setActive(true); onMouseEnter?.(event)}}
    onFocus={event => {setActive(true); onFocus?.(event)}}
    onTouchStart={event => {setActive(true); onTouchStart?.(event)}}
  />
}
