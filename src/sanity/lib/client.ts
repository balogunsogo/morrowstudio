import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Next caches and revalidates these reads through the Live Content API.
  stega: {studioUrl: '/studio'},
})
