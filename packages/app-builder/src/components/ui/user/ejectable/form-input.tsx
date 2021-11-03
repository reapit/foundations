import React from 'react'
import { InputGroup, InputWrap, Label, Loader, SearchableDropdown, Select } from '@reapit/elements'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObject } from '../../../hooks/objects/use-object'
import { useLazyObjectSearch } from '../../../hooks/objects/use-object-search'
import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { uppercaseSentence } from './utils'
import { useFormContext } from '../../../hooks/form-context'

const getLabel = (obj: any, labelKeys?: string[]) => {
  if (labelKeys) {
    return labelKeys.map((key) => obj[key]).join(' ')
  }
  return obj.id
}

type GenericObject = {
  id: string
  [key: string]: any
}

const SelectIDofType = ({
  typeName,
  value,
  onChange,
  defaultValue,
  name,
  disabled,
}: {
  typeName: string
  name: string
  value?: React.SelectHTMLAttributes<HTMLSelectElement>['value']
  disabled?: boolean
  defaultValue?: React.SelectHTMLAttributes<HTMLSelectElement>['defaultValue']
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) => {
  const { data, loading } = useObjectList(typeName)
  const { object } = useObject(typeName)
  const { available: searchAvailable, search } = useLazyObjectSearch(typeName)

  if (searchAvailable) {
    return (
      <SearchableDropdown<GenericObject>
        onChange={onChange}
        getResults={search}
        getResultLabel={(result) => getLabel(result, object?.labelKeys)}
        getResultValue={(result) => result.id}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    )
  }

  if (data) {
    return (
      <Select name={name} value={value} onChange={onChange} disabled={disabled} defaultValue={defaultValue}>
        {data.map((obj) => (
          <option key={obj.id} value={obj.id}>
            {getLabel(obj, object?.labelKeys)}
          </option>
        ))}
        <option selected disabled>
          Select a {typeName}
        </option>
      </Select>
    )
  }

  if (loading) return <Loader />
  return null
}

const camelCaseToSentence = (camelCase: string) => {
  return uppercaseSentence(camelCase.replace(/([A-Z])/g, ' $1'))
}

const friendlyIdName = (idName: string) => {
  const words = idName.replaceAll('Id', '').split('_')
  return words.map(camelCaseToSentence).join(' ')
}

export type FormInputProps = {
  formType: string
  typeName?: string
  name: string
  disabled?: boolean
  isReadOnly?: boolean
}

const InnerFormInput = (
  { typeName, name, formType, ...rest }: FormInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { args } = useObjectMutate(formType, typeName)
  const disabled = rest.disabled || rest.isReadOnly
  const { onChange, defaultValues } = useFormContext()
  const defaultValue = defaultValues[name]
  const formInput = args && args[0] && args[0]?.fields?.find((arg) => arg.name === name)
  if (!formInput) return null
  const label = friendlyIdName(name)
  const { typeName: inputTypeName, isRequired, idOfType, enumValues } = formInput

  return (
    <InputWrap ref={ref}>
      {enumValues && (
        <>
          <Label>{label}</Label>
          <Select onChange={onChange} name={name} disabled={disabled} defaultValue={defaultValue}>
            {enumValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
            <option selected disabled>
              Select a {inputTypeName}
            </option>
          </Select>
        </>
      )}
      {idOfType && (
        <>
          <Label>{label}</Label>
          <SelectIDofType
            disabled={disabled}
            name={name}
            typeName={idOfType}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </>
      )}
      {!enumValues && !idOfType && (
        <InputGroup
          disabled={disabled}
          key={label}
          label={label}
          required={isRequired && inputTypeName !== 'Boolean'}
          type={inputTypeName === 'Boolean' ? 'checkbox' : 'text'}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
        />
      )}
    </InputWrap>
  )
}

export const FormInput = React.forwardRef(InnerFormInput)
