import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { cx } from 'linaria'
import { checkError } from '../../utils/form'
import { LayoutProps } from '../Layout'

export type TextAreaProps = {
  placeholder?: string
  id: string
  labelText?: string
  name: string
  dataTest?: string
  validate?: (value: string) => string | null
  required?: boolean
} & LayoutProps

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
      const className = cx(hasError ? textareaError : textareaPrimary)
      const labelClassname = cx('label', required && 'required-label')
      return (
        <div className={`field ${className}`}>
          <div className="control">
            {labelText && (
              <label className={labelClassname} htmlFor={id}>
                {labelText}
              </label>
            )}
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
