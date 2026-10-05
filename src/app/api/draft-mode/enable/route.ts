import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {client} from '@/sanity/lib/client'
import {readToken} from '@/sanity/lib/token'

const {GET: enableDraftMode} = defineEnableDraftMode({
  client: client.withConfig({token: readToken, useCdn: false, stega: false}),
})

export async function GET(request: Request) {
  if (!readToken) {
    return new Response('Draft Mode requires SANITY_API_READ_TOKEN on the server.', {
      status: 503,
      headers: {'Cache-Control': 'no-store'},
    })
  }
  if (!new URL(request.url).searchParams.get('sanity-preview-secret')?.trim()) {
    // Avoid the SDK's development diagnostic logging its configured client.
    return new Response('Invalid secret', {status: 401, headers: {'Cache-Control': 'no-store'}})
  }
  // Sanity verifies the Presentation secret before setting any preview cookies.
  return enableDraftMode(request)
}
