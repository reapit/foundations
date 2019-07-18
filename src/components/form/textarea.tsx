import * as React from 'react'
import { Field } from 'formik'
import bulma from '@/styles/vendor/bulma'

export interface InputProps {
  placeholder?: string
  id: string
  label: string
  name: string
  dataTest?: string
}

const { textarea, hasTextDanger, isPrimary, isDanger, isMedium, control } = bulma
export const bulmaField = bulma.field

export const textareaBase = `${textarea} ${isMedium}`
export const textareaPrimary = `${textareaBase} ${isPrimary}`
export const textareaError = `${textareaBase} ${isDanger}`

const TextArea = ({ name, label, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? textareaError : textareaPrimary
      return (
        <div className={bulmaField}>
          <div className={control}>
            <label htmlFor={id}>{label}</label>
            <textarea data-test={dataTest || ''} id={id} placeholder={placeholder} className={className} {...field} />
          </div>
          {hasError && (
            <div data-test="input-error" className={hasTextDanger}>
              {errors[field.name]}
            </div>
          )}
        </div>
      )
    }}
  />
)

export default TextArea
