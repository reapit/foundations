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
  rightIcon?: React.ReactNode
}

export const Input = ({ type, name, labelText, id, dataTest, placeholder = '', rightIcon }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? 'input is-danger' : 'input is-primary'
      return (
        <div className="field pb-4">
          <div className={`control ${rightIcon ? 'has-icons-right' : ''}`}>
            {type !== 'hidden' && !rightIcon && (
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
            {rightIcon && <span className="icon is-right">{rightIcon}</span>}
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
