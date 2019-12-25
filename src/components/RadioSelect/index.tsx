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
  disabled?: boolean
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  labelText,
  id,
  dataTest,
  options,
  setFieldValue,
  state,
  disabled = false
}) => {
  return (
    <Field type="radio" name={name}>
      {({ meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              {options.map(({ label, value }: RadioSelectOption, index: number) => (
                <div key={index} data-test={dataTest} className="radio-wrap">
                  <input
                    id={label as string}
                    className={`checkbox ${hasError ? 'checkbox-error' : ''}`}
                    type="radio"
                    key={value}
                    checked={state === value}
                    name={name}
                    value={value}
                    disabled={disabled}
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
