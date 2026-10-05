import assert from 'node:assert/strict'
import fs from 'node:fs'
import {test} from 'node:test'
import {renderToStaticMarkup} from 'react-dom/server'
import {ThemeProvider, studioTheme} from '@sanity/ui'
import {Schema} from '@sanity/schema'
import {isObjectInputProps, ConcreteRuleClass, type InputProps, type ObjectInputProps, type SchemaTypeDefinition} from 'sanity'
import {schema} from '../src/sanity/schemaTypes'
import {organizeFields, placeholderPaths, warnPlaceholders} from '../src/sanity/schemaTypes/shared/editorial'
import {blockPreview, projectPreview} from '../src/sanity/schemaTypes/shared/previews'
import {PendingVideoInput, StudioDocumentInput} from '../src/sanity/components/StudioGuidance'
import {record, validateVideo} from '../src/sanity/schemaTypes/shared/validation'
import config from '../sanity.config'
import type {ReactNode} from 'react'

const documents = JSON.parse(fs.readFileSync('migration/data/source-mapping.json', 'utf8')) as Record<string, unknown>[]
const compiled = Schema.compile({name: 'studio-ux-test', types: schema.types})
const markup = (node: ReactNode) => renderToStaticMarkup(<ThemeProvider theme={studioTheme}>{node}</ThemeProvider>)

test('native document groups give every field a home and preserve primitive/reference representations', () => {
  const expected: Record<string, string[]> = {project: ['Overview', 'Archive', 'Case Study', 'Mobile'], homepage: ['Hero', 'Featured Work', 'Studio', 'Project Index', 'Footer', 'Mobile'], about: ['Intro', 'Images', 'Biography', 'Capabilities', 'Clients', 'Recognition', 'Contact', 'Mobile']}
  for (const [name, titles] of Object.entries(expected)) {
    const type = compiled.get(name)
    assert.deepEqual(type.groups.filter((group: {name: string}) => group.name !== 'all-fields').map((group: {title: string}) => group.title), titles)
    const groups = new Set(type.groups.map((group: {name: string}) => group.name))
    assert.ok(type.fields.every((field: {group: string}) => groups.has(field.group)))
    assert.equal(type.groups.find((group: {default?: boolean}) => group.default).title, titles[0])
    assert.equal(type.fields[0].name, name === 'project' ? 'title' : name === 'homepage' ? 'heroEyebrow' : 'eyebrow')
  }
  const project = compiled.get('project')
  assert.equal(project.fields.find((field: {name: string}) => field.name === 'mobileOrder').type.of[0].jsonType, 'string')
  assert.equal(project.fields.find((field: {name: string}) => field.name === 'orderRank').type.jsonType, 'number')
  assert.equal(compiled.get('homepage').fields.find((field: {name: string}) => field.name === 'projectIndex').type.of[0].name, 'reference')
})

test('editor metadata organization retains validation, defaults and all fields', () => {
  const validation = () => []
  const fields = [{name: 'a', type: 'string' as const, initialValue: 'original', validation}, {name: 'b', type: 'number' as const}]
  const next = organizeFields(fields, [{name: 'b', group: 'overview'}, {name: 'a', title: 'Friendly title'}])
  assert.equal(next[1].validation, validation)
  assert.equal(next[1].initialValue, 'original')
  assert.deepEqual(next.map(field => field.name), ['b', 'a'])
  assert.equal(organizeFields(fields, [{name: 'a'}]).length, 2)
})

test('all ten block previews resolve migrated content and meaningful legacy fallbacks without exposing keys', () => {
  const seen = new Set<string>()
  for (const project of documents.filter(document => document._type === 'project')) {
    for (const block of project.content as Record<string, unknown>[]) {
      const type = schema.types.find(type => type.name === block._type) as SchemaTypeDefinition & {preview: {select: Record<string, string>; prepare: (value: Record<string, unknown>) => {title: string; subtitle: string}}}
      const selection = Object.fromEntries(Object.entries(type.preview.select).map(([name, path]) => [name, path.split('.').reduce<unknown>((value, part) => record(value)[part] ?? (Array.isArray(value) ? value[Number(part)] : undefined), block)]))
      const preview = type.preview.prepare(selection)
      assert.ok(preview.title && preview.subtitle, `${type.name} has an empty preview`)
      assert.ok(!preview.title.includes(block._key as string))
      assert.ok(Array.from(preview.title).length <= 70)
      seen.add(type.name)
    }
  }
  assert.equal(seen.size, 10)
  assert.equal(blockPreview('largeStatement', {text: 'Original statement'}).title, 'Original statement')
  assert.equal(blockPreview('gallery', {images: [{visibility: 'desktop'}, {}], mobileImageKeys: []}).subtitle, '2 images · Mobile: 0')
  assert.equal(blockPreview('creditsBlock', {items: [{}]}).subtitle, '1 entry')
  assert.match(blockPreview('videoBlock', {title: 'Brand film', duration: '01:24', sourceType: 'unresolved'}).subtitle!, /Poster only — source pending/)
  assert.equal(projectPreview({title: 'Aster House', rank: 1, sector: 'Hospitality', year: 2026}).subtitle, '01 · Hospitality · 2026')
})

