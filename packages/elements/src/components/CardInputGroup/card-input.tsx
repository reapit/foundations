import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Field, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { cx } from 'linaria'
import { InputProps } from '../Input'
import { FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import { CardType, formatCardNumber, getCardType, handleValidateCard } from './card-helpers'

export type CardInputProps = Pick<
  InputProps,
  'name' | 'labelText' | 'id' | 'dataTest' | 'required' | 'disabled' | 'className'
> & {
  whiteListTestCard?: string
  setCardType?: Dispatch<SetStateAction<CardType>>
  cardType?: CardType
}

export const CardInput = ({
  name,
  labelText,
  id,
  dataTest = '',
  required = true,
  disabled = false,
  className = '',
  whiteListTestCard = '',
  cardType = 'unknown',
  setCardType,
}: CardInputProps) => (
  <Field name={name} validate={required ? handleValidateCard(whiteListTestCard) : null}>
    {({ field, meta }: FieldProps<string | number>) => {
      const hasError = checkError(meta)
      const inputClassName = hasError ? 'input is-danger' : 'input is-primary'
      const defaultValue = ''
      const inputRef = useRef(null)

      useEffect(() => {
        if (setCardType) {
          const cardTypeFromField = getCardType(field.value as string)
          setCardType(cardTypeFromField)
        }
      }, [setCardType, field.value])

      return (
        <div className={cx('field', className)}>
          <div className="control has-icons-right">
            <label className={`label inline-block ${required ? 'required-label' : ''}`} htmlFor={id}>
              {labelText}
            </label>
            <input
              ref={inputRef}
              disabled={disabled}
              data-test={dataTest}
              type="text"
              inputMode="numeric"
              autoComplete="cardNumber"
              maxLength={cardType === 'amex' ? 17 : 19}
              id={id}
              placeholder="xxxx xxxx xxxx xxxx"
              className={cx(inputClassName)}
              {...field}
              value={formatCardNumber(String(field.value), inputRef) || defaultValue}
            />
            <span className="icon is-right mt-4">
              {cardType === 'visa' ? (
                <FaCcVisa />
              ) : cardType === 'mastercard' ? (
                <FaCcMastercard />
              ) : cardType === 'amex' ? (
                <FaCcAmex />
              ) : (
                <FaCreditCard />
              )}
            </span>
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
