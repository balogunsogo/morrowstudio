import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageUseField, visibilityField} from '../shared/fields'
import {validatePair} from '../shared/validation'
import {ImagesIcon} from '@sanity/icons'
import {collapsed, mobileGuidance} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
export const imagePairType = defineType({
  name: 'imagePair', title: 'Image Pair', type: 'object',
  icon: ImagesIcon,
  fields: [imageUseField('left', true), imageUseField('right', true),
    defineField({name: 'sharedCaption', title: 'Shared caption', type: 'string'}), visibilityField,
    defineField({name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed, fields: [
      imageUseField('left'), imageUseField('right'),
      defineField({name: 'sharedCaption', title: 'Shared mobile caption', type: 'string'}),
      defineField({name: 'order', title: 'Mobile image order', type: 'array',
        description: 'Choose which image appears first on mobile. Use left and right once each.',
        of: [defineArrayMember({type: 'string', options: {list: [{title: 'Left image', value: 'left'}, {title: 'Right image', value: 'right'}]}})],
        validation: rule => rule.length(2).unique().custom(value => value === undefined ||
          (value.includes('left') && value.includes('right')) || 'Use left and right once each.'),
      }),
    ]}),
    ...(['leftImage', 'rightImage'] as const).map(name => defineField({
      name, title: name === 'leftImage' ? 'Original left image' : 'Original right image', type: 'image',
      options: {hotspot: true}, readOnly: true,
      hidden: ({value, parent}) => value === undefined || !!parent?.[name === 'leftImage' ? 'left' : 'right']?.image?.asset,
      deprecated: {reason: 'This original image is still in use. Ask the website team before replacing it with the image field above.'},
    })),
  ], validation: rule => rule.custom(validatePair),
  preview: {select: {sharedCaption: 'sharedCaption', left: 'left', right: 'right', media: 'left.image', legacyMedia: 'leftImage', visibility: 'visibility'}, prepare: value => blockPreview('imagePair', {...value, media: value.media || value.legacyMedia})},
})
