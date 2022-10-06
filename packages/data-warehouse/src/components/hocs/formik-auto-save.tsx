import React from 'react'
import { connect } from 'formik'
import isEqual from 'lodash.isequal'
import { FormikContextType } from '@reapit/elements-legacy'

export const handleUseEffectToSetValueToCurrentRef = (value, ref) => {
  return () => {
    ref.current = value
  }
}

export const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(handleUseEffectToSetValueToCurrentRef(value, ref))
  return ref.current
}

export interface FormikContext {
  formik: FormikContextType<any>
}

export interface OwnProps {
  onSave: (values: any) => void
}

export type FormikAutoSaveProps = FormikContext & OwnProps

export const handleUseEffectToTriggerAutoSave = (previousValues, values, onSave) => {
  return () => {
    function save() {
      if (previousValues && Object.keys(previousValues).length && !isEqual(previousValues, values)) {
        onSave(values)
      }
    }
    save()
  }
}

export const FormikAutoSave: React.FC<FormikAutoSaveProps> = ({ formik: { values }, onSave }) => {
  const previousValues = usePrevious(values) || {}
  React.useEffect(handleUseEffectToTriggerAutoSave(previousValues, values, onSave), [onSave, previousValues, values])
  return null
}

export default connect<OwnProps, any>(FormikAutoSave as any)
