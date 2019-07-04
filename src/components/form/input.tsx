import * as React from 'react'
import { Field } from 'formik'
import bulma from '@/styles/vendor/bulma.scss'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel'
  placeholder?: string
  id: string
  label: string
  name: string
  dataTest?: string
}

export const { input, control } = bulma
export const bulmaField = bulma.field
export const inputBase = `${input} ${bulma['is-medium']} ${bulma['is-rounded']}`
export const inputPrimary = `${inputBase} ${bulma['is-primary']}`
export const inputError = `${inputBase} ${bulma['is-danger']}`

const Input = ({ type, name, label, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? inputError : inputPrimary
      return (
        <div className={bulmaField}>
          <div className={control}>
            <label htmlFor={id}>{label}</label>
            <input
              data-test={dataTest || ''}
              type={type}
              id={id}
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </div>
          {hasError && <div data-test="input-error">{errors[field.name]}</div>}
        </div>
      )
    }}
  />
)

export default Input
