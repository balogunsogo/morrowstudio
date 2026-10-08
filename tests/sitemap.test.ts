import assert from 'node:assert/strict'
import {test, mock} from 'node:test'

test('sitemap reads newly published slugs on successive requests without a rebuild', async () => {
  process.env.SITE_URL = 'https://morrowstudio.balogunoluwasogo.com'
  const {default: sitemap, dynamic} = await import('@/app/sitemap')
  const {client} = await import('@/sanity/lib/client')
  const first = [{slug: 'aster-house', updated: '2026-10-05T01:35:49Z'}]
  const next = [...first, {slug: 'newly-published', updated: '2026-10-08T14:00:00Z'}]
  const calls: unknown[][] = []
  const fetch = mock.method(client, 'fetch', async (...args: unknown[]) => {
    calls.push(args)
    return calls.length === 1 ? first : next
  })
  try {
    assert.equal(dynamic, 'force-dynamic')
    const before = await sitemap(), after = await sitemap()
    assert.deepEqual(before.map(entry => entry.url), ['https://morrowstudio.balogunoluwasogo.com/', 'https://morrowstudio.balogunoluwasogo.com/work', 'https://morrowstudio.balogunoluwasogo.com/about', 'https://morrowstudio.balogunoluwasogo.com/work/aster-house'])
    assert.equal(after.at(-1)?.url, 'https://morrowstudio.balogunoluwasogo.com/work/newly-published')
    assert.equal(after.at(-1)?.lastModified, next[1].updated)
    assert.equal(calls.length, 2)
    for (const call of calls) assert.deepEqual(call[2], {perspective: 'published', stega: false, cache: 'no-store'})
  } finally { fetch.mock.restore() }
})
