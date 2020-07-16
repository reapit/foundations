import React from 'react'
import { cx } from 'linaria'
import { Field, FieldProps, FormikProps } from 'formik'
import { checkError } from '../../utils/form'
import { Grid, GridItem } from '../Layout'

export type RadioSelectOption = {
  label: string | number
  value: string | number
  additionalField?: (form: FormikProps<any>) => any | React.ReactElement
}

export type RadioSelectProps = {
  name: string
  labelText?: string
  subText?: string
  id: string
  dataTest?: string
  options: RadioSelectOption[]
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  state: any
  disabled?: boolean
  className?: string
  isHorizontal?: boolean
}

export const renderAdditionalField = (additionalField, form: FormikProps<any>) => {
  if (!additionalField) return null
  if (typeof additionalField === 'function') return additionalField(form)
  return additionalField
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  labelText,
  subText,
  id,
  dataTest,
  options,
  setFieldValue,
  state,
  disabled = false,
  isHorizontal = false,
  className = '',
}) => {
  const radioGridClassName = cx(!isHorizontal && 'is-gapless')
  const radioGridItemClassName = cx(isHorizontal ? 'is-narrow' : 'is-full')

  return (
    <Field type="radio" name={name}>
      {({ meta, form }: FieldProps<string>) => {
        const hasError = checkError(meta)
        return (
          <div className={`field pb-2 ${className}`}>
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              {subText && <label className="subtext mb-2">{subText}</label>}
              <Grid className={radioGridClassName} isMultiLine>
                {options.map(({ label, value, additionalField }: RadioSelectOption, index: number) => {
                  return (
                    <GridItem key={index} className={radioGridItemClassName}>
                      <div data-test={dataTest} className="radio-wrap">
                        <input
                          id={`${name}${label}`}
                          className={`checkbox ${hasError ? 'checkbox-error' : ''}`}
                          type="radio"
                          key={value}
                          checked={state === value}
                          name={name}
                          value={value}
                          disabled={disabled}
                          onChange={() => setFieldValue(name, value)}
                        />
                        <label htmlFor={`${name}${label}`}>{label}</label>
                      </div>
                      {renderAdditionalField(additionalField, form)}
                    </GridItem>
                  )
                })}
              </Grid>
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

export default RadioSelect
