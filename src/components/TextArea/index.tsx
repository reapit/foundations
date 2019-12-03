import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'

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
  <Field name={name}>
    {({ field, meta }: FieldProps<string>) => {
      const hasError = checkError(meta)
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
              {meta.error}
            </div>
          )}
        </div>
      )
    }}
  </Field>
)
