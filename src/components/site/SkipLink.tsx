'use client'

import {usePathname} from 'next/navigation'

export default function SkipLink() {
  const pathname = usePathname()
  return pathname.startsWith('/studio') ? null : <a className="skip-link" href="#main-content">Skip to content</a>
}
