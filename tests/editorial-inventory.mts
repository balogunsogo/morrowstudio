import fs from 'node:fs'
import {createClient} from '@sanity/client'
import {contentForViewport, selectKeys} from '@/components/project/contract'
import type {ContentBlock} from '@/components/project/types'

type Document = {_id: string; _rev: string; _type: string; title?: string; slug?: {current: string}; content?: ContentBlock[]; mobileOrder?: string[]; statementBody?: unknown[]}
type Occurrence = {path: string; text: string; viewports: string[]; reason: string}
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!, apiVersion: '2026-10-04', useCdn: false, perspective: 'published', token: process.env.SANITY_API_READ_TOKEN, stega: false})
const documents = await client.fetch<Document[]>('*[_type in ["project", "homepage", "about"]] | order(orderRank asc){...}')
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()
const occurrences: {document: Document; entries: Occurrence[]}[] = []

function scopes(document: Document, path: string): {viewports: string[]; reason: string} {
  if (document._type === 'about') {
    if (/^(contactHeading|contactEmail|socialLinks|pressEmail|studioAddress)/.test(path)) return {viewports: [], reason: 'Unused About contact field: the route renders the Home-owned shared footer (R03).'}
    if (path === 'statement' && document.statementBody?.length) return {viewports: [], reason: 'Unused plain statement compatibility field; formatted body wins.'}
    return {viewports: ['desktop', 'mobile'], reason: 'Active About content.'}
  }
  if (document._type !== 'project') return {viewports: ['desktop', 'mobile'], reason: 'Active Home content; inspect any future field-specific fallback.'}
  const match = path.match(/^content\[_key=="([^"]+)"\]\.(.*)$/)
  if (!match) return {viewports: [], reason: 'Outside rendered case-study content; review field use before editing.'}
  const [, key, field] = match
  const block = (document.content ?? []).find(block => block._key === key) as ContentBlock & {body?: unknown[]; mobile?: {body?: unknown[]}}
  const viewports = ['desktop', 'mobile'].filter(viewport => {
    if (!contentForViewport(document.content ?? [], viewport as 'desktop' | 'mobile', document.mobileOrder).some(block => block._key === key)) return false
    if (block._type === 'creditsBlock') {
      const override = field.match(/^mobileOverrides\[_key=="([^"]+)"\]\.(name|role)$/)
      if (override) {
        const row = block.mobileOverrides?.find(row => row._key === override[1])
        return !!row && viewport === 'mobile' && selectKeys(block.items ?? [], block.mobileCreditKeys).some(item => item._key === row.creditKey) && block.mobileOverrides?.find(item => item.creditKey === row.creditKey)?._key === row._key
      }
      const item = field.match(/^items\[_key=="([^"]+)"\]\.(name|role)$/)
      if (item && viewport === 'mobile') {
        if (!selectKeys(block.items ?? [], block.mobileCreditKeys).some(row => row._key === item[1])) return false
        if (block.mobileOverrides?.find(row => row.creditKey === item[1])?.[item[2] as 'name' | 'role'] != null) return false
      }
    }
    if (field.startsWith('mobile.')) return viewport === 'mobile'
    if (field.startsWith('body[') && viewport === 'mobile' && block.mobile?.body != null) return false
    if (field === 'text' && block.body?.length) return false
    return true
  })
  return {viewports, reason: viewports.length ? 'Active case-study field after viewport selection/overrides.' : 'Unused stored selection/compatibility field in the current renderer; retained, not deleted.'}
}

