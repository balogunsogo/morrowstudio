import assert from 'node:assert/strict'
import fs from 'node:fs'
import {test} from 'node:test'
import {renderToStaticMarkup} from 'react-dom/server'
import {JSDOM} from 'jsdom'
import {ThemeProvider, studioTheme} from '@sanity/ui'
import {FormValueProvider, type FormDocumentValue, type ArrayOfPrimitivesInputProps} from 'sanity'
import {Schema} from '@sanity/schema'
import {schema} from '../src/sanity/schemaTypes'
import {availableOptions, blockLabel, canonicalOptions, concise, creditOverrideCollectionPath, portableTextPreview, resolveKey, siblingCollectionPath} from '../src/sanity/components/keyedOptions'
import KeyedOrderInput, {KeyedChoiceInput} from '../src/sanity/components/KeyedOrderInput'
import {CreditMobileOrderInput, CreditOverrideTargetInput, GalleryMobileOrderInput, MobileSectionOrderInput} from '../src/sanity/components/MobileKeyInputs'
import {arrayProps, stringProps} from './studio-keyed-adapter'
import type {ReactNode} from 'react'

const documentFor = (node: ReactNode) => new JSDOM(renderToStaticMarkup(<ThemeProvider theme={studioTheme}>{node}</ThemeProvider>)).window.document
const pt = (text: string, style = 'normal') => ({_type: 'block', style, children: [{text}]})
const source = fs.readFileSync('migration/data/source-mapping.json', 'utf8')
const projects = JSON.parse(source) as Record<string, unknown>[]
const options = canonicalOptions([{_key: '6280dbb1494d8328', _type: 'textBlock', label: 'Overview'}, {_key: '8a00e8e08307a2b9', _type: 'fullWidthImage', caption: 'Fig. 01'}], 'section')

test('all block labels, first heading, Portable Text and legacy fallbacks are concise', () => {
  const examples = [
    [{_type: 'textBlock', label: 'Overview'}, 'Overview'],
    [{_type: 'fullWidthImage', caption: 'Fig. 01'}, 'Fig. 01'],
    [{_type: 'containedImage'}, 'Contained image'],
    [{_type: 'imagePair', left: {caption: 'Key fob'}, right: {caption: 'Breakfast card'}}, 'Key fob + Breakfast card'],
    [{_type: 'imagePair', sharedCaption: 'Pair'}, 'Pair'],
    [{_type: 'largeStatement', body: [pt('Brand statement')]}, 'Brand statement'],
    [{_type: 'largeStatement', text: 'Legacy statement'}, 'Legacy statement'],
    [{_type: 'imageWithText', body: [pt('Ignored'), pt('First heading', 'h3'), pt('Second heading', 'h3')]}, 'First heading'],
    [{_type: 'gallery', images: [{}, {}]}, 'Gallery · 2 images'],
    [{_type: 'quoteBlock', quote: 'A useful quote'}, 'A useful quote'],
    [{_type: 'creditsBlock', title: 'Team'}, 'Team'],
    [{_type: 'videoBlock', title: 'Film'}, 'Film'],
  ] as const
  for (const [block, title] of examples) assert.equal(blockLabel(block).title, title)
  for (const type of ['textBlock', 'fullWidthImage', 'imagePair', 'largeStatement', 'imageWithText', 'quoteBlock', 'creditsBlock', 'videoBlock']) assert.ok(blockLabel({_type: type}).title)
  assert.equal(portableTextPreview([pt(' One\n two '), pt('Three')]), 'One two Three')
  assert.equal(Array.from(concise('🙂'.repeat(90), 'Fallback')).length, 70)
  assert.equal(concise(undefined, 'Fallback'), 'Fallback')
})

test('gallery captions, alt and indexed fallback; credits use role/name', () => {
  assert.deepEqual(canonicalOptions([{_key: 'a', caption: 'Caption', alt: 'Alt'}, {_key: 'b', alt: 'Alt'}, {_key: 'c'}], 'image').map(o => o.title), ['Caption', 'Alt', 'Image 03'])
  assert.equal(canonicalOptions([{_key: 'credit', role: 'Brand identity', name: 'Morrow Studio'}], 'credit')[0].title, 'Brand identity — Morrow Studio')
})

test('exact keys, stale keys, duplicates and desktop-only source items are handled without mutation', () => {
  const canonical = [{_key: ' key ', caption: 'Exact'}, {_key: 'dup'}, {_key: 'dup'}, {_key: 'desktop', visibility: 'desktop'}]
  const before = JSON.stringify(canonical)
  const resolved = canonicalOptions(canonical, 'image')
  assert.equal(resolved[0].key, ' key ')
  assert.deepEqual(availableOptions(resolved).map(o => o.key), [' key '])
  assert.match(resolveKey('stale-key', resolved, 'image').title, /Unknown image · stale-key/)
  assert.match(resolved[1].unavailable!, /Duplicate/)
  assert.equal(JSON.stringify(canonical), before)
  assert.deepEqual(availableOptions(options, [options[0].key]).map(o => o.key), [options[1].key])
})

