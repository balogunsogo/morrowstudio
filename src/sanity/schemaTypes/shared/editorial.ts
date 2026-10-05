import type {FieldDefinition, Path} from 'sanity'
import {record} from './validation'

type FieldPlan = Pick<FieldDefinition, 'name' | 'group' | 'title' | 'description' | 'hidden' | 'readOnly' | 'fieldset'>

// Only editor metadata changes here. Existing field types, values, defaults,
// components and validation are retained, including fields added in the future.
export function organizeFields(fields: FieldDefinition[], plan: FieldPlan[]): FieldDefinition[] {
  const byName = new Map(fields.map(field => [field.name, field]))
  const ordered = plan.map(metadata => {
    const field = byName.get(metadata.name)
    if (!field) throw new Error(`Missing Studio field: ${metadata.name}`)
    byName.delete(metadata.name)
    return {...field, ...metadata} as FieldDefinition
  })
  return [...ordered, ...byName.values()]
}

const placeholder = /\[(?:[XY]|[^\]\n]*(?:names?|address|signwriter|photographers?|supplier|printer|stylist|designers?|curators?|client|award body|lighting designer))\]/i

export function placeholderPaths(value: unknown, path: Path = []): Path[] {
  if (typeof value === 'string') return placeholder.test(value) ? [path] : []
  if (Array.isArray(value)) return value.flatMap((item, index) => {
    const key = record(item)._key
    return placeholderPaths(item, [...path, typeof key === 'string' ? {_key: key} : index])
  })
  const owner = record(value)
  const filled = (field: string) => Array.isArray(owner[field]) && owner[field].length > 0
  return Object.entries(owner).flatMap(([key, child]) => {
    const inactive = (key === 'text' && filled('body'))
      || (owner._type === 'homepage' && key === 'studioStatement' && filled('studioStatementBody'))
      || (owner._type === 'about' && ((key === 'statement' && filled('statementBody')) || (key === 'capabilities' && filled('capabilityItems'))))
      || (key === 'leftImage' && !!record(record(owner.left).image).asset)
      || (key === 'rightImage' && !!record(record(owner.right).image).asset)
    return key.startsWith('_') || inactive ? [] : placeholderPaths(child, [...path, key])
  })
}

export function warnPlaceholders(value: unknown) {
  const paths = placeholderPaths(value)
  return paths.length ? {message: 'Placeholder content — replace before final client launch.', paths} : true
}

export const mobileGuidance = 'Optional. Leave empty to use the desktop content. Only fill in the parts that need to change on small screens.'
export const collapsed = {collapsible: true, collapsed: true}
