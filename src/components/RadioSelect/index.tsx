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
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  state: any
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  labelText,
  id,
  dataTest,
  options,
  setFieldValue,
  state
}) => {
  return (
    <Field type="radio" name={name}>
      {({ meta }: FieldProps<string>) => {
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
                    id={label as string}
                    className="checkbox"
                    type="radio"
                    key={value}
                    checked={state === value}
                    name={name}
                    value={value}
                    onChange={() => setFieldValue(name, value)}
                  />
                  <label htmlFor={label as string}>{label}</label>
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
