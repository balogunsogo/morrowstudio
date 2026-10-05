import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'

export async function GET() {
  ;(await draftMode()).disable()
  // A fixed local destination prevents redirects to user-supplied external URLs.
  redirect('/')
}