test('placeholder warnings locate real editable values by stable paths and skip inactive compatibility copy', () => {
  const document = {_type: 'project', _id: '[not-editorial]', content: [{_key: 'existing-block', body: [{_key: 'paragraph', children: [{_key: 'span', text: '[Founder name] achieved [X]%.'}]}]}]}
  assert.deepEqual(placeholderPaths(document), [['content', {_key: 'existing-block'}, 'body', {_key: 'paragraph'}, 'children', {_key: 'span'}, 'text']])
  assert.equal(warnPlaceholders({title: 'Confirmed copy'}), true)
  assert.deepEqual(placeholderPaths({_type: 'about', statement: '[Founder name]', statementBody: [{children: [{text: 'Confirmed copy'}]}]}), [])
  assert.ok(placeholderPaths(documents.find(document => document._type === 'about')).length)
  const rules = [compiled.get('about').validation(new ConcreteRuleClass())].flat()
  assert.ok(rules.some((rule: {_level: string}) => rule._level === 'warning'))
  assert.ok(!rules.some((rule: {_level: string}) => rule._level === 'error'))
})

test('active legacy fields stay read-only and visible; populated replacements hide inactive fields', () => {
  for (const name of ['leftImage', 'rightImage']) {
    const field = compiled.get('imagePair').fields.find((field: {name: string}) => field.name === name).type
    assert.equal(field.readOnly, true)
    assert.equal(field.hidden({value: {asset: {_ref: 'original'}}, parent: {}}), false)
    assert.equal(field.hidden({value: {asset: {_ref: 'original'}}, parent: {[name === 'leftImage' ? 'left' : 'right']: {image: {asset: {_ref: 'replacement'}}}}}), true)
  }
  const statement = compiled.get('largeStatement').fields.find((field: {name: string}) => field.name === 'text').type
  assert.equal(statement.readOnly, true)
  assert.equal(statement.hidden({value: 'Original copy', parent: {}}), false)
  assert.equal(statement.hidden({value: 'Original copy', parent: {body: [{}]}}), true)
})

test('guidance inputs forward native rendering without emitting patches; media warnings remain nonblocking', () => {
  for (const document of documents.filter(document => ['project', 'homepage', 'about'].includes(document._type as string))) {
    let renders = 0
    const props = {schemaType: {name: document._type, jsonType: 'object'}, value: document, onChange: () => assert.fail('Opening a document wrote a patch'), renderDefault: () => {renders++; return <div>Native form</div>}} as unknown as InputProps
    assert.ok(isObjectInputProps(props))
    const html = markup(<StudioDocumentInput {...props} />)
    assert.equal(renders, 1)
    assert.match(html, /Presentation/)
    assert.ok(html.includes('Placeholder content') === (placeholderPaths(document).length > 0))
  }
  const native = {renderDefault: () => <div>Native video fields</div>} as unknown as ObjectInputProps
  assert.match(markup(<PendingVideoInput {...native} value={{sourceType: 'unresolved'}} />), /Video source still needed/)
  assert.ok(!markup(<PendingVideoInput {...native} value={{sourceType: 'url'}} />).includes('Video source still needed'))
  assert.equal(validateVideo({sourceType: 'unresolved', poster: {asset: {_ref: 'original-poster'}}}), true)
  const rules = [compiled.get('videoBlock').fields.find((field: {name: string}) => field.name === 'sourceType').type.validation(new ConcreteRuleClass())].flat()
  assert.ok(rules.some((rule: {_level: string}) => rule._level === 'warning'))
  assert.ok(rules.some((rule: {_level: string}) => rule._level === 'error'))
})

test('branding retains Presentation, Vision, resolvers and embedded preview paths', () => {
  assert.equal(config.title, 'Morrow Studio')
  assert.equal(config.basePath, '/studio')
  assert.ok(config.plugins)
  assert.ok(config.form?.components?.input)
  const source = fs.readFileSync('sanity.config.ts', 'utf8')
  for (const required of ['presentationTool', 'visionTool', '/api/draft-mode/enable', '/api/draft-mode/disable', 'resolve']) assert.ok(source.includes(required))
})
