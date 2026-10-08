import {stegaClean} from '@sanity/client/stega'

export const creator = {
  name: 'Oluwasogo Balogun',
  portfolio: 'https://www.balogunoluwasogo.com/',
  email: 'balogunoluwasogo@gmail.com',
  github: 'https://github.com/balogunsogo',
} as const

export function isFictionalEmail(value: string): boolean {
  const domain = stegaClean(value).trim().split('@').at(-1)?.toLowerCase()
  return domain === 'morrow.studio' || !!domain?.endsWith('.morrow.studio')
}

export function contactEmail(value?: string | null): string {
  const email = stegaClean(value ?? '').trim()
  return /^[^\s@<>,:;?&#%]+@[^\s@<>,:;?&#%]+\.[^\s@<>,:;?&#%]+$/.test(email) && !isFictionalEmail(email)
    ? email : creator.email
}

export function socialDestination(value?: string | null): string | undefined {
  try {
    const url = new URL(stegaClean(value ?? '').trim())
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return undefined
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    const platform = ['instagram.com', 'are.na', 'linkedin.com', 'github.com', 'facebook.com', 'x.com', 'twitter.com', 'youtube.com', 'vimeo.com', 'behance.net', 'dribbble.com'].includes(host)
    return platform && url.pathname.replaceAll('/', '') === '' ? undefined : url.href
  } catch { return undefined }
}

type SocialLink = {_key: string; label?: string | null; url?: string | null}
export function creatorLinks(additional?: SocialLink[] | null) {
  const links = [
    {_key: 'creator-portfolio', label: 'Portfolio', url: creator.portfolio},
    {_key: 'creator-email', label: 'Email', url: `mailto:${creator.email}`},
    {_key: 'creator-github', label: 'GitHub', url: creator.github},
  ]
  const seen = new Set(links.map(link => link.url.replace(/\/$/, '')))
  for (const link of additional ?? []) {
    const url = socialDestination(link.url)
    const label = stegaClean(link.label ?? '').trim()
    if (!url || !label || seen.has(url.replace(/\/$/, ''))) continue
    links.push({...link, _key: `cms-${link._key}`, label, url})
    seen.add(url.replace(/\/$/, ''))
  }
  return links
}

export function warnContactEmail(value: unknown): true | string {
  return typeof value === 'string' && value.trim() && (isFictionalEmail(value) || contactEmail(value) !== stegaClean(value).trim())
    ? `This fictional or invalid email action uses the creator contact (${creator.email}) on the website. Update or clear this stored field.` : true
}

export function warnSocialDestination(value: unknown): true | string {
  return typeof value === 'string' && value.trim() && !socialDestination(value)
    ? 'Use an actual account/page, not a platform homepage. This destination is omitted on the website; creator links are managed in the approved creator configuration.' : true
}
