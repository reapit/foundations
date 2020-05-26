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
  subText?: string
  id: string
  dataTest?: string
  options: RadioSelectOption[]
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  state: any
  disabled?: boolean
  className?: string
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  labelText,
  subText,
  id,
  dataTest,
  options,
  setFieldValue,
  state,
  disabled = false,
  className,
}) => {
  return (
    <Field type="radio" name={name}>
      {({ meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        return (
          <div className={`field pb-2 ${className}`}>
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              {subText && <label className="subtext mb-2">{subText}</label>}
              {options.map(({ label, value }: RadioSelectOption, index: number) => (
                <div key={index} data-test={dataTest} className="radio-wrap">
                  <input
                    id={`${name}${label}`}
                    className={`checkbox ${hasError ? 'checkbox-error' : ''}`}
                    type="radio"
                    key={value}
                    checked={state === value}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={() => setFieldValue(name, value)}
                  />
                  <label htmlFor={`${name}${label}`}>{label}</label>
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
