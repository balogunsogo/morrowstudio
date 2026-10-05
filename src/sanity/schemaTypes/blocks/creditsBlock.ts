import {defineArrayMember, defineField, defineType} from 'sanity'
import {selectionField, visibilityField} from '../shared/fields'
import {record, validateKeys, validateSelection} from '../shared/validation'
import {CreditMobileOrderInput, CreditOverrideTargetInput} from '../../components/MobileKeyInputs'
import {concise} from '../../components/keyedOptions'
import {UsersIcon} from '@sanity/icons'
import {collapsed, organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'

export const creditsBlockType = defineType({
  name: 'creditsBlock',
  title: 'Credits',
  type: 'object',
  icon: UsersIcon,
  fieldsets: [{name: 'mobileSelection', title: 'Mobile credits', options: collapsed}],

  fields: organizeFields([
    visibilityField,
    {...selectionField('mobileCreditKeys', 'items', 'Mobile credit selection'), components: {input: CreditMobileOrderInput}},
    defineField({name: 'mobileOverrides', title: 'Mobile credit wording', type: 'array',
      description: 'Optional. Choose a credit row and fill in only the role or name that should be different on mobile.',
      of: [defineArrayMember({name: 'creditOverride', type: 'object', fields: [
        defineField({name: 'creditKey', title: 'Credit row', type: 'string', components: {input: CreditOverrideTargetInput}, validation: rule => rule.required()}),
        defineField({name: 'role', title: 'Alternate role', type: 'string'}),
        defineField({name: 'name', title: 'Alternate name', type: 'string'}),
      ], preview: {
        select: {role: 'role', name: 'name'},
        prepare({role, name}) {
          return {title: concise([role, name].filter(Boolean).join(' — '), 'Mobile credit wording'),
            subtitle: 'Open to choose the credit row'}
        },
      }})],
      validation: rule => rule.custom((value, context) => {
        if (value === undefined) return true
        const ownKeys = validateKeys(value)
        return ownKeys === true
          ? validateSelection(value.map(item => record(item).creditKey), record(context.parent).items) : ownKeys
      }),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Credits',
    }),

    defineField({
      name: 'items',
      title: 'Credits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'role',
              subtitle: 'name',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).custom(validateKeys),
    }),
  ], [{name: 'title', title: 'Section heading'}, {name: 'items', title: 'Credit rows', description: 'List each collaborator’s role and name. Drag rows to set the display order.'}, {name: 'visibility'}, {name: 'mobileCreditKeys', title: 'Credits shown on mobile', fieldset: 'mobileSelection'}, {name: 'mobileOverrides', fieldset: 'mobileSelection'}]),
  preview: {select: {title: 'title', items: 'items', visibility: 'visibility'}, prepare: value => blockPreview('creditsBlock', value)},
})
