import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { fieldValidateRequire } from '../../utils/validators'
import { cx } from 'linaria'

export interface SelectBoxOptions {
  label: string
  value: string
}

export interface SelectBoxProps {
  options: SelectBoxOptions[]
  dataTest?: string
  labelText?: string
  name: string
  id: string
  required?: boolean
  helpText?: string
  className?: string
  containerClassName?: string
}

export const SelectBox = ({
  options,
  dataTest = '',
  labelText,
  id,
  name,
  required = false,
  helpText,
  className = '',
  containerClassName = '',
}: SelectBoxProps) => {
  return (
    <Field name={name} validate={required ? fieldValidateRequire : null}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
        const calculatedClassName = (hasError ? 'input is-danger' : 'input is-primary') + ' ' + className
        return (
          <div className={cx('field', containerClassName)}>
            <div className="control">
              {labelText && (
                <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
                  {labelText}
                </label>
              )}
              {helpText && <i className="mb-2 inline-block">{helpText}</i>}
              <select data-test={dataTest} className={calculatedClassName} {...field} value={field.value || ''}>
                {options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
                <option value="" disabled hidden>
                  Please select
                </option>
              </select>
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
}
