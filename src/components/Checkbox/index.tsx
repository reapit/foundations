import * as React from 'react'
import { Field } from 'formik'

export interface CheckboxProps {
  id: string
  labelText: string
  name: string
  dataTest?: string
}

export const Checkbox = ({ name, labelText, id, dataTest }: CheckboxProps) => (
  <Field
    name={name}
    render={({ field }) => (
      <div className="field">
        <input
          className="checkbox"
          type="checkbox"
          id={id}
          name={id}
          data-test={dataTest || ''}
          {...field}
          checked={field.value}
        />
        <label className="label ml-2" htmlFor={id}>
          {labelText}
        </label>
      </div>
    )}
  />
)
