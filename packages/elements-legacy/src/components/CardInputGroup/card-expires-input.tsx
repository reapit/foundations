import React, { useRef } from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { cx } from 'linaria'
import { InputProps } from '../Input'
import { formatCardExpires, validateCardExpires } from './card-helpers'

export type CardExpiresInputProps = Pick<
  InputProps,
  'name' | 'labelText' | 'id' | 'dataTest' | 'required' | 'disabled' | 'className'
>

export const CardExpiresInput = ({
  name,
  labelText,
  id,
  dataTest = '',
  required = true,
  disabled = false,
  className = '',
}: CardExpiresInputProps) => (
  <Field name={name} validate={required ? validateCardExpires : null}>
    {({ field, meta }: FieldProps<string | number>) => {
      const hasError = checkError(meta)
      const inputClassName = hasError ? 'input is-danger' : 'input is-primary'
      const defaultValue = ''
      const inputRef = useRef(null)

      return (
        <div className={cx('field', className)}>
          <div className="control">
            <label className={`label inline-block ${required ? 'required-label' : ''}`} htmlFor={id}>
              {labelText}
            </label>
            <input
              ref={inputRef}
              disabled={disabled}
              data-test={dataTest}
              type="text"
              inputMode="numeric"
              autoComplete="expiryDate"
              maxLength={7}
              id={id}
              placeholder="MM / YY"
              className={cx(inputClassName)}
              {...field}
              value={formatCardExpires(String(field.value), inputRef) || defaultValue}
            />
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