test('known labels hide hashes while stale values remain visible with original option values', () => {
  const known = documentFor(<KeyedChoiceInput props={stringProps(options[0].key)} options={options} kind="section" />)
  assert.match(known.body.textContent!, /Overview/)
  assert.ok(!known.body.textContent!.includes(options[0].key))
  assert.equal(known.querySelector('option[selected]')?.getAttribute('value'), options[0].key)
  const stale = documentFor(<KeyedChoiceInput props={stringProps('stale')} options={options} kind="section" />)
  assert.match(stale.body.textContent!, /Unknown section · stale/)
  assert.equal(stale.querySelector('option[selected]')?.getAttribute('value'), 'stale')
})

test('native array ordering/removal, validation, presence and renderItem callbacks are preserved', () => {
  let forwarded: ArrayOfPrimitivesInputProps | undefined
  let updated: string[] | undefined
  const original = arrayProps([options[1].key, options[0].key], value => {updated = value})
  original.renderDefault = props => {forwarded = props as ArrayOfPrimitivesInputProps; return <span>Native array</span>}
  documentFor(<KeyedOrderInput props={original} options={options} kind="section" />)
  assert.ok(forwarded)
  for (const key of ['onMoveItem', 'onItemRemove', 'renderItem', 'validation', 'presence', 'members', 'value'] as const) assert.equal(forwarded[key], original[key])
  forwarded.onMoveItem({fromIndex: 1, toIndex: 0})
  assert.deepEqual(updated, options.map(o => o.key))
})

test('legacy absent fields and explicit empty selection remain different and emit no opening patches', () => {
  for (const value of [undefined, []]) {
    let writes = 0
    const doc = documentFor(<KeyedOrderInput props={arrayProps(value, () => {writes++})} options={options} kind="section" />)
    assert.equal(writes, 0)
    assert.match(doc.body.textContent!, value ? /Empty selection/ : /default order from the main content/)
  }
  const doc = documentFor(<KeyedOrderInput props={arrayProps([options[0].key], () => assert.fail('read-only write'), true)} options={options} kind="section" />)
  assert.ok([...doc.querySelectorAll('select,button')].every(control => control.hasAttribute('disabled')))
})

test('nested keyed paths locate canonical siblings and override credit rows', () => {
  assert.deepEqual(siblingCollectionPath(['content', {_key: 'gallery'}, 'mobileImageKeys'], 'images'), ['content', {_key: 'gallery'}, 'images'])
  assert.deepEqual(creditOverrideCollectionPath(['content', {_key: 'credits'}, 'mobileOverrides', {_key: 'override'}, 'creditKey']), ['content', {_key: 'credits'}, 'items'])
})

test('actual form subscriptions resolve Aster, Forma and Meridian selections without changing source documents', () => {
  for (const title of ['Aster House', 'Forma', 'Meridian']) {
    const project = projects.find(p => p.title === title)!
    const content = project.content as Record<string, unknown>[]
    const elements: ReactNode[] = [<MobileSectionOrderInput key="sections" {...arrayProps(project.mobileOrder as string[] | undefined)} />]
    for (const block of content) {
      if (block._type !== 'gallery' && block._type !== 'creditsBlock') continue
      const gallery = block._type === 'gallery'
      const props = arrayProps(block[gallery ? 'mobileImageKeys' : 'mobileCreditKeys'] as string[] | undefined)
      props.path = ['content', {_key: block._key as string}, gallery ? 'mobileImageKeys' : 'mobileCreditKeys']
      elements.push(gallery ? <GalleryMobileOrderInput key={block._key as string} {...props} /> : <CreditMobileOrderInput key={block._key as string} {...props} />)
      if (!gallery) {
        const target = stringProps((block.items as {_key: string}[])[0]._key)
        target.path = ['content', {_key: block._key as string}, 'mobileOverrides', {_key: 'override'}, 'creditKey']
        elements.push(<CreditOverrideTargetInput key={`${block._key}-override`} {...target} />)
      }
    }
    const doc = documentFor(<FormValueProvider value={project as FormDocumentValue}>{elements}</FormValueProvider>)
    assert.ok(!doc.body.textContent!.includes('Unknown'))
    assert.match(doc.body.textContent!, /Text block/)
    assert.ok(!(project.mobileOrder as string[]).some(key => doc.body.textContent!.includes(key)))
  }
  assert.equal(fs.readFileSync('migration/data/source-mapping.json', 'utf8'), source)
})

test('compiled schema retains string arrays, target string and existing validation', () => {
  const compiled = Schema.compile({name: 'keyed-input-test', types: schema.types})
  for (const [type, name] of [['project', 'mobileOrder'], ['gallery', 'mobileImageKeys'], ['creditsBlock', 'mobileCreditKeys']]) {
    const field = compiled.get(type).fields.find((f: {name: string}) => f.name === name).type
    assert.equal(field.jsonType, 'array')
    assert.equal(field.of[0].jsonType, 'string')
    assert.ok(field.components.input)
    assert.ok(field.validation.length)
  }
  const target = compiled.get('creditsBlock').fields.find((f: {name: string}) => f.name === 'mobileOverrides').type.of[0].fields.find((f: {name: string}) => f.name === 'creditKey').type
  assert.equal(target.jsonType, 'string')
  assert.ok(target.validation.length)
})
