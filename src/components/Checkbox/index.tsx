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
        <label className="checkbox">
          <input type="checkbox" id={id} data-test={dataTest || ''} {...field} checked={field.value} />
          <span className="ml-2">{labelText}</span>
        </label>
      </div>
    )}
  />
)
