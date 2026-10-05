// Test-only form adapter. All edits stay in browser memory; this does not
// recreate or claim to test Sanity's native array drag/drop implementation.
import {PatchEvent, type ArrayOfPrimitivesInputProps, type StringInputProps} from 'sanity'
import type {ComponentProps, ReactNode} from 'react'

export function stringProps(value: string | undefined, onChange: StringInputProps['onChange'] = () => {}, readOnly = false): StringInputProps {
  return {value, onChange, readOnly, schemaType: {name: 'string', jsonType: 'string', title: 'Selected item'},
    elementProps: {id: 'key-choice', ref: {current: null}}, path: [], validation: [], presence: [], renderDefault: () => null,
  } as unknown as StringInputProps
}

export function arrayProps(value: string[] | undefined, update: (value: string[] | undefined) => void = () => {}, readOnly = false): ArrayOfPrimitivesInputProps {
  const props = {value, readOnly, path: ['mobileOrder'], schemaType: {name: 'array', jsonType: 'array', of: [{name: 'string', jsonType: 'string'}]},
    members: [], validation: [], presence: [], elementProps: {id: 'key-array', ref: {current: null}},
    onChange: (change: Parameters<ArrayOfPrimitivesInputProps['onChange']>[0]) => {
      for (const patch of PatchEvent.from(change).patches) {
        if (patch.type === 'unset') update(undefined)
        if (patch.type === 'set') update(patch.value as string[])
      }
    },
    onItemAppend: (key: string) => update([...(value ?? []), key]),
    onItemRemove: (index: number) => update((value ?? []).filter((_, i) => i !== index)),
    onMoveItem: ({fromIndex, toIndex}: {fromIndex: number; toIndex: number}) => {
      const next = [...(value ?? [])]
      const [key] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, key)
      update(next)
    },
    renderInput: () => null, renderItem: () => null,
    renderDefault: (native: ArrayOfPrimitivesInputProps): ReactNode => {
      const Functions = native.arrayFunctions!
      return <div>
        {(value ?? []).map((key, index) => <div data-row={index} key={index} style={{display: 'flex', gap: 12, paddingBottom: 10}}>
          {native.renderInput(stringProps(key, change => {
            for (const patch of PatchEvent.from(change).patches) if (patch.type === 'set') {
              const next = [...(value ?? [])]; next[index] = patch.value as string; update(next)
            }
          }, readOnly))}
          <button disabled={readOnly || index === 0} onClick={() => native.onMoveItem({fromIndex: index, toIndex: index - 1})}>Move up</button>
          <button disabled={readOnly} onClick={() => native.onItemRemove(index)}>Remove</button>
        </div>)}
        <Functions {...({readOnly, value, onItemAppend: props.onItemAppend} as unknown as ComponentProps<typeof Functions>)} />
      </div>
    },
  } as unknown as ArrayOfPrimitivesInputProps
  return props
}
