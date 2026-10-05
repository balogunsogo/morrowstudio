'use client'

import {createContext, useContext, useId} from 'react'
import {Box, Button, Flex, Select, Stack, Text} from '@sanity/ui'
import {isStringInputProps, set, unset, type ArrayInputFunctionsProps, type ArrayOfPrimitivesInputProps, type ArraySchemaType, type StringInputProps} from 'sanity'
import {availableOptions, resolveKey, type KeyedOption, type SelectionKind} from './keyedOptions'

type SelectionContext = {options: KeyedOption[]; selected: string[]; kind: SelectionKind; readOnly?: boolean}
const Context = createContext<SelectionContext>({options: [], selected: [], kind: 'section'})

export function KeyedChoiceInput({props, options, selected = [], kind}: {
  props: StringInputProps; options: KeyedOption[]; selected?: string[]; kind: SelectionKind
}) {
  const current = resolveKey(props.value, options, kind)
  const choices = availableOptions(options, selected, props.value)
  const metadataId = useId()
  const duplicate = !!props.value && selected.filter(key => key === props.value).length > 1
  const description = [props.elementProps['aria-describedby'], metadataId].filter(Boolean).join(' ')
  return <Stack space={2}>
    <Select {...props.elementProps} value={props.value ?? ''} disabled={props.readOnly}
      aria-label={props.schemaType.title || `Choose ${kind}`} aria-describedby={description}
      onChange={event => {
        const value = event.currentTarget.value
        if (!props.readOnly && choices.some(option => option.key === value)) props.onChange(set(value))
      }}>
      {!props.value && <option value="" disabled>Choose a {kind}…</option>}
      {!!props.value && !choices.some(option => option.key === props.value) && <option value={props.value}>{current.title}</option>}
      {choices.map(option => <option key={option.key} value={option.key}>{option.title}</option>)}
    </Select>
    <Box paddingX={2} paddingBottom={1} id={metadataId}>
      <Text size={0} muted>{current.subtitle}</Text>
      {(current.unavailable || duplicate) && <Box marginTop={2}><Text size={0} weight="medium">{duplicate ? 'Selected more than once; remove the duplicate.' : current.unavailable}</Text></Box>}
    </Box>
  </Stack>
}

function SelectedKeyInput(props: StringInputProps) {
  const context = useContext(Context)
  return <KeyedChoiceInput props={props} {...context} />
}

function KeyedArrayFunctions(props: ArrayInputFunctionsProps<string | number | boolean, ArraySchemaType>) {
  const {options, selected, kind} = useContext(Context)
  const available = availableOptions(options, selected)
  return <Select aria-label={`Add ${kind}`} disabled={props.readOnly || !available.length} value=""
    onChange={event => {
      const key = event.currentTarget.value
      if (!props.readOnly && available.some(option => option.key === key)) props.onItemAppend(key)
    }}>
    <option value="" disabled>{available.length ? `Select a ${kind} to add…` : `No more ${kind}s available`}</option>
    {available.map(option => <option key={option.key} value={option.key}>{option.title} · {option.subtitle}</option>)}
  </Select>
}

export default function KeyedOrderInput({props, options, kind}: {
  props: ArrayOfPrimitivesInputProps; options: KeyedOption[]; kind: SelectionKind
}) {
  const selected = (props.value ?? []).filter((value): value is string => typeof value === 'string')
  const inherited = props.value === undefined
  const eligible = availableOptions(options)
  return <Context.Provider value={{options, selected, kind, readOnly: props.readOnly}}>
    <Stack space={3}>
      <Flex gap={2} align="center" wrap="wrap">
        <Box flex={1}><Text size={1} muted>{inherited ? 'Using the default order from the main content.' : selected.length ? `${selected.length} selected · Drag rows to reorder.` : 'Empty selection · Nothing is shown on mobile.'}</Text></Box>
        <Button mode="ghost" fontSize={1} disabled={props.readOnly || (inherited && !eligible.length)}
          text={inherited ? 'Customize order' : 'Use default order'}
          onClick={() => {
            if (!props.readOnly) props.onChange(inherited ? set(eligible.map(option => option.key)) : unset())
          }} />
      </Flex>
      {props.renderDefault({...props, arrayFunctions: KeyedArrayFunctions,
        renderInput: inputProps => isStringInputProps(inputProps) ? <SelectedKeyInput {...inputProps} /> : props.renderInput(inputProps),
      })}
    </Stack>
  </Context.Provider>
}
