import * as React from 'react'
import Select, { Option, SelectProps } from 'rc-select'
import { CustomTagProps } from 'rc-select/lib/interface/generator'
import { Field, FieldProps, FormikProps, FieldInputProps } from 'formik'
import CustomTag from './custom-tag'
import { dropdownSelectFieldValidateRequire } from '../../utils/validators'
import { checkError } from '../../utils/form'

export interface DropdownSelectProps extends SelectProps {
  id: string
  labelText: string
  name: string
  placeholder?: string
  options: SelectOption[]
  required?: boolean
  subText?: string
  // fixed to current node
  fixedPosition?: boolean
}

export interface SelectOption {
  label: string
  value: string
  description: string
  link: string
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  id,
  labelText,
  name,
  placeholder,
  options,
  required = false,
  subText,
  mode = 'tags',
  fixedPosition = false,
  ...restProps
}) => {
  const handleRenderTags = (props: CustomTagProps) => {
    const { value, onClose } = props
    const option = options.find(option => option.value === value) as SelectOption
    return <CustomTag label={option?.value} description={option?.description} link={option?.link} onClose={onClose} />
  }

  const handleChangeOption = field => value => {
    field.onChange({ target: { value: value, name: field.name } })
  }

  const handleFieldTouched = (form: FormikProps<any>, field: FieldInputProps<String | String[]>) => () => {
    form.setFieldTouched(field.name)
  }

  const containerRef = React.useRef<HTMLDivElement>(null)

  const getPopupContainer =
    fixedPosition && containerRef.current ? () => containerRef.current as HTMLDivElement : undefined

  return (
    <>
      <div className="field pb-4">
        <div className="control">
          <Field name={name} validate={required ? dropdownSelectFieldValidateRequire : null}>
            {({ field, meta, form }: FieldProps<string | string[]>) => {
              const hasError = checkError(meta)
              return (
                <div className="field field-dropdown-select">
                  <label className={`label ${required ? 'required-label' : ''}`}>{labelText}</label>
                  {subText && <label className="subtext mb-2">{subText}</label>}
                  <Select
                    id={id}
                    placeholder={placeholder}
                    value={field.value || []}
                    className="is-primary input"
                    mode={mode}
                    tagRender={handleRenderTags}
                    onChange={handleChangeOption(field)}
                    onBlur={handleFieldTouched(form, field)}
                    getPopupContainer={getPopupContainer}
                    dropdownStyle={{ zIndex: 999 }}
                    {...restProps}
                  >
                    {options?.map((option: SelectOption) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  {hasError && (
                    <div className="has-text-danger" data-test="input-error">
                      {meta.error}
                    </div>
                  )}
                </div>
              )
            }}
          </Field>
        </div>
      </div>

      <div ref={containerRef} />
    </>
  )
}

export default DropdownSelect
