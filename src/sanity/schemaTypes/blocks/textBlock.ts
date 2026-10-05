import {defineField, defineType} from 'sanity'
import {bodyField, labelField, visibilityField} from '../shared/fields'
import {DocumentTextIcon} from '@sanity/icons'
import {collapsed, mobileGuidance} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
export const textBlockType = defineType({
  name: 'textBlock', title: 'Text Block', type: 'object',
  icon: DocumentTextIcon,
  fields: [labelField, bodyField('body', true), visibilityField,
    defineField({name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed, fields: [bodyField()]}),
  ],
  preview: {select: {label: 'label', body: 'body', visibility: 'visibility'}, prepare: value => blockPreview('textBlock', value)},
})
