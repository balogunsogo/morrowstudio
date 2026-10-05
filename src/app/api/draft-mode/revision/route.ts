import {createHash} from 'node:crypto'
import {draftMode} from 'next/headers'
import {client} from '@/sanity/lib/client'
import {readToken} from '@/sanity/lib/token'

// Draft event subscriptions would require putting a token in the browser.
// Poll only a revision fingerprint through an authenticated server session.
export async function GET() {
  const headers = {'Cache-Control': 'private, no-store'}
  if (!(await draftMode()).isEnabled) return Response.json({error: 'Preview required'}, {status: 403, headers})
  if (!readToken) return Response.json({error: 'Preview unavailable'}, {status: 503, headers})
  try {
    const revisions = await client.withConfig({token: readToken, useCdn: false, stega: false}).fetch(
      '*[_type in ["project", "homepage", "about"]] | order(_id asc) {_id, _rev}',
      {}, {perspective: 'raw', cache: 'no-store'},
    )
    const revision = createHash('sha256').update(JSON.stringify(revisions)).digest('hex')
    return Response.json({revision}, {headers})
  } catch {
    return Response.json({error: 'Preview temporarily unavailable'}, {status: 503, headers})
  }
}
