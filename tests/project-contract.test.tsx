import assert from 'node:assert/strict'
import {test} from 'node:test'
import {renderToStaticMarkup} from 'react-dom/server'
import {JSDOM} from 'jsdom'
import {Schema} from '@sanity/schema'
import {parse, evaluate} from 'groq-js'
import ProjectContent from '@/components/project/ProjectContent'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectMetadata from '@/components/project/ProjectMetadata'
import {contentForViewport, creditsForViewport, galleryForViewport, heroForProject, needsResponsiveContent, pairForViewport, selectKeys} from '@/components/project/contract'
import type {Project} from '@/components/project/types'
import {imageConfigDefault} from 'next/dist/shared/lib/image-config'
import nextConfig from '../next.config'
import {validateDuration, validateKeys, validateMobileOrder, validatePair, validateSelection, validateStatement, validateVideo} from '@/sanity/schemaTypes/shared/validation'
import {schema} from '@/sanity/schemaTypes'
import {PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY} from '@/sanity/lib/queries'
import {contractFixture, image} from '../migration/fixtures/contract'
import legacy from '../migration/fixtures/legacy-aster.json'

const content = contractFixture.content!
// Outside a Next build, webpack does not inject next.config into next/image.
// Apply the actual app allowlist to its default config for these SSR tests.
imageConfigDefault.remotePatterns = nextConfig.images?.remotePatterns ?? []
const documentFor = (project: Project) => new JSDOM(renderToStaticMarkup(<ProjectContent content={project.content} mobileOrder={project.mobileOrder} documentId={project._id} />)).window.document

test('mobile content order, visibility and override; desktop preserves canonical prose', () => {
  const document = documentFor(contractFixture)
  const desktop = document.querySelector('[data-content-viewport="desktop"]')!
  const mobile = document.querySelector('[data-content-viewport="mobile"]')!
  assert.ok(desktop.textContent?.includes('Desktop introduction.'))
  assert.ok(!desktop.textContent?.includes('Short mobile introduction.'))
  assert.ok(mobile.textContent?.includes('Short mobile introduction.'))
  assert.equal(mobile.querySelector('[data-content-key]')?.getAttribute('data-content-key'), 'outcome')
  assert.equal(desktop.querySelector('[data-content-key="outcome"]'), null)
  assert.equal(mobile.querySelector('[data-content-key="desktop-note"]'), null)
  assert.deepEqual(contentForViewport(content, 'mobile', undefined).map(block => block._key), content.filter(b => b.visibility !== 'desktop').map(b => b._key))
})

test('alternate mobile hero retains separate asset, alt and editing target', () => {
  const document = new JSDOM(renderToStaticMarkup(<ProjectHero project={contractFixture} />)).window.document
  assert.equal(document.querySelector('.project-desktop-only img')?.getAttribute('alt'), 'desktophero')
  assert.equal(document.querySelector('.project-mobile-only img')?.getAttribute('alt'), 'mobilehero')
  assert.ok(document.querySelector('.project-mobile-only img')?.getAttribute('src')?.includes('mobilehero'))
  assert.equal(heroForProject({coverImage: image('legacy')}).desktopPath, 'coverImage')
})

test('mobile metadata is an editorial short label override, not archive tag substitution', () => {
  const document = new JSDOM(renderToStaticMarkup(<ProjectMetadata project={contractFixture} />)).window.document
  assert.ok(document.querySelector('.project-desktop-only')?.textContent?.includes('Long client label'))
  assert.ok(document.querySelector('.project-mobile-only')?.textContent?.includes('Short client'))
  assert.ok(document.querySelector('.project-mobile-only')?.textContent?.includes('Identity'))
})

test('image pair replacement, semantic reorder and captions preserve source editing paths', () => {
  const pair = content.find(b => b._type === 'imagePair')!
  assert.equal(pair._type, 'imagePair')
  if (pair._type !== 'imagePair') return
  const mobile = pairForViewport(pair, 'mobile')
  assert.deepEqual(mobile.uses.map(use => use.side), ['right', 'left'])
  assert.equal(mobile.uses[1].alt, 'Replacement left')
  assert.equal(mobile.uses[1].imagePath, 'mobile.left.image')
  assert.equal(pairForViewport(pair, 'desktop').uses[0].alt, 'Canonical left')
  const dom = documentFor(contractFixture)
  assert.ok(dom.querySelector('[data-content-viewport="mobile"] [data-content-key="pair"]')?.textContent?.includes('Combined mobile caption'))
})

test('gallery selection reorders canonical keys and includes mobile-only images without desktop leakage', () => {
  const gallery = content.find(b => b._type === 'gallery')!
  if (gallery._type !== 'gallery') return
  assert.deepEqual(galleryForViewport(gallery.images!, 'desktop').map(i => i._key), ['one', 'two'])
  assert.deepEqual(galleryForViewport(gallery.images!, 'mobile', gallery.mobileImageKeys).map(i => i._key), ['mobile-image', 'two'])
  assert.equal(galleryForViewport(gallery.images!, 'mobile', gallery.mobileImageKeys)[1].alt, 'Short alternate text')
  assert.deepEqual(galleryForViewport(gallery.images!, 'mobile', []).map(i => i._key), [])
  assert.ok(needsResponsiveContent([{...gallery, mobileImageKeys: undefined}]))
})

