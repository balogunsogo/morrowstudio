import assert from 'node:assert/strict'
import {test} from 'node:test'
import {renderToStaticMarkup} from 'react-dom/server'
import {JSDOM} from 'jsdom'
import {PathnameContext} from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import SiteFooter from '@/components/site/SiteFooter'
import SiteNavigation from '@/components/home/SiteNavigation'
import MobileMenuDetails from '@/components/site/MobileMenuDetails'
import AboutContact from '@/components/about/AboutContact'
import {creator, contactEmail, creatorLinks, socialDestination, warnContactEmail, warnSocialDestination} from '@/lib/creator'
import {homepageType} from '@/sanity/schemaTypes/homepage'
import {aboutType} from '@/sanity/schemaTypes/about'

const roots = [{_key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/'}, {_key: 'arena', label: 'Are.na', url: 'https://www.are.na/'}, {_key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/'}]
const documentFor = (element: React.ReactNode) => new JSDOM(renderToStaticMarkup(<PathnameContext.Provider value="/">{element}</PathnameContext.Provider>)).window.document

test('creator identity is exact and fictional/invalid mailboxes resolve transparently to the creator', () => {
  assert.deepEqual(creator, {name: 'Oluwasogo Balogun', portfolio: 'https://www.balogunoluwasogo.com/', email: 'balogunoluwasogo@gmail.com', github: 'https://github.com/balogunsogo'})
  for (const value of ['hello@morrow.studio', 'studio@morrow.studio', 'PRESS@MORROW.STUDIO', 'enquiries@fiction.morrow.studio', '', undefined, 'bad', 'person@example.com?bcc=other@example.com']) assert.equal(contactEmail(value), creator.email)
  assert.equal(contactEmail(' team@example.com '), 'team@example.com')
  assert.equal(contactEmail('team+projects@example.com'), 'team+projects@example.com')
})

test('platform homepages are excluded; genuine CMS destinations survive and creator links are not repeated', () => {
  for (const value of ['https://instagram.com/?utm_source=test', 'https://www.are.na/#home', 'https://www.linkedin.com/', 'javascript:alert(1)']) assert.equal(socialDestination(value), undefined)
  const valid = { _key: 'real', label: 'Authored page', url: 'https://example.com/studio' }
  const links = creatorLinks([...roots, valid, {_key: 'duplicate', label: 'Portfolio', url: creator.portfolio}])
  assert.equal(links.length, 4)
  assert.equal(links[3].url, valid.url)
  assert.deepEqual(links.slice(0, 3).map(link => link.url), [creator.portfolio, `mailto:${creator.email}`, creator.github])
})

test('all shared footer variants credit the creator and pair actual displayed email with its destination', () => {
  for (const mode of [{}, {compact: true}, {archive: true}]) {
    const document = documentFor(<SiteFooter {...mode} email="hello@morrow.studio" generalEmail="studio@morrow.studio" socialLinks={roots} brand="Morrow Studio" />)
    assert.ok(document.querySelector('[data-creator-attribution]')?.textContent?.includes('MORROW STUDIO © 2026An independent digital concept.Designed & developed by Oluwasogo Balogun.'))
    assert.equal(document.querySelector('[data-creator-attribution] a')?.getAttribute('href'), creator.portfolio)
    const links = [...document.querySelectorAll('ul[aria-label="Creator links"] a')]
    assert.deepEqual(links.map(link => link.textContent), ['Portfolio', 'Email', 'GitHub'])
    assert.deepEqual(links.map(link => link.getAttribute('href')), [creator.portfolio, `mailto:${creator.email}`, creator.github])
    assert.ok(!document.body.textContent?.includes('@morrow.studio'))
    assert.equal(document.querySelector('a[href^="mailto:"]')?.textContent, creator.email)
    assert.equal(document.querySelectorAll('a[href^="mailto:"]').length, 2, 'Primary CTA plus the required creator Email link; no duplicate General action')
    assert.equal(document.querySelectorAll('a[href="https://www.instagram.com/"]').length, 0)
  }
})

test('valid CMS contact destinations are preserved rather than silently replaced', () => {
  const document = documentFor(<SiteFooter email="team@example.com" generalEmail="press@example.com" socialLinks={[{_key: 'real', label: 'Authored page', url: 'https://example.com/studio'}]} />)
  assert.equal(document.querySelector('a[href="mailto:team@example.com"]')?.textContent, 'team@example.com')
  assert.equal(document.querySelector('a[href="mailto:press@example.com"]')?.textContent, 'press@example.com')
  assert.ok(document.querySelector('a[href="https://example.com/studio"]'))
})

test('desktop/mobile navigation and retained About contact never expose fictional mailbox actions or generic socials', () => {
  const document = documentFor(<><SiteNavigation title="Morrow Studio" /><MobileMenuDetails home={{footerEmail: 'hello@morrow.studio', socialLinks: roots}} /><AboutContact email="hello@morrow.studio" pressEmail="press@morrow.studio" socialLinks={roots} /></>)
  const emails = [...document.querySelectorAll('a[href^="mailto:"]')]
  assert.ok(emails.length >= 4)
  assert.ok(emails.every(link => link.getAttribute('href') === `mailto:${creator.email}`))
  assert.ok(!document.body.textContent?.includes('@morrow.studio'))
  assert.equal(document.querySelectorAll('a[href="https://www.are.na/"]').length, 0)
})

test('editor guidance retains IDs/field types while exposing the shared-footer owner and warning on legacy destinations', () => {
  assert.notEqual(warnContactEmail('hello@morrow.studio'), true)
  assert.equal(warnContactEmail(creator.email), true)
  assert.equal(warnContactEmail('team@example.com'), true)
  assert.notEqual(warnSocialDestination('https://www.linkedin.com/'), true)
  assert.equal(warnSocialDestination(creator.github), true)
  const homeEmail = homepageType.fields.find(field => field.name === 'footerEmail')!
  assert.equal(homeEmail.type, 'string')
  assert.equal(homeEmail.initialValue, creator.email)
  assert.match(String(homeEmail.description), /stored values are not rewritten/)
  assert.match(String(aboutType.fields.find(field => field.name === 'contactEmail')!.description), /Current public About contact comes from Home/)
  assert.equal(homepageType.fields.find(field => field.name === 'socialLinks')!.type, 'array')
})
