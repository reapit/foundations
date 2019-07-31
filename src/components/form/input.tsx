import * as React from 'react'
import { Field } from 'formik'
import bulma from '@/styles/vendor/bulma'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden'
  placeholder?: string
  id: string
  label: string
  name: string
  dataTest?: string
}

export const { input, hasTextDanger, control, isMedium, isRounded, isPrimary, isDanger } = bulma
export const bulmaField = bulma.field
export const inputBase = `${input} ${isMedium} ${isRounded}`
export const inputPrimary = `${inputBase} ${isPrimary}`
export const inputError = `${inputBase} ${isDanger}`

const Input = ({ type, name, label, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? inputError : inputPrimary
      return (
        <div className={bulmaField}>
          <div className={control}>
            {type !== 'hidden' && <label htmlFor={id}>{label}</label>}
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
            <div className={hasTextDanger} data-test="input-error">
              {errors[field.name]}
            </div>
          )}
        </div>
      )
    }}
  />
)

export default Input
