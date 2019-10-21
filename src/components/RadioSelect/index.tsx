import React from 'react'
import { Field } from 'formik'

export const renderRadio = ({ labelText, id, options, dataTest }) => ({ field, form: { touched, errors } }) => {
  const hasError = touched[field.name] && errors[field.name]
  const className = hasError ? 'input is-danger' : ''
  return (
    <div className="field pb-2">
      <div className="control">
        <label className="label" htmlFor={id}>
          {labelText}
        </label>
        {options.map(({ label, value }, index: number) => (
          <div key={index} data-test={dataTest} className={className}>
            <input
              id={value}
              className="checkbox"
              type="radio"
              key={value}
              name={name}
              checked={field.value === value}
              {...field}
              value={value}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </div>
      {hasError && (
        <div className="has-text-danger" data-test="input-error">
          {errors[field.name]}
        </div>
      )}
    </div>
  )
}

export type RadioSelectOption = {
  label: string | number
  value: string | number
}

export type RadioSelectProps = {
  name: string
  labelText?: string
  id: string
  dataTest?: string
  options: RadioSelectOption[]
}

export const RadioSelect: React.FC<RadioSelectProps> = ({ name, labelText, id, dataTest, options }) => {
  return <Field name={name} render={renderRadio({ options, labelText, id, dataTest })} />
}

export default RadioSelect
