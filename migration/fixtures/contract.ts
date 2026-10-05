import type {PortableTextBlock} from '@portabletext/types'
import type {Project, ProjectImage} from '@/components/project/types'

export const image = (identity: string): ProjectImage => ({
  _type: 'image', asset: {_type: 'reference', _ref: `image-${identity}-800x1000-jpg`}, alt: identity,
})
export const body = (text: string): PortableTextBlock[] => [{
  _type: 'block', _key: 'paragraph', style: 'normal', markDefs: [],
  children: [{_type: 'span', _key: 'copy', text, marks: []}],
}]

export const contractFixture: Project = {
  _id: 'local-contract-fixture', title: 'Local contract fixture', slug: {current: 'local-contract-fixture'}, year: 2026,
  sector: 'Culture', location: 'London', services: ['Art direction'], orderRank: 1,
  coverImage: image('cover'), heroImage: image('desktophero'), mobileHeroImage: image('mobilehero'),
  client: 'Long client label', mobileMetadata: {client: 'Short client', services: ['Identity']},
  mobileOrder: ['outcome', 'intro', 'pair', 'gallery', 'quote', 'credits', 'film', 'statement'],
  content: [
    {_key: 'intro', _type: 'textBlock', label: 'Overview', body: body('Desktop introduction.'), mobile: {body: body('Short mobile introduction.')}},
    {_key: 'desktop-note', _type: 'textBlock', visibility: 'desktop', label: 'Desktop note', body: body('Desktop-only details.')},
    {_key: 'outcome', _type: 'textBlock', visibility: 'mobile', label: 'Outcome', body: body('Outcome: [X]% of viewings now booked online.')},
    {_key: 'pair', _type: 'imagePair', left: {image: image('left'), alt: 'Canonical left', caption: 'Left caption'},
      right: {image: image('right'), alt: 'Canonical right', caption: 'Right caption'},
      mobile: {left: {image: image('replacement'), alt: 'Replacement left', caption: 'Replacement caption'}, order: ['right', 'left'], sharedCaption: 'Combined mobile caption'},
    },
    {_key: 'gallery', _type: 'gallery', layout: 'strip', images: [
      {...image('galleryone'), _key: 'one', alt: 'One'}, {...image('gallerytwo'), _key: 'two', alt: 'Two', mobile: {alt: 'Short alternate text'}},
      {...image('gallerymobile'), _key: 'mobile-image', alt: 'Mobile-only gallery member', visibility: 'mobile'},
    ], mobileImageKeys: ['mobile-image', 'two']},
    {_key: 'quote', _type: 'quoteBlock', quote: 'Canonical quote', author: 'Canonical author',
      mobile: {quote: 'Mobile quote', author: 'Mobile author', role: 'Short role'}},
    {_key: 'credits', _type: 'creditsBlock', title: 'Credits', items: [
      {_key: 'design', role: 'Design & development', name: 'Studio'}, {_key: 'photo', role: 'Photography', name: '[Photographer name]'},
    ], mobileCreditKeys: ['photo'], mobileOverrides: [{_key: 'photo-override', creditKey: 'photo', role: 'Images', name: '[Photographer]'}]},
    {_key: 'film', _type: 'videoBlock', sourceType: 'unresolved', poster: image('poster'), title: 'Reference film', duration: '01:24', caption: 'Supplied film caption'},
    {_key: 'statement', _type: 'largeStatement', body: [{...body('')[0], children: [
      {_type: 'span', _key: 'normal', text: 'Normal text, ', marks: []}, {_type: 'span', _key: 'muted', text: 'muted phrase.', marks: ['muted']},
    ]}]},
  ],
}
