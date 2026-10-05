import {defineArrayMember, defineField, defineType} from 'sanity'
import {selectionField, visibilityField} from '../shared/fields'
import {validateKeys} from '../shared/validation'
import {GalleryMobileOrderInput} from '../../components/MobileKeyInputs'
import {ImagesIcon} from '@sanity/icons'
import {collapsed, mobileGuidance, organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
import {concise} from '../../components/keyedOptions'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  fieldsets: [{name: 'display', title: 'Display settings', options: collapsed}, {name: 'mobileSelection', title: 'Mobile selection', options: collapsed}],

  fields: organizeFields([
    visibilityField,
    {...selectionField('mobileImageKeys', 'images', 'Mobile image selection', true), components: {input: GalleryMobileOrderInput}},
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            visibilityField,
            defineField({name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed, fields: [
              defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
              defineField({name: 'caption', title: 'Caption', type: 'string'}),
            ]}),
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: {caption: 'caption', alt: 'alt', visibility: 'visibility', media: 'asset'},
            prepare({caption, alt, visibility, media}) {return {title: concise(caption || alt, 'Gallery image'), subtitle: visibility === 'mobile' ? 'Mobile only' : visibility === 'desktop' ? 'Desktop only' : 'Desktop + mobile', media}}
          },
        }),
      ],
      validation: (rule) => rule.required().min(2).custom(validateKeys),
    }),

    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Strip', value: 'strip'},
          {title: 'Stack', value: 'stack'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ], [{name: 'images', description: 'Add at least two images. Give each a useful caption or alternative text, then drag to reorder.'}, {name: 'layout', title: 'Gallery layout', fieldset: 'display'}, {name: 'visibility'}, {name: 'mobileImageKeys', title: 'Images shown on mobile', fieldset: 'mobileSelection'}]),
  preview: {select: {images: 'images', mobileImageKeys: 'mobileImageKeys', media: 'images.0', visibility: 'visibility'}, prepare: value => blockPreview('gallery', value)},
})
