import * as React from 'react'
import { Field, FieldProps, FieldInputProps } from 'formik'

export interface CheckboxProps {
  id: string
  labelText: string
  name: string
  dataTest?: string
  value?: string
}

export type HandleCheckboxOnChangeParams = {
  field: FieldInputProps<string | string[]>
  value: string
}

export const handleOnCheckboxChange = ({ field, value }: HandleCheckboxOnChangeParams) => () => {
  const isExistedInArray = Array.isArray(field.value) && field.value.includes(value)
  if (Array.isArray(field.value) && isExistedInArray) {
    const nextValue = field.value.filter(item => item !== value)
    field.onChange({ target: { value: nextValue, name: field.name } })
    return
  }
  if (Array.isArray(field.value)) {
    const nextValue = field.value.concat(value)
    field.onChange({ target: { value: nextValue, name: field.name } })
    return
  }
  field.onChange({ target: { value: !field.value, name: field.name, checked: !field.checked } })
  return
}

export const Checkbox = ({ name, labelText, id, dataTest = '', value = '' }: CheckboxProps) => {
  return (
    <div className="field pb-4">
      <div className="control">
        <Field type="checkbox" name={name}>
          {({ field }: FieldProps<string | string[]>) => {
            return (
              <div className="field field-checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  id={id}
                  data-test={dataTest}
                  checked={Array.isArray(field.value) ? field.value.includes(value) : field.checked}
                  value={value}
                  onChange={handleOnCheckboxChange({ field, value })}
                />
                <label className="label" htmlFor={id}>
                  {labelText}
                </label>
              </div>
            )
          }}
        </Field>
      </div>
    </div>
  )
}
