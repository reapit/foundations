import React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'

export type RadioSelectOption = {
  label: string | number
  value: string | number
}

export type RadioSelectProps = {
  name: string
  labelText?: string
  id: string
  dataTest?: string
  options: RadioSelectOption[]
}

export const RadioSelect: React.FC<RadioSelectProps> = ({ name, labelText, id, dataTest, options }) => {
  return (
    <Field type="radio" name={name}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        const className = hasError ? 'input is-danger' : ''
        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              {options.map(({ label, value }: RadioSelectOption, index: number) => (
                <div key={index} data-test={dataTest} className={className}>
                  <input
                    id={value as string}
                    className="checkbox"
                    type="radio"
                    key={value}
                    checked={field.value === value}
                    {...field}
                    value={value}
                  />
                  <label htmlFor={name}>{label}</label>
                </div>
              ))}
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

export default RadioSelect
