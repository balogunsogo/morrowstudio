import assert from 'node:assert/strict'
import {test} from 'node:test'
import {renderToStaticMarkup} from 'react-dom/server'
import {JSDOM} from 'jsdom'
import type {PortableTextBlock} from '@portabletext/types'
import type {Homepage} from '@/components/home/types'
import AboutHero from '@/components/about/AboutHero'
import Capabilities from '@/components/about/Capabilities'
import Clients from '@/components/about/Clients'
import StudioStatement from '@/components/home/StudioStatement'
import HomePage from '@/components/home/HomePage'
import WorkIndex from '@/components/work/WorkIndex'
import ErrorPage from '@/app/error'
import NotFound from '@/app/not-found'
import {parseSiteUrl} from '@/lib/seo'
import {validateProjectSlug, warnImageAlt} from '@/sanity/schemaTypes/shared/validation'
import VideoBlock from '@/components/project/blocks/VideoBlock'
import {PathnameContext} from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import {imageConfigDefault} from 'next/dist/shared/lib/image-config'
import nextConfig from '../next.config'

const body: PortableTextBlock[] = [{_key: 'copy', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'text', _type: 'span', marks: [], text: 'Canonical formatted statement.'}]}]
imageConfigDefault.remotePatterns = nextConfig.images?.remotePatterns ?? []
const documentFor = (element: React.ReactNode) => new JSDOM(renderToStaticMarkup(<PathnameContext.Provider value="/">{element}</PathnameContext.Provider>)).window.document

test('formatted statements render when compatibility strings are empty', () => {
  const about = documentFor(<AboutHero body={body} />)
  assert.equal(about.querySelector('h1')?.textContent, 'Canonical formatted statement.')
  const studio = documentFor(<StudioStatement statementBody={body} />)
  assert.ok(studio.body.textContent?.includes('Canonical formatted statement.'))
})

test('canonical capabilities preserve titles and descriptions after reordering without a legacy list', () => {
  const details = [{_key: 'digital', title: 'Digital', description: 'Digital description.'}, {_key: 'identity', title: 'Identity', description: 'Identity description.'}]
  const document = documentFor(<Capabilities details={details} items={['Identity', 'Digital']} />)
  const rows = [...document.querySelectorAll('li')].map(el => el.textContent)
  assert.ok(rows[0]?.includes('DigitalDigital description.'))
  assert.ok(rows[1]?.includes('IdentityIdentity description.'))
  assert.equal(documentFor(<Capabilities details={details} />).querySelectorAll('li').length, 2)
  assert.ok(documentFor(<Capabilities items={['Legacy identity']} />).body.textContent?.includes('Legacy identity'))
})

test('responsive client lists have unambiguous landmark labels', () => {
  const document = documentFor(<><Clients items={['Main client']} /><Clients items={['Mobile client']} headingId="mobile-clients-heading" /></>)
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const section of document.querySelectorAll('section')) assert.ok(document.getElementById(section.getAttribute('aria-labelledby')!))
})

test('empty archive and homepage retain a main destination and page heading', () => {
  assert.equal(documentFor(<WorkIndex entries={[]} />).querySelector('h1')?.textContent, 'Work(00)')
  assert.equal(documentFor(<HomePage home={null} />).querySelector('main')?.id, 'main-content')
  assert.equal(documentFor(<HomePage home={null} />).querySelectorAll('h1').length, 1)
})

test('broken homepage dereferences and projects without slugs cannot crash the server render', () => {
  const home = {heroTitle: 'Morrow Studio', projectIndex: [null, {_id: 'missing-slug'}], mobileProjectIndex: [null], featuredProjects: [null]} as unknown as Homepage
  assert.doesNotThrow(() => HomePage({home}))
})

