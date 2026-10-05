import {defineField, defineType} from 'sanity'
import {visibilityField} from '../shared/fields'
import {BlockquoteIcon} from '@sanity/icons'
import {collapsed, mobileGuidance, organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'

export const quoteBlockType = defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fieldsets: [{name: 'display', title: 'Display settings', options: collapsed}],

  fields: organizeFields([
    visibilityField,
    defineField({name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed, fields: [
      defineField({name: 'quote', title: 'Quote', type: 'text', rows: 5}),
      defineField({name: 'author', title: 'Author', type: 'string'}),
      defineField({name: 'role', title: 'Role / context', type: 'string'}),
    ]}),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'role',
      title: 'Role / Context',
      type: 'string',
    }),

    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
    }),
  ], [{name: 'quote'}, {name: 'author', title: 'Quoted person'}, {name: 'role', title: 'Role or context'}, {name: 'alignment', fieldset: 'display'}, {name: 'visibility'}, {name: 'mobile'}]),
  preview: {select: {quote: 'quote', author: 'author', role: 'role', visibility: 'visibility'}, prepare: value => blockPreview('quoteBlock', value)},
})
