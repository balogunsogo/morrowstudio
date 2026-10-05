import {defineArrayMember, defineField, defineType} from 'sanity'
import {visibilityField} from '../shared/fields'
import {validateKeys, validateStatement} from '../shared/validation'
import {TextIcon} from '@sanity/icons'
import {collapsed} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
export const largeStatementType = defineType({
  name: 'largeStatement', title: 'Large Statement', type: 'object',
  icon: TextIcon,
  fieldsets: [{name: 'display', title: 'Display settings', options: collapsed}],
  fields: [
    defineField({name: 'body', title: 'Statement', type: 'array',
      of: [defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: [],
        marks: {decorators: [{title: 'Muted emphasis', value: 'muted'}], annotations: []},
      })], validation: rule => rule.min(1).custom(validateKeys),
    }),
    defineField({name: 'text', title: 'Original statement', type: 'text', rows: 4,
      hidden: ({value, parent}) => value === undefined || (Array.isArray(parent?.body) && parent.body.length > 0), readOnly: true,
      deprecated: {reason: 'This original text is still in use. Ask the website team before replacing it with the statement above.'},
    }),
    defineField({name: 'alignment', title: 'Alignment', fieldset: 'display', type: 'string', initialValue: 'left',
      options: {list: ['left', 'center', 'right'], layout: 'radio'},
    }), visibilityField,
  ], validation: rule => rule.custom(validateStatement),
  preview: {select: {body: 'body', text: 'text', visibility: 'visibility'}, prepare: value => blockPreview('largeStatement', value)},
})
