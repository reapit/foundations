import * as React from 'react'
import { Field } from 'formik'

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
  value?: string | number | null
  onChange?: () => void
}

export const SelectBox = ({ options, dataTest, labelText, id, name }: SelectBoxProps) => {
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }) => {
        const hasError = touched[field.name] && errors[field.name]
        const className = hasError ? 'input is-danger' : 'input is-primary'
        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              <select data-test={dataTest || ''} className={className} {...field}>
                {options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
                <option value="" selected disabled hidden>
                  Please choose
                </option>
              </select>
            </div>
            {hasError && (
              <div className="has-text-danger" data-test="input-error">
                {errors[field.name]}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
