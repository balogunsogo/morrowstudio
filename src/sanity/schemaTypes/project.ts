import {defineArrayMember, defineField, defineType} from 'sanity'
import {bodyField, heroField} from './shared/fields'
import {validateKeys, validateMobileOrder} from './shared/validation'
import {MobileSectionOrderInput} from '../components/MobileKeyInputs'
import {DocumentsIcon} from '@sanity/icons'
import {collapsed, mobileGuidance, organizeFields, warnPlaceholders} from './shared/editorial'
import {projectPreview} from './shared/previews'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'archive', title: 'Archive'},
    {name: 'caseStudy', title: 'Case Study'},
    {name: 'mobile', title: 'Mobile'},
  ],
  validation: rule => rule.custom(warnPlaceholders).warning(),

  fields: organizeFields([
    {...bodyField('summaryBody'), title: 'Summary with emphasis', description: 'Optional rich version of the summary; the plain summary still drives SEO and archive descriptions.'},
    defineField({name: 'sector', title: 'Sector', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'services', title: 'Services', type: 'array',
      description: 'Ordered editorial labels, separate from archive filter disciplines.',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'orderRank', title: 'Archive order', type: 'number',
      description: 'Unique authored order, conventionally 1–10.',
      validation: rule => rule.required().integer().positive().custom(async (value, context) => {
        if (typeof value !== 'number') return true
        const id = context.document?._id?.replace(/^drafts\./, '')
        if (!id) return true
        const count = await context.getClient({apiVersion: '2026-03-01'}).withConfig({perspective: 'raw'}).fetch<number>(
          'count(*[_type == "project" && orderRank == $rank && !(_id in [$id, $draft]) && !(_id in path("versions.**"))])',
          {rank: value, id, draft: `drafts.${id}`},
        )
        return count === 0 || 'Another project already uses this project order. Choose a different number.'
      }),
    }),
    heroField('heroImage'),
    heroField('mobileHeroImage'),
    defineField({name: 'mobileMetadata', title: 'Mobile editorial metadata', type: 'object',
      description: mobileGuidance, options: collapsed,
      fields: [
        defineField({name: 'client', title: 'Short client label', type: 'string'}),
        defineField({name: 'services', title: 'Short service labels', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(2000).max(2100),
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),

    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
        name: 'content',
        title: 'Case Study Content',
        type: 'array',
        of: [
            { type: 'fullWidthImage' },
            { type: 'textBlock' },
            { type: 'imagePair' },
            { type: 'containedImage' },
            {type: 'largeStatement'},
            {type: 'imageWithText'},
            {type: 'gallery'},
            {type: 'quoteBlock'},
            {type: 'creditsBlock'},
            {type: 'videoBlock'},
        ],
        validation: rule => rule.custom(validateKeys),
    }),
    defineField({name: 'mobileOrder', title: 'Mobile section order', type: 'array',
      components: {input: MobileSectionOrderInput},
      description: 'Stable content block keys. Unset keeps canonical order; empty omits all body sections.',
      of: [defineArrayMember({type: 'string'})],
      validation: rule => rule.custom((value, context) => validateMobileOrder(value, context.document?.content)),
    }),
  ], [
    {name: 'title', group: 'overview', title: 'Project title'},
    {name: 'slug', group: 'overview', title: 'Page address', description: 'The final part of the project web address. Changing an existing address can break shared links; ask the website team first.'},
    {name: 'year', group: 'overview'},
    {name: 'client', group: 'overview'},
    {name: 'sector', group: 'overview'},
    {name: 'location', group: 'overview'},
    {name: 'summary', group: 'overview', title: 'Short project summary', description: 'Used in project listings and search descriptions. Keep this brief, even if you also use the formatted summary.'},
    {name: 'summaryBody', group: 'overview', title: 'Formatted project summary', description: 'Optional version with emphasis for the project page. Leave empty to use the short project summary.'},
    {name: 'orderRank', group: 'overview', title: 'Project order', description: 'Controls where this project appears in the Work archive and project sequence. Give each project a different number.'},
    {name: 'coverImage', group: 'archive', title: 'Archive cover image', description: 'Shown in the Work archive and Home project listings. Add alternative text to describe the image.'},
    {name: 'disciplines', group: 'archive', title: 'Archive filters', description: 'Used by the Work page filters. Keep labels consistent across projects.'},
    {name: 'heroImage', group: 'caseStudy', title: 'Case study hero image', description: 'The main image at the top of this project. Leave empty to use the archive cover image.'},
    {name: 'services', group: 'caseStudy', title: 'Services shown on project page', description: 'Add the services delivered for this project, in the order they should appear.'},
    {name: 'content', group: 'caseStudy', title: 'Case study sections', description: 'Add, open and drag sections to shape the story. Use Presentation to check your changes before publishing.'},
    {name: 'mobileHeroImage', group: 'mobile', title: 'Mobile hero image', description: 'Optional. Replaces the desktop hero on small screens.'},
    {name: 'mobileMetadata', group: 'mobile', title: 'Mobile project labels'},
    {name: 'mobileOrder', group: 'mobile', title: 'Mobile section order', description: 'Choose which case-study sections appear on mobile and in what order. Use the default order to follow the main sections; an empty selection shows none.'},
  ]),

  preview: {
    select: {
              title: 'title',
              rank: 'orderRank',
              sector: 'sector',
              year: 'year',
      media: 'coverImage',
      },
      prepare: projectPreview,
  },
})
