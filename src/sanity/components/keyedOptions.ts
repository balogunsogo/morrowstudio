import type {Path} from 'sanity'

export type SelectionKind = 'section' | 'image' | 'credit'
export type KeyedOption = {key: string; title: string; subtitle: string; unavailable?: string}
const object = (value: unknown): Record<string, unknown> => value !== null && typeof value === 'object' ? value as Record<string, unknown> : {}
const words = (value: unknown) => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''

export function concise(value: unknown, fallback: string, limit = 70): string {
  const characters = Array.from(words(value) || fallback)
  return characters.length > limit ? characters.slice(0, limit - 1).join('').trimEnd() + '…' : characters.join('')
}

export function portableTextPreview(value: unknown, headingOnly = false): string {
  if (!Array.isArray(value)) return ''
  const previews = value.filter(item => !headingOnly || /^h[1-6]$/.test(words(object(item).style)))
    .map(item => {
      const children = object(item).children
      return Array.isArray(children) ? children.map(child => typeof object(child).text === 'string' ? object(child).text : '').join('') : ''
    }).map(words).filter(Boolean)
  return headingOnly ? previews[0] ?? '' : previews.join(' ')
}

const blockTypes: Record<string, string> = {
  textBlock: 'Text block', fullWidthImage: 'Full width image', containedImage: 'Contained image',
  imagePair: 'Image pair', largeStatement: 'Statement', imageWithText: 'Image + text',
  gallery: 'Gallery', quoteBlock: 'Quote', creditsBlock: 'Credits', videoBlock: 'Video',
}

export function blockLabel(value: unknown): Pick<KeyedOption, 'title' | 'subtitle'> {
  const block = object(value), type = words(block._type), subtitle = blockTypes[type] || 'Content block'
  let label: string
  switch (type) {
    case 'textBlock': label = words(block.label); break
    case 'fullWidthImage': case 'containedImage': label = words(block.caption); break
    case 'imagePair': label = words(block.sharedCaption) || [object(block.left).caption, object(block.right).caption].map(words).filter(Boolean).join(' + '); break
    case 'largeStatement': label = portableTextPreview(block.body) || words(block.text); break
    case 'imageWithText': label = words(block.label) || portableTextPreview(block.body, true); break
    case 'gallery': label = `Gallery · ${Array.isArray(block.images) ? block.images.length : 0} images`; break
    case 'quoteBlock': label = words(block.quote); break
    case 'creditsBlock': label = words(block.title); break
    case 'videoBlock': label = words(block.title); break
    default: label = words(block.label) || words(block.title)
  }
  return {title: concise(label, subtitle), subtitle}
}

export function canonicalOptions(value: unknown, kind: SelectionKind): KeyedOption[] {
  if (!Array.isArray(value)) return []
  const counts = new Map<string, number>()
  for (const item of value) {
    const key = object(item)._key
    if (typeof key === 'string' && key) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const seen = new Set<string>()
  return value.flatMap((item, index) => {
    const row = object(item), key = typeof row._key === 'string' ? row._key : ''
    if (!key || seen.has(key)) return []
    seen.add(key)
    const labels = kind === 'section' ? blockLabel(row) : kind === 'image'
      ? {title: concise(words(row.caption) || words(row.alt), `Image ${String(index + 1).padStart(2, '0')}`), subtitle: 'Image'}
      : {title: concise([words(row.role), words(row.name)].filter(Boolean).join(' — '), `Credit ${String(index + 1).padStart(2, '0')}`), subtitle: 'Credit'}
    const unavailable = counts.get(key)! > 1 ? 'Duplicate item identifier. Ask the website team to repair these items.'
      : kind !== 'credit' && row.visibility === 'desktop' ? 'Desktop only; unavailable for mobile selection.' : undefined
    return [{key, ...labels, unavailable}]
  })
}

export function resolveKey(key: string | undefined, options: KeyedOption[], kind: SelectionKind): KeyedOption {
  const known = options.find(option => option.key === key)
  if (known) return known
  return {key: key ?? '', title: key ? `Unknown ${kind} · ${key}` : `Choose a ${kind}`,
    subtitle: key ? 'The original item is missing. This selection has been kept.' : 'No item selected',
    unavailable: key ? 'Choose a replacement or explicitly remove this item.' : undefined}
}

export function availableOptions(options: KeyedOption[], selected: readonly string[] = [], current?: string): KeyedOption[] {
  return options.filter(option => !option.unavailable && (!selected.includes(option.key) || option.key === current))
}

export function siblingCollectionPath(path: Path, collection: string): Path {
  return [...path.slice(0, -1), collection]
}

export function creditOverrideCollectionPath(path: Path): Path {
  const index = path.lastIndexOf('mobileOverrides')
  return index < 0 ? [] : [...path.slice(0, index), 'items']
}
