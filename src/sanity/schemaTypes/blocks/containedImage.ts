import {defineField, defineType} from 'sanity'
import {mobileImageOverride, visibilityField} from '../shared/fields'
import {ImageIcon} from '@sanity/icons'
import {collapsed, organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'

export const containedImageType = defineType({
  name: 'containedImage',
  title: 'Contained Image',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [{name: 'display', title: 'Display settings', options: collapsed}],

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
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),

    defineField({
      name: 'size',
      title: 'Display Size',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    }),
  ], [{name: 'image'}, {name: 'alt', title: 'Alternative text', description: 'Describe the image for people using screen readers.'}, {name: 'caption'}, {name: 'size', fieldset: 'display'}, {name: 'alignment', fieldset: 'display'}, {name: 'visibility'}, {name: 'mobile'}]),
  preview: {select: {caption: 'caption', media: 'image', visibility: 'visibility'}, prepare: value => blockPreview('containedImage', value)},
})
