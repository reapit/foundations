import * as React from 'react'
import { Field } from 'formik'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden' | 'time'
  placeholder?: string
  id: string
  labelText?: string
  name: string
  dataTest?: string
  value?: string | number | null
  onChange?: () => void
}

export const Input = ({ type, name, labelText, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? 'input is-danger' : 'input is-primary'
      return (
        <div className="field pb-4">
          <div className="control">
            {type !== 'hidden' && (
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
            )}
            <input
              data-test={dataTest || ''}
              type={type}
              id={id}
              placeholder={placeholder}
              className={className}
              {...field}
            />
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