test('quote and keyed credits select/override only the mobile branch', () => {
  const document = documentFor(contractFixture)
  assert.ok(document.querySelector('[data-content-viewport="mobile"] [data-content-key="quote"]')?.textContent?.includes('Mobile quote'))
  assert.ok(document.querySelector('[data-content-viewport="desktop"] [data-content-key="quote"]')?.textContent?.includes('Canonical quote'))
  const credits = content.find(b => b._type === 'creditsBlock')!
  if (credits._type !== 'creditsBlock') return
  assert.deepEqual(creditsForViewport(credits, 'mobile'), [{_key: 'photo', role: 'Images', name: '[Photographer]'}])
  assert.equal(creditsForViewport(credits, 'desktop').length, 2)
})

test('unresolved video has a poster and supplied caption but no playback/link; statement has semantic muted span', () => {
  const document = documentFor(contractFixture)
  const preview = document.querySelector('[data-media-state="unresolved"]')!
  assert.ok(preview.querySelector('img'))
  assert.ok(preview.textContent?.includes('Reference film'))
  assert.ok(preview.textContent?.includes('01:24'))
  assert.ok(preview.textContent?.includes('Supplied film caption'))
  assert.equal(preview.querySelector('video,button,a'), null)
  assert.equal(document.querySelector('.project-muted')?.textContent, 'muted phrase.')
})

test('real published legacy Aster fixture retains all twelve blocks, image pairs, plain statement and unresolved poster', () => {
  const project = legacy as unknown as Project
  const document = documentFor(project)
  assert.equal(document.querySelectorAll('[data-content-key]').length, 12)
  assert.equal(document.querySelectorAll('.project-image-pair img').length, 4)
  const statement = project.content?.find(block => block._type === 'largeStatement')
  assert.equal(document.querySelector('.project-statement p')?.textContent, statement?._type === 'largeStatement' ? statement.text : undefined)
  assert.equal(document.querySelectorAll('[data-content-viewport]').length, 0)
  assert.ok(document.querySelector('[data-media-state="unresolved"] img'))
  assert.ok(document.body.textContent?.includes('(Overview)'))
  assert.ok(document.body.textContent?.includes('(Approach)'))
})

test('schema validation rejects invalid references/duplicates, accepts legacy pair/statement and incomplete source posters', () => {
  assert.equal(validateKeys([{_key: 'a'}, {_key: 'a'}]), 'Two items share an identifier. Ask the website team to repair them.')
  assert.equal(validateSelection(['missing'], [{_key: 'a'}]), 'A selected item no longer exists. Choose a replacement or remove that selection.')
  assert.equal(validateSelection(['a', 'a'], [{_key: 'a'}]), 'Each item can only be selected once.')
  assert.equal(validateMobileOrder(['desktop-note'], content), 'Mobile order cannot include desktop-only sections.')
  assert.equal(validateMobileOrder(contractFixture.mobileOrder, content), true)
  assert.equal(validatePair({leftImage: image('oldleft'), rightImage: image('oldright')}), true)
  assert.notEqual(validatePair({left: {image: image('one')}}), true)
  assert.equal(validateStatement({text: 'Legacy text'}), true)
  assert.equal(validateVideo({sourceType: 'unresolved', poster: image('poster')}), true)
  assert.notEqual(validateVideo({sourceType: 'url', videoFile: {asset: {_ref: 'file-id-mp4'}}}), true)
  assert.equal(validateDuration('01:24'), true)
  assert.notEqual(validateDuration('01:99'), true)
  assert.notEqual(validateDuration('00:00'), true)
  assert.deepEqual(selectKeys([{_key: 'a'}], ['bad']), [{_key: 'a'}])
  assert.deepEqual(contentForViewport(content, 'mobile', ['bad']).map(b => b._key), content.filter(b => b.visibility !== 'desktop').map(b => b._key))
})

test('all schema types compile locally with preserved legacy fields', () => {
  const compiled = Schema.compile({name: 'contract', types: schema.types})
  assert.ok(compiled.get('project'))
  const pair = compiled.get('imagePair') as {fields: {name: string}[]} | undefined
  assert.ok(pair?.fields.some(field => field.name === 'leftImage'))
  assert.ok(pair?.fields.some(field => field.name === 'left'))
})

test('GROQ archive ranks new records, falls back safely for legacy; route projects new fields and legacy content', async () => {
  const dataset = [
    {_type: 'project', _id: 'legacy', title: 'Old', year: 2026, slug: {current: 'old'}},
    {...contractFixture, _type: 'project'},
    {_type: 'project', _id: 'rank-two', orderRank: 2, title: 'Second', year: 2024},
  ]
  const ordered = await (await evaluate(parse(PROJECTS_QUERY), {dataset})).get() as Project[]
  assert.deepEqual(ordered.map(p => p._id), ['local-contract-fixture', 'rank-two', 'legacy'])
  const projected = await (await evaluate(parse(PROJECT_BY_SLUG_QUERY), {dataset, params: {slug: 'local-contract-fixture'}})).get() as Project
  assert.equal(projected.heroImage?.alt, 'desktophero')
  assert.deepEqual(projected.mobileOrder, contractFixture.mobileOrder)
  assert.equal(projected.content?.length, content.length)
  const real = await (await evaluate(parse(PROJECT_BY_SLUG_QUERY), {dataset: [{...legacy, _type: 'project'}], params: {slug: 'aster-house'}})).get() as Project
  assert.equal(documentFor(real).querySelectorAll('.project-image-pair img').length, 4)
  assert.ok(documentFor(real).querySelector('.project-module-label')?.textContent?.includes('Image + text'))
})
