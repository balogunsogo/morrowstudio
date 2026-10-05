import {createDataAttribute, stegaClean} from 'next-sanity'
import {dataset, projectId} from '../env'

export type EditingField = {id: string; path: string; type?: 'homepage' | 'about' | 'project'}

// Explicit field targets cover images and text split across multiple elements.
export function dataAttribute(field?: EditingField) {
  if (!field) return undefined
  return createDataAttribute({projectId, dataset, baseUrl: '/studio', id: stegaClean(field.id), type: field.type ?? 'project', path: stegaClean(field.path)}).toString()
}

export function childField(field: EditingField | undefined, path: string): EditingField | undefined {
  return field ? {...field, path: `${field.path}.${path}`} : undefined
}
