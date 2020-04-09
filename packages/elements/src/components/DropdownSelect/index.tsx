import * as React from 'react'
import Select, { Option, SelectProps } from 'rc-select'
import { Field, FieldProps } from 'formik'
import './index.scss'

const handleChangeOption = field => (value) => {
  field.onChange({ target: { value: value, name: field.name } })
}

export interface DropdownSelectProps {
  labelText: string
  name: string
}

export const DropdownSelect: React.FC<SelectProps & DropdownSelectProps> = props => {
  return (
    <div className="field pb-4">
      <div className="control">
        <Field name={props.name}>
          {({ field }: FieldProps<string | string[]>) => {
            return (
              <div className="field field-dropdown-select">
                <label className="label" htmlFor=''>
                  {props.labelText}
                </label>
                <Select {...props} onChange={handleChangeOption(field)}>
                  {props.options?.map(option => <Option value={option.value}>{option.label}</Option>)}
                </Select>
              </div>
            )
          }}
        </Field>
      </div>
    </div>
  )
}

export default DropdownSelect
