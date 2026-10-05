'use client'

import {Card, Stack, Text} from '@sanity/ui'
import type {InputProps, ObjectInputProps} from 'sanity'
import {placeholderPaths} from '../schemaTypes/shared/editorial'

export function StudioDocumentInput(props: InputProps) {
  if (!['homepage', 'about', 'project'].includes(props.schemaType.name)) return props.renderDefault(props)
  const placeholders = placeholderPaths(props.value)
  return <Stack space={4}>
    <Card padding={3} radius={2} tone="transparent" border>
      <Text size={1}>Changes save as drafts. Use Presentation to preview them before publishing.</Text>
    </Card>
    {!!placeholders.length && <Card padding={3} radius={2} tone="caution" role="status">
      <Text size={1}>Placeholder content — replace before final client launch. Check the highlighted fields; keep the supplied wording until you have confirmed replacements.</Text>
    </Card>}
    {props.renderDefault(props)}
  </Stack>
}

export function PendingVideoInput(props: ObjectInputProps) {
  return <Stack space={3}>
    {props.value?.sourceType === 'unresolved' && <Card padding={3} radius={2} tone="caution" role="status">
      <Text size={1}>Video source still needed. The poster will display on the site until a video file or URL is added. Choose Uploaded video or Website link below when the source is ready.</Text>
    </Card>}
    {props.renderDefault(props)}
  </Stack>
}

// Same restrained mark already used by the website's icon.svg.
export function MorrowMark() {
  return <svg viewBox="0 0 64 64" width="1em" height="1em" role="img" aria-label="Morrow Studio">
    <rect width="64" height="64" rx="8" fill="#151513" />
    <path d="M12 47V17h7l13 20 13-20h7v30h-7V29L32 48 19 29v18z" fill="#F1EFEA" />
  </svg>
}
