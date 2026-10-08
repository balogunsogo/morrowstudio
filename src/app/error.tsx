'use client'

import Link from 'next/link'

export default function ErrorPage({retry}: {error: Error & {digest?: string}; retry: () => void}) {
  return <main id="main-content" tabIndex={-1} className="site-recovery">
    <h1>Page temporarily unavailable</h1>
    <p>Please try again in a moment.</p>
    <button type="button" onClick={() => retry()}>Try again</button>
    <Link href="/">Return to Morrow Studio</Link>
  </main>
}
