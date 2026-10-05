import {blockLabel, concise, portableTextPreview} from '../../components/keyedOptions'
import {record} from './validation'
import type {PreviewValue} from 'sanity'

const count = (value: unknown) => Array.isArray(value) ? value.length : 0
const join = (parts: unknown[]) => parts.filter(value => typeof value === 'string' && value.trim()).join(' · ')

export function blockPreview(type: string, value: Record<string, unknown>): PreviewValue {
  const label = blockLabel({_type: type, ...value})
  let title = label.title, subtitle = label.subtitle
  switch (type) {
    case 'textBlock': {
      const paragraphs = Array.isArray(value.body) ? value.body.filter(block => record(block)._type === 'block').length : 0
      subtitle = `Text block · ${paragraphs} ${paragraphs === 1 ? 'paragraph' : 'paragraphs'}`
      break
    }
    case 'imageWithText': title = concise(join([value.label, portableTextPreview(value.body, true) || portableTextPreview(value.body)]), 'Image + text'); break
    case 'gallery': {
      title = 'Gallery'
      const total = count(value.images)
      const mobile = Array.isArray(value.mobileImageKeys) ? value.mobileImageKeys.length
        : Array.isArray(value.images) ? value.images.filter(image => record(image).visibility !== 'desktop').length : 0
      subtitle = `${total} images · Mobile: ${mobile}`
      break
    }
    case 'quoteBlock': title = concise(value.quote ? `“${value.quote}”` : '', 'Quote'); subtitle = concise(join([value.author, value.role]), 'Quote'); break
    case 'creditsBlock': subtitle = `${count(value.items)} ${count(value.items) === 1 ? 'entry' : 'entries'}`; break
    case 'videoBlock': title = concise(join([value.title, value.duration]), 'Video'); subtitle = value.sourceType === 'unresolved' ? 'Poster only — source pending' : value.sourceType === 'url' ? 'Video · Website link' : 'Video · Uploaded file'; break
  }
  if (value.visibility === 'desktop') subtitle += ' · Desktop only'
  if (value.visibility === 'mobile') subtitle += ' · Mobile only'
  return {title, subtitle, media: value.media as PreviewValue['media']}
}

export function projectPreview({title, rank, sector, year, media}: Record<string, unknown>): PreviewValue {
  return {title: concise(title, 'Untitled project'), subtitle: [typeof rank === 'number' ? String(rank).padStart(2, '0') : undefined, sector, year].filter(value => value !== undefined && value !== '').join(' · '), media: media as PreviewValue['media']}
}
