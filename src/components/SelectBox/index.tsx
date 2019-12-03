import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'

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
}

export const SelectBox = ({ options, dataTest = '', labelText, id, name }: SelectBoxProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        const className = hasError ? 'input is-danger' : 'input is-primary'
        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
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
