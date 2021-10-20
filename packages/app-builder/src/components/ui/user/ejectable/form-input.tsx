import React, { useEffect } from 'react'
import { InputGroup, InputWrap, Label, Loader, SearchableDropdown, Select } from '@reapit/elements'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObject } from '../../../../components/hooks/objects/use-object'
import { useLazyObjectSearch } from '../../../../components/hooks/objects/use-object-search'

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
}: {
  typeName: string
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value']
  onChange: (value: string | number | null | undefined) => void
}) => {
  const { data, loading } = useObjectList(typeName)
  const { object } = useObject(typeName)
  const { available: searchAvailable, search } = useLazyObjectSearch(typeName)

  if (searchAvailable) {
    return (
      <SearchableDropdown<GenericObject>
        onChange={(e) => onChange(e.target.value)}
        getResults={search}
        getResultLabel={(result) => getLabel(result, object?.labelKeys)}
        getResultValue={(result) => result.id}
      />
    )
  }

  if (data) {
    return (
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
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

const InnerFormInput = (
  {
    label,
    value,
    onChange,
    isRequired,
    typeName,
    enumValues,
    idOfType,
  }: {
    label: string
    value: any
    isRequired: boolean
    onChange: (value: any) => void
    typeName: string
    enumValues: string[]
    idOfType: string
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  useEffect(() => {
    if (typeName === 'Boolean' && isRequired) {
      onChange(false)
    }
  }, [typeName])

  return (
    // @ts-ignore
    <InputWrap ref={ref}>
      {enumValues && (
        <>
          <Label>{label}</Label>
          <Select onChange={(e) => onChange(e.target.value)} value={value}>
            {enumValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
            <option selected disabled>
              Select a {typeName}
            </option>
          </Select>
        </>
      )}
      {idOfType && (
        <>
          <Label>{label}</Label>
          <SelectIDofType typeName={idOfType} onChange={onChange} value={value} />
        </>
      )}
      {!enumValues &&
        !idOfType &&
        (typeName === 'Boolean' ? (
          <InputGroup
            key={label}
            label={label}
            type={'checkbox'}
            value={value}
            onChange={(e) => onChange(e.target.value !== 'false')}
          />
        ) : (
          <InputGroup
            required={isRequired}
            key={label}
            label={label}
            type={'text'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ))}
    </InputWrap>
  )
}

export const FormInput = React.forwardRef(InnerFormInput)
