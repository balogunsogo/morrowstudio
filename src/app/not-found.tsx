import Link from 'next/link'

export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="site-recovery">
    <h1>Page not found</h1>
    <p>This page is unavailable.</p>
    <Link href="/">Morrow Studio</Link>
    <Link href="/work">All work</Link>
  </main>
}
