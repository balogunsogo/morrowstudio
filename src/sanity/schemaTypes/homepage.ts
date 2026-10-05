import {defineField, defineType} from 'sanity'
import {bodyField} from './shared/fields'
import {HomeIcon} from '@sanity/icons'
import {organizeFields, warnPlaceholders} from './shared/editorial'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'featured', title: 'Featured Work'},
    {name: 'studio', title: 'Studio'},
    {name: 'index', title: 'Project Index'},
    {name: 'footer', title: 'Footer'},
    {name: 'mobile', title: 'Mobile'},
  ],
  validation: rule => rule.custom(warnPlaceholders).warning(),

  fields: organizeFields([
    defineField({name:'mobileProjectIndex',title:'Mobile index selection',description:'Optional ordered selection from the mobile export; the full Work archive still lists every project.',type:'array',of:[{type:'reference',to:[{type:'project'}]}],validation:rule=>rule.unique()}),
    defineField({name:'generalEmail',title:'General contact email',type:'string'}),
    defineField({name:'studioHours',title:'Studio location and hours',type:'string'}),
    defineField({name:'established', title:'Established label', type:'string'}),
    defineField({name:'availability', title:'Availability label', type:'string'}),
    defineField({name:'mobileHeroIntro', title:'Mobile introduction', type:'text'}),
    bodyField('studioBody'),
    bodyField('studioStatementBody'),
    defineField({name:'studioCapabilities',title:'Studio capability labels',type:'array',of:[{type:'string'}]}),
    defineField({name:'archiveIntro', title:'Work archive introduction', type:'text'}),
    defineField({name:'projectIndex', title:'Full project index', type:'array', description:'Curated references for the full Home index, independent of the six featured projects.', of:[{type:'reference', to:[{type:'project'}]}], validation:rule=>rule.unique()}),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Independent creative practice',
    }),

    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Morrow Studio',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'heroIntro',
      title: 'Hero Intro',
      type: 'text',
      rows: 3,
    }),

      defineField({
          name: 'heroImage',
          title: 'Hero Image',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'London / Worldwide',
    }),

    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name:'description',title:'Short project description',type:'string',description:'Optional wording shown with this project on Home. This does not change its Work filters.'}),
            defineField({
              name: 'project',
              title: 'Project',
              type: 'reference',
              to: [{type: 'project'}],
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'layout',
              title: 'Image size on Home',
              description: 'Choose how this project image fits the featured-work section. Preview the result in Presentation.',
              type: 'string',
              initialValue: 'large',
              options: {
                list: [
                  {title: 'Large image', value: 'large'},
                  {title: 'Small image', value: 'small'},
                  {title: 'Full-width image', value: 'full'},
                  {title: 'Paired image', value: 'pair'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
          ],

          preview: {
            select: {
              title: 'project.title',
              layout: 'layout',
              description: 'description',
              media: 'project.coverImage',
            },
            prepare({title, layout, description, media}) {
              const labels: Record<string, string> = {large: 'Large image', small: 'Small image', full: 'Full-width image', pair: 'Paired image'}
              return {title: title || 'Choose a project', subtitle: [labels[layout], description].filter(Boolean).join(' · '), media}
            },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),

    defineField({
      name: 'studioStatement',
      title: 'Studio Statement',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'projectIndexHeading',
      title: 'Project Index Heading',
      type: 'string',
      initialValue: 'Selected Work',
    }),

    defineField({
      name: 'footerHeading',
      title: 'Footer Heading',
      type: 'string',
      initialValue: 'Let’s work together.',
    }),

    defineField({
      name: 'footerEmail',
      title: 'Footer Email',
      type: 'string',
      initialValue: 'hello@morrow.studio',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),

    defineField({
      name: 'footerLocation',
      title: 'Footer Location',
      type: 'string',
      initialValue: 'London / Worldwide',
    }),
  ], [
    {name: 'heroEyebrow', group: 'hero', title: 'Opening label', description: 'The short line above the studio name.'},
    {name: 'heroTitle', group: 'hero', title: 'Studio name'},
    {name: 'heroIntro', group: 'hero', title: 'Introduction'},
    {name: 'heroImage', group: 'hero', title: 'Opening image'},
    {name: 'location', group: 'hero', title: 'Location'},
    {name: 'availability', group: 'hero', title: 'Availability', description: 'Tell visitors whether the studio is taking on new work.'},
    {name: 'established', group: 'hero', title: 'Established line'},
    {name: 'featuredProjects', group: 'featured', title: 'Featured projects', description: 'Choose up to six projects and drag to change their order. These selections are separate from the full project index.'},
    {name: 'studioStatementBody', group: 'studio', title: 'Studio statement', description: 'The main studio statement, with optional emphasis.'},
    {name: 'studioStatement', group: 'studio', title: 'Plain studio statement', description: 'Used when the formatted studio statement is empty.', hidden: ({document}) => Array.isArray(document?.studioStatementBody) && document.studioStatementBody.length > 0},
    {name: 'studioBody', group: 'studio', title: 'Supporting studio copy'},
    {name: 'studioCapabilities', group: 'studio', title: 'Services and capabilities'},
    {name: 'projectIndexHeading', group: 'index', title: 'Index heading'},
    {name: 'projectIndex', group: 'index', title: 'Projects in the Home index', description: 'Choose projects and drag to set their order in the Home index. The Work archive uses each project’s Project order.'},
    {name: 'archiveIntro', group: 'index', title: 'Work archive introduction', description: 'Opening copy on the Work page.'},
    {name: 'footerHeading', group: 'footer', title: 'Contact heading'},
    {name: 'footerEmail', group: 'footer', title: 'Project enquiries email'},
    {name: 'generalEmail', group: 'footer', title: 'General enquiries email'},
    {name: 'socialLinks', group: 'footer', title: 'Social links'},
    {name: 'footerLocation', group: 'footer', title: 'Footer location'},
    {name: 'studioHours', group: 'footer', title: 'Studio location and hours'},
    {name: 'mobileHeroIntro', group: 'mobile', title: 'Mobile introduction', description: 'Optional. Leave empty to use the main introduction.'},
    {name: 'mobileProjectIndex', group: 'mobile', title: 'Projects in the mobile Home index', description: 'Optional. Choose a shorter selection for small screens, in display order. Leave empty to use the main Home index.'},
  ]),

  preview: {
    prepare() {
      return {
        title: 'Home', subtitle: 'Opening page, featured work and contact details',
      }
    },
  },
})
