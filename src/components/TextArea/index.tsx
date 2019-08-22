import * as React from 'react'
import { Field } from 'formik'

export interface TextAreaProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
  dataTest?: string
}

export const textareaPrimary = 'textarea is-primary'
export const textareaError = 'textarea is-danger'

export const TextArea = ({ name, labelText, id, dataTest, placeholder = '' }: TextAreaProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      const className = hasError ? textareaError : textareaPrimary
      return (
        <div className="field">
          <div className="control">
            <label className="label" htmlFor={id}>
              {labelText}
            </label>
            <textarea data-test={dataTest || ''} id={id} placeholder={placeholder} className={className} {...field} />
          </div>
          {hasError && (
            <div data-test="input-error" className="has-text-danger">
              {errors[field.name]}
            </div>
          )}
        </div>
      )
    }}
  />
)
