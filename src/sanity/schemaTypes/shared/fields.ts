import {defineArrayMember, defineField} from 'sanity'
import {hasImage, record, validateKeys, validateMobileOrder, validateSelection, warnImageAlt} from './validation'
import {collapsed, mobileGuidance} from './editorial'

export const visibilityField = defineField({
  name: 'visibility', title: 'Device visibility', type: 'string', initialValue: 'all',
  description: 'Choose where this content appears. Most content should use Desktop + mobile.',
  options: {list: [{title: 'Desktop + mobile', value: 'all'}, {title: 'Desktop only', value: 'desktop'}, {title: 'Mobile only', value: 'mobile'}], layout: 'radio'},
  validation: rule => rule.custom(value => value === undefined || ['all', 'desktop', 'mobile'].includes(value)
    || 'Choose Desktop + mobile, Desktop only or Mobile only.'),
})

export const labelField = defineField({name: 'label', title: 'Section label', type: 'string', description: 'A short heading for this part of the story.'})

export function bodyField(name = 'body', required = false) {
  return defineField({
    name, title: name === 'body' ? 'Text' : name.charAt(0).toUpperCase()+name.slice(1).replace(/([A-Z])/g,' $1'), type: 'array',
    of: [defineArrayMember({
      type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading', value: 'h3'}],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}, {title: 'Muted emphasis', value: 'muted'}],
        annotations: [defineArrayMember({
          name: 'link', type: 'object', title: 'Link', fields: [defineField({
            name: 'href', type: 'url', title: 'URL',
            validation: rule => rule.uri({scheme: ['http', 'https', 'mailto']}),
          })],
        })],
      },
    })],
    validation: rule => required ? rule.required().min(1).custom(validateKeys) : rule.min(1).custom(validateKeys),
  })
}

export function imageField(name = 'image', title = 'Image', required = false) {
  return defineField({name, title, type: 'image', options: {hotspot: true},
    validation: rule => required ? rule.required() : rule,
  })
}

export function heroField(name: 'heroImage' | 'mobileHeroImage') {
  return defineField({
    name, title: name === 'heroImage' ? 'Case study hero image' : 'Mobile hero image',
    type: 'image', options: {hotspot: true},
    fields: [defineField({
      name: 'alt', title: 'Alternative text', type: 'string',
      validation: rule => rule.custom((value, context) =>
        hasImage(context.parent) && !(typeof value === 'string' && value.trim())
          ? 'Describe this hero image in alternative text so everyone can understand it.' : true),
    })],
  })
}

export const altField = defineField({name: 'alt', title: 'Alternative text', type: 'string', description: 'Describe the image for people using screen readers. This is separate from the visible caption.', validation: rule => rule.custom((value, context) => warnImageAlt(value, context.parent)).warning()})
export const captionField = defineField({name: 'caption', title: 'Caption', type: 'string'})

export function imageUseField(name: string, required = false) {
  return defineField({name, title: name === 'left' ? 'Left image' : 'Right image', type: 'object',
    fields: [imageField('image', 'Image', required), altField, captionField],
  })
}

export function selectionField(name: string, collection: string, title: string, mobileOnly = false) {
  return defineField({name, title, type: 'array',
    description: 'Choose the items shown on mobile and drag to set their order. Use the default order to follow the main content; an empty selection shows none.',
    of: [defineArrayMember({type: 'string'})],
    validation: rule => rule.custom((value, context) =>
      (mobileOnly ? validateMobileOrder : validateSelection)(value, record(context.parent)[collection])),
  })
}

export const mobileImageOverride = defineField({
  name: 'mobile', title: 'Mobile version', type: 'object', description: mobileGuidance, options: collapsed,
  fields: [imageField(), altField, captionField],
})
