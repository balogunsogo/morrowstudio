import 'server-only'

// Optional so published pages continue to work before preview is configured.
// Server-side only. Browser live updates use the public published dataset.
export const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || undefined
