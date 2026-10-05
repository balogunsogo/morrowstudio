'use client'

import {useFormValue, type ArrayOfPrimitivesInputProps, type StringInputProps} from 'sanity'
import KeyedOrderInput, {KeyedChoiceInput} from './KeyedOrderInput'
import {canonicalOptions, creditOverrideCollectionPath, siblingCollectionPath, type SelectionKind} from './keyedOptions'

function MobileOrderInput({props, collection, kind}: {props: ArrayOfPrimitivesInputProps; collection: string; kind: SelectionKind}) {
  const canonical = useFormValue(siblingCollectionPath(props.path, collection))
  return <KeyedOrderInput props={props} options={canonicalOptions(canonical, kind)} kind={kind} />
}

export function MobileSectionOrderInput(props: ArrayOfPrimitivesInputProps) {
  return <MobileOrderInput props={props} collection="content" kind="section" />
}

export function GalleryMobileOrderInput(props: ArrayOfPrimitivesInputProps) {
  return <MobileOrderInput props={props} collection="images" kind="image" />
}

export function CreditMobileOrderInput(props: ArrayOfPrimitivesInputProps) {
  return <MobileOrderInput props={props} collection="items" kind="credit" />
}

export function CreditOverrideTargetInput(props: StringInputProps) {
  const path = creditOverrideCollectionPath(props.path)
  const canonical = useFormValue(path)
  return <KeyedChoiceInput props={props} options={canonicalOptions(path.length ? canonical : undefined, 'credit')} kind="credit" />
}