test('Home mobile index honors authored reorder/subsets independently of desktop membership', () => {
  const projects = ['first', 'second', 'third'].map(slug => ({_id: slug, title: slug, year: 2026, slug: {current: slug}}))
  const links = (home: Homepage, viewport: string) => [...documentFor(<HomePage home={home} />).querySelectorAll(`[data-index-viewport="${viewport}"] a`)].map(el => el.getAttribute('href'))
  const home = {heroTitle: 'Morrow Studio', projectIndex: projects} as Homepage
  assert.deepEqual(links(home, 'mobile'), ['/work/first', '/work/second', '/work/third'])
  assert.deepEqual(links({...home, mobileProjectIndex: []}, 'mobile'), links(home, 'mobile'))
  assert.deepEqual(links({...home, mobileProjectIndex: [projects[2], projects[0]]}, 'mobile'), ['/work/third', '/work/first'])
  assert.deepEqual(links({...home, mobileProjectIndex: [projects[1]]}, 'mobile'), ['/work/second'])
  assert.deepEqual(links({...home, mobileProjectIndex: [projects[2], projects[0]]}, 'desktop'), ['/work/first', '/work/second', '/work/third'])
  const outside = {_id: 'outside', title: 'Outside', year: 2026, slug: {current: 'outside'}}
  assert.deepEqual(links({...home, mobileProjectIndex: [outside]}, 'mobile'), ['/work/outside'])
  assert.deepEqual(links({...home, projectIndex: [], mobileProjectIndex: [outside]}, 'mobile'), ['/work/outside'])
})

test('unresolved film posters contain no playback controls, links or focusable media affordances', () => {
  const poster = {asset: {_ref: 'image-1234567890abcdef-1600x900-jpg'}}
  const document = documentFor(<VideoBlock sourceType="unresolved" poster={poster} title="Studio film" duration="01:00" caption="Film still." />)
  assert.ok(document.querySelector('[data-media-state="unresolved"] img'))
  assert.equal(document.querySelectorAll('video, audio, button, a, [role="button"], [tabindex]').length, 0)
  assert.equal(document.querySelector('figcaption')?.textContent, 'Film still.')
})

test('indexing URLs reject malformed input and credentials while normalizing a valid origin', () => {
  for (const value of [undefined, '', 'https://', 'not a URL', 'javascript:alert(1)']) assert.equal(parseSiteUrl(value), undefined)
  const credentialFixture = new URL('https://example.com')
  credentialFixture.username = 'fixture-user'
  credentialFixture.password = 'fixture-password'
  assert.equal(parseSiteUrl(credentialFixture.href), undefined)
  assert.equal(parseSiteUrl(' https://morrowstudio.balogunoluwasogo.com/path?q=1#hash ')?.href, 'https://morrowstudio.balogunoluwasogo.com/')
})

test('error and 404 recovery offer named, keyboard-operable routes without exposing error details', () => {
  const error = documentFor(<ErrorPage error={new Error('Private server detail')} retry={() => {}} />)
  assert.ok(!error.body.textContent?.includes('Private server detail'))
  assert.equal(error.querySelector('button')?.textContent, 'Try again')
  const missing = documentFor(<NotFound />)
  assert.equal(missing.querySelector('main')?.id, 'main-content')
  assert.ok(missing.querySelector('a[href="/work"]'))
})

test('editor validation catches broken page paths and prompts for image descriptions without blocking decorative choices', () => {
  for (const current of ['aster-house', 'case-2026', 'forma']) assert.equal(validateProjectSlug({current}), true)
  for (const current of ['../work', 'a/b', 'a?b', 'Aster House', 'a#b']) assert.notEqual(validateProjectSlug({current}), true)
  assert.equal(validateProjectSlug(undefined), true)
  const image = {asset: {_ref: 'image-reference'}}
  assert.notEqual(warnImageAlt('', image), true)
  assert.notEqual(warnImageAlt(undefined, {image}), true)
  assert.equal(warnImageAlt('An image description.', image), true)
  assert.equal(warnImageAlt(undefined, {}), true)
})
