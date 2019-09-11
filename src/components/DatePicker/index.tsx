import * as React from 'react'
import { Field } from 'formik'
import ReactDatePicker from 'react-datepicker'

export interface DatePickerProps {
  name: string
  id: string
  labelText: string
}

export const DatePicker = ({ name, id, labelText }: DatePickerProps) => {
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, setFieldValue } }) => {
        const hasError = touched[field.name] && errors[field.name]

        const className = hasError ? 'input is-danger' : 'input is-primary'
        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              <ReactDatePicker
                className={className}
                name={name}
                id={id}
                labelText={labelText}
                {...field}
                selected={field.value}
                onChange={value => {
                  setFieldValue(name, value)
                }}
              />
              {hasError && (
                <div className="has-text-danger" data-test="input-error">
                  {errors[field.name]}
                </div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
