import {defineField, defineType} from 'sanity'
import {bodyField} from './shared/fields'
import {warnImageAlt} from './shared/validation'
import {InfoOutlineIcon} from '@sanity/icons'
import {organizeFields, warnPlaceholders} from './shared/editorial'
import {concise} from '../components/keyedOptions'
import {creator, warnContactEmail, warnSocialDestination} from '../../lib/creator'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    {name: 'intro', title: 'Intro', default: true}, {name: 'images', title: 'Images'},
    {name: 'biography', title: 'Biography'}, {name: 'capabilities', title: 'Capabilities'},
    {name: 'clients', title: 'Clients'}, {name: 'recognition', title: 'Recognition'},
    {name: 'contact', title: 'Contact'}, {name: 'mobile', title: 'Mobile'},
  ],
  fieldsets: [{name: 'plainCopy', title: 'Original statement', options: {collapsible: true, collapsed: true}}],
  validation: rule => rule.custom(warnPlaceholders).warning(),

  fields: organizeFields([
    defineField({name:'studioAddress',title:'Studio address label',type:'string',description:'Keep the supplied placeholder until a verified address is provided.'}),
    defineField({name:'pressEmail',title:'Press contact email',type:'string',validation:rule=>[rule.email().warning(),rule.custom(warnContactEmail).warning()]}),
    bodyField('statementBody'),
    bodyField('mobileStatementBody'),
    bodyField('mobileBio'),
    defineField({name:'primaryCaption', title:'Studio image caption', type:'string'}),
    defineField({name:'secondaryCaption', title:'Portrait caption', type:'string'}),
    defineField({name:'mobileClients', title:'Mobile selected clients', type:'array', of:[{type:'string'}]}),
    defineField({name:'capabilityItems', title:'Capabilities with descriptions', type:'array', of:[{name:'capability', type:'object', fields:[
      defineField({name:'title', title:'Capability', type:'string', validation:rule=>rule.required()}),
      defineField({name:'description', title:'Description', type:'text'}),
      defineField({name:'mobileDescription', title:'Mobile description', type:'text', description:'Optional. Leave empty to use the main description.'}),
    ], preview: {
      select: {title: 'title', description: 'description'},
      prepare({title, description}) {return {title: concise(title, 'Capability'), subtitle: concise(description, 'Add a short description')}}
    }}]}),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'About Morrow',
    }),

    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'primaryImage',
      title: 'Primary Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: rule => rule.custom((value, context) => warnImageAlt(value, context.parent)).warning(),
        }),
      ],
    }),

    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: rule => rule.custom((value, context) => warnImageAlt(value, context.parent)).warning(),
        }),
      ],
    }),

    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'clients',
      title: 'Selected Clients',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'recognition',
      title: 'Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name:'project', title:'Project label', type:'string'}),
            {
              name: 'title',
              title: 'Recognition',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year', project: 'project',
            },
            prepare({title, year, project}) {return {title: concise(title, 'Recognition'), subtitle: [year, project].filter(Boolean).join(' · ')}}
          },
        },
      ],
    }),

    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      initialValue: 'Let’s make something worth remembering.',
    }),

    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: creator.email,
      validation: rule => [rule.email().warning(), rule.custom(warnContactEmail).warning()],
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
                [rule.uri({
                  scheme: ['http', 'https'],
                }), rule.custom(warnSocialDestination).warning()],
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
  ], [
    {name: 'eyebrow', group: 'intro', title: 'Opening label'},
    {name: 'statementBody', group: 'intro', title: 'Studio statement', description: 'The opening statement, with optional emphasis.'},
    {name: 'statement', group: 'intro', title: 'Original plain statement', fieldset: 'plainCopy', description: 'Kept for the original page version. The website uses the formatted statement above when filled.', readOnly: ({document}) => Array.isArray(document?.statementBody) && document.statementBody.length > 0},
    {name: 'primaryImage', group: 'images', title: 'Studio image'},
    {name: 'primaryCaption', group: 'images', title: 'Studio image caption'},
    {name: 'secondaryImage', group: 'images', title: 'Portrait image'},
    {name: 'secondaryCaption', group: 'images', title: 'Portrait caption'},
    {name: 'bio', group: 'biography', title: 'Biography'},
    {name: 'capabilityItems', group: 'capabilities', title: 'Capabilities', description: 'Each capability has a title and a short description. Drag entries to change their order.'},
    {name: 'capabilities', group: 'capabilities', title: 'Simple capability list', description: 'Used when the detailed capabilities above are empty.', hidden: ({document}) => Array.isArray(document?.capabilityItems) && document.capabilityItems.length > 0},
    {name: 'clients', group: 'clients', title: 'Selected clients', description: 'Drag names to change their display order.'},
    {name: 'recognition', group: 'recognition', title: 'Recognition', description: 'Add the recognition title, year and related project. Drag entries to change their order.'},
    {name: 'contactHeading', group: 'contact', title: 'Contact heading', description: 'Retained for the original About contact composition. The current website uses the shared footer managed in Home.'},
    {name: 'contactEmail', group: 'contact', title: 'Project enquiries email', description: 'Retained compatibility field. Current public About contact comes from Home. Fictional morrow.studio actions use the approved creator contact without rewriting stored data.'},
    {name: 'pressEmail', group: 'contact', title: 'Press enquiries email', description: 'Retained compatibility field; no Press action is shown in the current shared footer. Use a genuine address or leave empty, not a fictional agency mailbox.'},
    {name: 'studioAddress', group: 'contact', title: 'Studio address', description: 'Fictional editorial content retained for the original About layout; not an actionable or verified creator address, and not used by the current shared footer.'},
    {name: 'socialLinks', group: 'contact', title: 'Additional social links', description: 'Retained compatibility field. Current About uses Home links. Approved creator links are centrally managed; generic platform homepages are omitted.'},
    {name: 'mobileStatementBody', group: 'mobile', title: 'Mobile studio statement', description: 'Optional. Leave empty to use the main studio statement.'},
    {name: 'mobileBio', group: 'mobile', title: 'Mobile biography', description: 'Optional. Leave empty to use the main biography.'},
    {name: 'mobileClients', group: 'mobile', title: 'Mobile selected clients', description: 'Optional. Use a shorter client list for small screens. Leave empty to use the main list.'},
  ]),

  preview: {
    prepare() {
      return {
        title: 'About', subtitle: 'Studio story, capabilities and contact details',
      }
    },
  },
})