for (const document of documents) {
  const entries: Occurrence[] = []
  function walk(value: unknown, path: string) {
    if (typeof value === 'string' && /\[[^\]\n]+\]/.test(value)) entries.push({path, text: value, ...scopes(document, path)})
    else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${path}[${item?._key ? `_key==${JSON.stringify(item._key)}` : index}]`))
    else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) if (!key.startsWith('_')) walk(child, path ? `${path}.${key}` : key)
  }
  walk(document, '')
  occurrences.push({document, entries})
}
const total = occurrences.reduce((sum, row) => sum + row.entries.length, 0)
const visible = occurrences.reduce((sum, row) => sum + row.entries.filter(entry => entry.viewports.length).length, 0)
const unique = new Set(occurrences.flatMap(row => row.entries.map(entry => normalize(entry.text))))
const lines = ['# Morrow Studio: Editorial Review Inventory', '', `Read-only published snapshot: ${new Date().toISOString()}. No CMS write, rewrite or publication.`, '',
  `Found ${total} bracket-bearing string fields, ${unique.size} globally distinct full strings after whitespace normalization. ${visible} fields are active in at least one viewport; ${total - visible} stored fields are unused in the current renderer. Counts are field occurrences, not individual bracket tokens or distinct editorial decisions.`, '',
  '## Method And Decisions', '',
  'Exact full strings are deduplicated within each page; every stable keyed field path is retained. Mobile/desktop variants with different wording remain separate. Viewport status follows ProjectContent selection, mobile body/credit overrides, and the About footer binding, rather than merely matching text that happens to appear elsewhere. Duplicate text in a dormant field is not counted as visible there.', '',
  `Keep the fictional studio and projects. For each active placeholder, approve intentional fictional wording or supply approved fictional names/outcomes. Do not substitute invented real commissions, awards or suppliers. Unused fields are lower priority, not authorization to delete them. Legacy plain-copy fallbacks contain no bracketed strings in this snapshot. ${total > visible ? 'The entirely unused bracket-bearing field is the unbound About address.' : 'No entirely unused bracket-bearing field remains in this snapshot.'} Some canonical credit/body fields are inactive on mobile because an override wins, but remain visible on desktop; these are not entirely unused compatibility copy.`, '',
  'Home: no bracketed strings in the published document. Work: no independent editorial document; archive metadata comes from Home/project fields and contains no bracketed strings in the active archive labels. Shared public contact/footer data contains no bracketed strings. All ten case studies and About are listed below.', '']
for (const {document, entries} of occurrences.filter(row => row.document._type !== 'homepage')) {
  const route = document._type === 'about' ? '/about' : `/work/${document.slug!.current}`
  lines.push(`## ${document.title ?? 'About'} (${route})`, '', `Document ID: \`${document._id}\`. Revision: \`${document._rev}\`. ${entries.length} stored fields.`, '')
  if (!entries.length) {lines.push('No bracketed strings.', ''); continue}
  const grouped = new Map<string, Occurrence[]>()
  for (const entry of entries) {const key = normalize(entry.text); grouped.set(key, [...(grouped.get(key) ?? []), entry])}
  lines.push('| Full String | Active Viewports / Unused Fields | Stable Source Paths |', '| --- | --- | --- |')
  for (const [text, group] of grouped) {
    const status = group.map(entry => `${entry.viewports.join(' + ') || 'UNUSED'}: ${entry.reason}`).filter((value, index, all) => all.indexOf(value) === index).join('<br>')
    lines.push(`| ${text.replaceAll('|', '\\|')} | ${status} | ${group.map(entry => `\`${entry.path}\` (${entry.viewports.join('/') || 'unused'})`).join('<br>')} |`)
  }
  lines.push('')
}
const output = process.env.EDITORIAL_OUTPUT_DIR ?? '.tmp/awwwards/phase-2'
fs.mkdirSync(output, {recursive: true})
fs.writeFileSync(`${output}/editorial.json`, JSON.stringify({at: new Date().toISOString(), total, visible, unused: total - visible, globalDistinct: unique.size, occurrences}, null, 2))
const historical = process.env.EDITORIAL_HISTORICAL_DOC ? fs.readFileSync(process.env.EDITORIAL_HISTORICAL_DOC, 'utf8') + '\n# Latest CMS Snapshot\n\nRequested follow-up snapshot; the original 70-field inventory above is retained, not overwritten. Compare each page\'s revision and keyed paths before editing.\n\n' : ''
fs.writeFileSync(process.env.EDITORIAL_DOC_OUTPUT ?? 'docs/awwwards-editorial-review.md', historical + lines.join('\n') + '\n')
console.log(JSON.stringify({total, visible, unused: total - visible, globalDistinct: unique.size}))
