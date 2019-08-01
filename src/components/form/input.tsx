import * as React from 'react'
import { Field } from 'formik'
import bulma from '@/styles/vendor/bulma'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden'
  placeholder?: string
  id: string
  labelText: string
  name: string
  dataTest?: string
}

export const { input, hasTextDanger, control, isMedium, isRounded, isPrimary, isDanger, label } = bulma
export const bulmaField = bulma.field
export const inputBase = `${input}`
export const inputPrimary = `${inputBase} ${isPrimary}`
export const inputError = `${inputBase} ${isDanger}`

const Input = ({ type, name, labelText, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? inputError : inputPrimary
      return (
        <div className={`${bulmaField} pb-2`}>
          <div className={control}>
            {type !== 'hidden' && (
              <label className={label} htmlFor={id}>
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
