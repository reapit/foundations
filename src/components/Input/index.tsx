import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden' | 'time'
  placeholder?: string
  id: string
  labelText?: string
  name: string
  dataTest?: string
  rightIcon?: React.ReactNode
  required?: boolean
}

export const requiredValidate = (value: string) => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

export const Input = ({
  type,
  name,
  labelText,
  id,
  dataTest = '',
  placeholder = '',
  rightIcon,
  required = false
}: InputProps) => (
  <Field name={name} validate={required ? requiredValidate : null}>
    {({ field, meta }: FieldProps<string | number>) => {
      const hasError = checkError(meta)
      const className = hasError ? 'input is-danger' : 'input is-primary'
      const defaultValue = ''
      return (
        <div className="field pb-4">
          <div className={`control ${rightIcon ? 'has-icons-right' : ''}`}>
            {type !== 'hidden' && !rightIcon && (
              <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
                {labelText}
              </label>
            )}
            <input
              data-test={dataTest}
              type={type}
              id={id}
              placeholder={placeholder}
              className={className}
              {...field}
              value={field.value || defaultValue}
            />
            {rightIcon && <span className="icon is-right">{rightIcon}</span>}
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
