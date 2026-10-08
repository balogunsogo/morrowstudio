export function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : {}
}

export function hasImage(value: unknown): boolean {
  const reference = record(record(value).asset)._ref
  return typeof reference === 'string' && reference.trim().length > 0
}

export function warnImageAlt(value: unknown, parent: unknown): true | string {
  const image = hasImage(parent) || hasImage(record(parent).image)
  return image && !(typeof value === 'string' && value.trim())
    ? 'Describe this image, or confirm that it is decorative before leaving alternative text empty.' : true
}

export function validateProjectSlug(value: unknown): true | string {
  const slug = record(value).current
  return slug === undefined || (typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    ? true : 'Use lowercase letters, numbers and single hyphens for this page address.'
}

export function validateKeys(items: unknown): true | string {
  if (items === undefined) return true
  if (!Array.isArray(items)) return 'This content list could not be read. Ask the website team to check it.'
  const keys = items.map(item => record(item)._key)
  if (keys.some(key => typeof key !== 'string' || !key.trim())) return 'An item is missing its identifier. Ask the website team to repair it.'
  return new Set(keys).size === keys.length || 'Two items share an identifier. Ask the website team to repair them.'
}

export function validateSelection(value: unknown, items: unknown): true | string {
  if (value === undefined) return true
  if (!Array.isArray(value) || value.some(key => typeof key !== 'string' || !key.trim())) {
    return 'Choose items from the available selections.'
  }
  if (new Set(value).size !== value.length) return 'Each item can only be selected once.'
  const keys = new Set(Array.isArray(items) ? items.map(item => record(item)._key) : [])
  return value.every(key => keys.has(key)) || 'A selected item no longer exists. Choose a replacement or remove that selection.'
}

export function validateMobileOrder(value: unknown, content: unknown): true | string {
  const result = validateSelection(value, content)
  if (result !== true || !Array.isArray(value) || !Array.isArray(content)) return result
  const desktopKeys = new Set(content.filter(item => record(item).visibility === 'desktop').map(item => record(item)._key))
  return value.every(key => !desktopKeys.has(key)) || 'Mobile order cannot include desktop-only sections.'
}

export function validatePair(value: unknown): true | string {
  if (value === undefined) return true
  const pair = record(value)
  return (hasImage(record(pair.left).image) || hasImage(pair.leftImage)) &&
    (hasImage(record(pair.right).image) || hasImage(pair.rightImage))
    ? true : 'Add an image on both the left and the right.'
}

export function validateStatement(value: unknown): true | string {
  const statement = record(value)
  return (Array.isArray(statement.body) && statement.body.length > 0) ||
    (typeof statement.text === 'string' && statement.text.trim().length > 0)
    ? true : 'Add the statement text.'
}

export function validateVideo(value: unknown): true | string {
  if (value === undefined) return true
  const video = record(value)
  const file = typeof record(record(video.videoFile).asset)._ref === 'string'
  const url = typeof video.videoUrl === 'string' && video.videoUrl.trim().length > 0
  if (file && url) return 'Keep one video source: an uploaded video or a website link.'
  if (file && video.sourceType !== 'file') return 'Choose Uploaded video to use the file already added.'
  if (url && video.sourceType !== 'url') return 'Choose Website link to use the URL already added.'
  if (!file && !url && !hasImage(video.poster)) return 'Add a video source, or add a poster while the video is pending.'
  return true
}

export function validateDuration(value: unknown): true | string {
  if (value === undefined) return true
  return typeof value === 'string' && /^(?:\d+:[0-5]\d:[0-5]\d|\d{1,2}:[0-5]\d)$/.test(value) &&
    value.split(':').some(part => Number(part) > 0)
    ? true : 'Use a positive duration such as 01:24 or 1:02:30.'
}
