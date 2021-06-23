import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { fieldValidateRequire } from '../../utils/validators'
import { cx } from 'linaria'

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden' | 'time' | 'date'
  placeholder?: string
  id: string
  labelText?: string
  helperText?: React.ReactNode
  name: string
  dataTest?: string
  rightIcon?: React.ReactNode
  required?: boolean
  disabled?: boolean
  validate?: (value: string) => string | null
  maxLength?: number
  className?: string
}

export const Input = ({
  type,
  name,
  labelText,
  id,
  dataTest = '',
  placeholder = '',
  rightIcon,
  required = false,
  disabled = false,
  maxLength,
  validate = fieldValidateRequire,
  helperText,
  className = '',
}: InputProps) => (
  <Field name={name} validate={required ? validate : null}>
    {({ field, meta }: FieldProps<string | number>) => {
      const hasError = checkError(meta)
      const inputClassName = hasError ? 'input is-danger' : 'input is-primary'
      const defaultValue = ''
      return (
        <div className={cx('field', className)}>
          <div className={`control ${rightIcon ? 'has-icons-right' : ''}`}>
            {type !== 'hidden' && !rightIcon && labelText && (
              <label className={`label inline-block ${required ? 'required-label' : ''}`} htmlFor={id}>
                {labelText}
              </label>
            )}

            {helperText && (React.isValidElement(helperText) ? helperText : <p className="mb-3">{helperText}</p>)}

            <input
              disabled={disabled}
              data-test={dataTest}
              type={type}
              id={id}
              placeholder={placeholder}
              className={cx(inputClassName)}
              {...field}
              value={field.value || defaultValue}
              maxLength={maxLength}
            />
            {rightIcon && <span className="icon is-right">{rightIcon}</span>}
          </div>
          {hasError && (
            <div className="has-text-danger" data-test="input-error">
              {meta.error}
            </div>
          )}
        </div>
      )
    }}
  </Field>
)
