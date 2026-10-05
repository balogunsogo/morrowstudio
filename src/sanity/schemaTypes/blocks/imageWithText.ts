import {defineField, defineType} from 'sanity'
import {altField, bodyField, imageField, labelField, visibilityField} from '../shared/fields'
import {ComposeIcon} from '@sanity/icons'
import {collapsed, mobileGuidance} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
export const imageWithTextType = defineType({
  name: 'imageWithText', title: 'Image + Text', type: 'object',
  icon: ComposeIcon,
  fieldsets: [{name: 'display', title: 'Display settings', options: collapsed}],
  fields: [labelField, imageField('image', 'Image', true), altField, bodyField('body', true),
    defineField({name: 'layout', title: 'Image position', fieldset: 'display', type: 'string', initialValue: 'imageLeft',
      options: {list: [{title: 'Image Left / Text Right', value: 'imageLeft'}, {title: 'Text Left / Image Right', value: 'imageRight'}], layout: 'radio'},
    }), visibilityField,
    defineField({name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed, fields: [imageField(), altField, bodyField()]}),
  ],
  preview: {select: {label: 'label', body: 'body', media: 'image', visibility: 'visibility'}, prepare: value => blockPreview('imageWithText', value)},
})
