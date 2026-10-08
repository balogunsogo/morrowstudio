import {defineField, defineType} from 'sanity'
import {mobileImageOverride, visibilityField} from '../shared/fields'
import {warnImageAlt} from '../shared/validation'
import {ImageIcon} from '@sanity/icons'
import {organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'

export const fullWidthImageType = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  icon: ImageIcon,

  fields: organizeFields([
    visibilityField,
    mobileImageOverride,
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: rule => rule.custom((value, context) => warnImageAlt(value, context.parent)).warning(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ], [{name: 'image'}, {name: 'alt', title: 'Alternative text', description: 'Describe the image for people using screen readers.'}, {name: 'caption'}, {name: 'visibility'}, {name: 'mobile'}]),
  preview: {select: {caption: 'caption', media: 'image', visibility: 'visibility'}, prepare: value => blockPreview('fullWidthImage', value)},
})
