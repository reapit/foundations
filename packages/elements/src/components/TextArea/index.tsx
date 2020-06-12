import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'

export interface TextAreaProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
  dataTest?: string
  validate?: (value: string) => string | null
  required?: boolean
}

export const textareaPrimary = 'textarea is-primary'
export const textareaError = 'textarea is-danger'

export const TextArea = ({
  name,
  labelText,
  id,
  dataTest,
  placeholder = '',
  required = false,
  validate,
}: TextAreaProps) => (
  <Field name={name} validate={required ? validate : null}>
    {({ field, meta }: FieldProps<string>) => {
      const hasError = checkError(meta)
      const className = hasError ? textareaError : textareaPrimary
      return (
        <div className="field">
          <div className="control">
            <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
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
