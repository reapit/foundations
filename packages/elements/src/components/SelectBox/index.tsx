import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { fieldValidateRequire } from '../../utils/validators'

export interface SelectBoxOptions {
  label: string
  value: string
}

export interface SelectBoxProps {
  options: SelectBoxOptions[]
  dataTest?: string
  labelText: string
  name: string
  id: string
  required?: boolean
}

export const SelectBox = ({ options, dataTest = '', labelText, id, name, required = false }: SelectBoxProps) => {
  return (
    <Field name={name} validate={required ? fieldValidateRequire : null}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        const className = hasError ? 'input is-danger' : 'input is-primary'
        return (
          <div className="field pb-2">
            <div className="control">
              <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
                {labelText}
              </label>
              <select data-test={dataTest} className={className} {...field} value={field.value || ''}>
                {options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
                <option value="" disabled hidden>
                  Please select
                </option>
              </select>
            </div>
            {hasError && (
              <div className="has-text-danger" data-test="input-error">
                {meta.error}
              </div>
            )}
          </div>
        )
      }}
    </Field>
  )
}
