import * as React from 'react'
import Select, { Option, SelectProps } from 'rc-select'
import { CustomTagProps } from 'rc-select/lib/interface/generator'
import { Field, FieldProps } from 'formik'
import CustomTag from './custom-tag'

export interface DropdownSelectProps {
  id: string
  labelText: string
  name: string
  placeholder?: string
  options: SelectOption[]
}

export interface SelectOption {
  label: string
  value: string
  description: string
  link: string
}

export const DropdownSelect: React.FC<SelectProps & DropdownSelectProps> = ({
  id,
  labelText,
  name,
  placeholder,
  options,
}) => {
  const handleRenderTags = (props: CustomTagProps) => {
    const { value, onClose } = props
    const option = options.find(option => option.value === value) as SelectOption
    return <CustomTag label={option?.value} description={option?.description} link={option?.link} onClose={onClose} />
  }

  const handleChangeOption = field => value => {
    field.onChange({ target: { value: value, name: field.name } })
  }

  return (
    <div className="field pb-4">
      <div className="control">
        <Field name={name}>
          {({ field }: FieldProps<string | string[]>) => {
            return (
              <div className="field field-dropdown-select">
                <label className="label" htmlFor="">
                  {labelText}
                </label>
                <Select
                  id={id}
                  placeholder={placeholder}
                  value={field.value || []}
                  className="is-primary input"
                  mode="tags"
                  tagRender={handleRenderTags}
                  onChange={handleChangeOption(field)}
                >
                  {options?.map((option: SelectOption) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
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
