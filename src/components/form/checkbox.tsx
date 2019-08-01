import * as React from 'react'
import { Field } from 'formik'
import bulma from '@/styles/vendor/bulma'

export interface CheckboxProps {
  id: string
  labelText: string
  name: string
  dataTest?: string
}

const Checkbox = ({ name, labelText, id, dataTest }: CheckboxProps) => (
  <Field
    name={name}
    render={({ field }) => (
      <div className={bulma.field}>
        <label className={bulma.checkbox}>
          <input type="checkbox" id={id} data-test={dataTest || ''} {...field} checked={field.value} />
          <span className="ml-2">{labelText}</span>
        </label>
      </div>
    )}
  />
)

export default Checkbox
