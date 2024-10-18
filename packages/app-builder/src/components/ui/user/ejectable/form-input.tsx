import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  CardWrap,
  BodyText,
  elFlex,
  elFlex1,
  elFlexAlignCenter,
  elHasGreyText,
  elMy2,
  elP3,
  FileInput,
  FlexContainer,
  FloatingButton,
  Icon,
  InputGroup,
  InputWrap,
  Label,
  Loader,
  Modal,
  SearchableDropdown,
  Select,
  useSnack,
} from '@reapit/elements'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObject } from '../../../hooks/objects/use-object'
import { useLazyObjectSearch } from '../../../hooks/objects/use-object-search'
import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { camelCaseToSentence, friendlyIdName } from './utils'
import { useFormContext } from '../../../hooks/form-context'
import { ParsedArg } from '../../../hooks/use-introspection/query-generators'
import { cx } from '@linaria/core'
import { block } from '../../styles'
import { styled } from '@linaria/react'
import { useObjectGet } from '../../../../components/hooks/objects/use-object-get'

export const getLabel = (obj: any, labelKeys?: string[]) => {
  if (!obj) {
    return ''
  }
  if (labelKeys) {
    return labelKeys
      .map((key) => {
        if (typeof obj[key] === 'string') {
          return obj[key]
        }
        if (typeof obj[key] === 'object') {
          return Object.entries(obj[key])
            .filter(([key, value]) => typeof value === 'string' && key !== '__typename')
            .map(([, value]) => value)
        }
        if (key.includes('.')) {
          // get nested value
          const [firstKey, ...restKeys] = key.split('.')
          return getLabel(obj[firstKey], [restKeys.join('.')])
        }
        return ''
      })
      .flat()
      .join(' ')
  }
  return obj.id
}

type GenericObject = {
  id: string
  [key: string]: any
}

const SelectIDofTypeContainer = styled.div`
  select {
    width: 100%;
  }
  .el-searchable-dropdown-search-loader {
    margin-right: 0;
    right: 8px;
  }
  .el-searchable-dropdown-search-input {
    padding-left: 30px;
  }
  .el-searchable-dropdown-close-button {
    bottom: 0px;
  }
  .el-searchable-dropdown-search-input-add-on {
    bottom: 3px;
    padding-bottom: 5px;
    border-bottom: 0px;
    background: transparent;

    .el-icon {
      padding-left: 2px;
      border-bottom: 0px;
      background: transparent;
    }
  }
`

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
  defaultValue?: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) => {
  const { data, loading } = useObjectList(typeName)
  const { object } = useObject(typeName)
  const { error } = useSnack()
  const { available: searchAvailable, search, error: searchError } = useLazyObjectSearch(typeName)

  useEffect(() => {
    if (searchError) {
      error(searchError.message)
    }
  }, [searchError])

  useEffect(() => {
    if (defaultValue) {
      const value = typeof defaultValue === 'object' ? defaultValue.id : defaultValue
      onChange({
        target: { value, name },
      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
    }
  }, [defaultValue])

  if (searchAvailable) {
    return (
      <SelectIDofTypeContainer>
        <SearchableDropdown<GenericObject>
          onChange={onChange}
          getResults={search}
          getResultLabel={(result) => getLabel(result, object?.labelKeys)}
          getResultValue={(result) => result.id}
          name={name}
          disabled={disabled}
          defaultVal={defaultValue}
        />
      </SelectIDofTypeContainer>
    )
  }

  if (data) {
    return (
      <SelectIDofTypeContainer>
        <Select
          className={elFlex1}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          defaultValue={typeof defaultValue === 'object' ? defaultValue.id : defaultValue}
        >
          {data.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {getLabel(obj, object?.labelKeys)}
            </option>
          ))}
          {/* deepscan-disable-next-line */}
          <option disabled selected>
            Select a {typeName}
          </option>
        </Select>
      </SelectIDofTypeContainer>
    )
  }

  if (loading)
    return (
      <SelectIDofTypeContainer>
        <Loader />
      </SelectIDofTypeContainer>
    )
  return null
}

export type FormInputProps = {
  formType: string
  typeName?: string
  name: string
  disabled?: boolean
  isReadOnly?: boolean
}

const FileUploadInput = ({
  label,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
}: {
  disabled?: boolean
  label: string
  value?: string
  defaultValue?: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [file, setFile] = useState<string | undefined>(value)
  return (
    <div className={cx(elFlex1)} style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}>
      <FileInput
        disabled={disabled}
        label={label}
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => {
          onChange(e)
          setFile(e.target.value)
        }}
        onFileView={() => setModalIsOpen(true)}
      />
      <Modal title="Image Preview" isOpen={modalIsOpen} onModalClose={() => setModalIsOpen(false)}>
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          {file && <img src={file} style={{ maxWidth: 420 }} />}
        </FlexContainer>
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}

const fieldTypeToInputType = (fieldType: string) => {
  switch (fieldType) {
    case 'string':
      return 'text'
    case 'int':
      return 'number'
    case 'float':
      return 'number'
    case 'bool':
    case 'boolean':
      return 'checkbox'
    case 'date':
      return 'date'
    case 'datetime':
      return 'datetime-local'
    case 'time':
      return 'time'
    case 'file':
      return 'file'
    default:
      return 'text'
  }
}

const DepartmentLookupInput = ({
  name,
  input,
  disabled,
  defaultValue,
  label,
  onChange,
  value,
}: {
  name: string
  disabled?: boolean
  input: ParsedArg
  defaultValue?: any
  label?: string
  value?: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) => {
  const { values } = useFormContext()
  const { data, loading } = useObjectGet('Department', values.departmentId)

  const inputOptions = data && (data[`${input.name}Options`] as string[] | undefined)

  if (!loading && !values.departmentId) {
    return (
      <SelectIDofTypeContainer>
        <p className={elP3}>Select a Department first</p>
      </SelectIDofTypeContainer>
    )
  }
  if (!loading && !inputOptions) {
    return null
  }

  if (inputOptions) {
    return (
      <SelectIDofTypeContainer>
        <Select
          className={elFlex1}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue?.id}
        >
          {inputOptions.map((inputOption) => (
            <option key={inputOption} value={inputOption}>
              {camelCaseToSentence(inputOption)}
            </option>
          ))}
          {/* deepscan-disable-next-line */}
          <option disabled selected>
            Select a {label}
          </option>
        </Select>
      </SelectIDofTypeContainer>
    )
  }

  if (loading)
    return (
      <SelectIDofTypeContainer>
        <Loader />
      </SelectIDofTypeContainer>
    )
  return null
}

const resolveIdOfType = (idOfType: string, parentObj: any): string => {
  if (idOfType.includes('"')) {
    const key = idOfType.replace(/"/g, '')
    const value = parentObj[key]
    return value?.replace(/^\w/, (c) => c.toUpperCase())
  }
  return idOfType
}

const convertDate = (date?: string) => {
  if (!date) return undefined
  const d = new Date(date)
  return d.toISOString().split('.')[0]
}

export const Input = ({
  name,
  input,
  fwdRef,
  disabled,
  defaultValue,
  label = friendlyIdName(name),
  parentValues,
  onChange,
  value,
}: {
  name: string
  disabled?: boolean
  input: ParsedArg
  defaultValue?: any
  label?: string
  value?: any
  fwdRef?: React.ForwardedRef<HTMLDivElement>
  parentValues?: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) => {
  const { typeName: inputTypeName, isRequired, idOfType, enumValues, customInputType, fields, onlyIf } = input
  const { values } = useFormContext()

  if (onlyIf) {
    const shouldHide = Object.entries(onlyIf)
      .map(([key, value]) => {
        return value.includes(values[key])
      })
      .includes(false)

    if (shouldHide) {
      return null
    }
  }

  if (fields) {
    return (
      <>
        {fields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            parentValues={value}
            label={[label, friendlyIdName(field.name)].join(' ')}
            input={field}
            disabled={disabled}
            defaultValue={defaultValue?.[field.name]}
            onChange={(e) => {
              const v = value || {}
              if (field.typeName === 'Float' || field.typeName === 'Int') {
                v[field.name] = parseFloat(e.target.value)
              } else {
                v[field.name] = e.target.value
              }
              onChange({
                ...e,
                target: {
                  ...e.target,
                  value: v,
                  name: name,
                } as any,
              })
            }}
            value={value?.[field.name]}
          />
        ))}
      </>
    )
  }

  const inputType = fieldTypeToInputType(inputTypeName.toLowerCase())

  return (
    <InputWrap ref={fwdRef}>
      {enumValues && (
        <>
          <Label>{label}</Label>
          <Select value={value} onChange={onChange} name={name} disabled={disabled} defaultValue={defaultValue}>
            {enumValues.map((value) => (
              <option key={value} value={value}>
                {camelCaseToSentence(value)}
              </option>
            ))}
            {/* deepscan-disable-next-line */}
            <option disabled selected>
              Select a {inputTypeName}
            </option>
          </Select>
        </>
      )}
      {idOfType && (
        <div className={elFlex1} style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}>
          <Label>{label}</Label>
          <SelectIDofType
            disabled={disabled}
            name={name}
            typeName={resolveIdOfType(idOfType, parentValues || values)}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
          />
        </div>
      )}
      {!enumValues && !idOfType && !customInputType && (
        <>
          {!inputType.startsWith('date') && (
            <InputGroup
              disabled={disabled}
              key={label}
              label={label}
              value={value}
              required={isRequired && inputType !== 'checkbox'}
              type={inputType}
              onChange={(e) => {
                const value = inputType === 'number' ? parseFloat(e.target.value) : e.target.value
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value,
                    name,
                  } as any,
                })
              }}
              name={name}
              defaultValue={defaultValue}
            />
          )}
          {inputType.startsWith('date') && (
            <InputGroup
              disabled={disabled}
              key={label}
              label={label}
              value={convertDate(value)}
              required={isRequired}
              type={inputType}
              onChange={(e) => {
                const value = e.target.value
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value,
                    name,
                  } as any,
                })
              }}
              name={name}
              defaultValue={convertDate(defaultValue)}
            />
          )}
        </>
      )}
      {customInputType && customInputType === 'image-upload' && (
        <FileUploadInput
          disabled={disabled}
          label={label}
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      )}
      {customInputType && customInputType === 'department-lookup' && (
        <>
          <Label>{label}</Label>
          <DepartmentLookupInput
            disabled={disabled}
            name={name}
            label={label}
            defaultValue={defaultValue}
            value={value}
            input={input}
            onChange={onChange}
          />
        </>
      )}
    </InputWrap>
  )
}

const TrashFloatingButton = styled(FloatingButton)`
  .el-icon {
    border: none;
  }
`

const ListInput = React.forwardRef(
  (
    {
      label,
      defaultValue,
      formInput,
      disabled,
      onChange,
    }: {
      label: string
      defaultValue: any
      formInput: ParsedArg
      disabled?: boolean
      onChange: (value: any) => void
    },
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const [listValue, setListValue] = React.useState<any[]>(defaultValue || [])
    if (!formInput) {
      return null
    }

    return (
      <InputWrap ref={ref}>
        <Label>{label}</Label>
        <InputGroup className={cx(block)}>
          {listValue.map((value, idx) => (
            <CardWrap key={idx} className={cx(elMy2, elFlex, elFlexAlignCenter)}>
              <InputWrap className={elFlex1}>
                {formInput.idOfType && (
                  <SelectIDofType
                    disabled={disabled}
                    name={label}
                    typeName={resolveIdOfType(formInput.idOfType, value)}
                    defaultValue={defaultValue && defaultValue[idx]}
                    onChange={(e) => {
                      const newListValue = [...listValue]
                      newListValue[idx] = e.target.value
                      setListValue(newListValue)
                      onChange(newListValue)
                    }}
                  />
                )}
                {formInput.typeName && !formInput.idOfType && (
                  <Input
                    name={formInput.name}
                    input={formInput}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => {
                      listValue[idx] = e.target.value
                      setListValue(listValue)
                      onChange(listValue)
                    }}
                  />
                )}
              </InputWrap>
              <TrashFloatingButton
                type="button"
                onClick={() => {
                  const newListValue = listValue.filter((_, i) => i !== idx)
                  setListValue(newListValue)
                  onChange(newListValue)
                }}
                icon="trashSystem"
              />
            </CardWrap>
          ))}
          {listValue.length === 0 && <BodyText className={cx(elMy2, elHasGreyText)}>None yet</BodyText>}
        </InputGroup>
        <Button
          type="button"
          intent="primary"
          onClick={() => {
            const newListValue = listValue.slice()
            if (!formInput.fields) {
              newListValue.push(undefined)
            } else {
              newListValue.push({})
            }
            setListValue(newListValue)
            onChange(newListValue)
          }}
        >
          <Icon icon="addSystem" />
          &nbsp; Add
        </Button>
      </InputWrap>
    )
  },
)

const findFormInput = (arg: ParsedArg, name: string) => {
  const parts = name.split('.')
  if (parts.length === 1) {
    return arg.fields?.find((field) => field.name === name)
  }
  const [first, ...rest] = parts
  const nextArg = arg.fields?.find((f) => f.name === first)
  if (!nextArg) {
    return null
  }
  return findFormInput(nextArg, rest.join('.'))
}

const getDefaultValue = (defaultValues: any, name: string) => {
  const parts = name.split('.')
  if (parts.length === 1) {
    if (name.toLowerCase().includes('id')) {
      return defaultValues[name]
    }
    return defaultValues[name]
  }
  const [first, ...rest] = parts
  const nextArg = defaultValues[first]
  if (!nextArg) {
    return null
  }
  return getDefaultValue(nextArg, rest.join('.'))
}

const InnerFormInput = (
  { typeName, name, formType, ...rest }: FormInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { args } = useObjectMutate(formType, typeName)
  const disabled = rest.disabled || rest.isReadOnly
  const { onChange, defaultValues } = useFormContext()
  const defaultValue = getDefaultValue(defaultValues, name)
  const objArg = args?.find((arg) => arg.name !== 'id')
  const formInput = objArg && findFormInput(objArg, name)

  if (!formInput) return null

  const { isList } = formInput
  const label = friendlyIdName(name)
  if (isList) {
    const newDefaultValue = defaultValues[label.toLowerCase()] || defaultValues[name]

    return (
      <ListInput
        defaultValue={newDefaultValue}
        label={label}
        ref={ref}
        formInput={formInput}
        onChange={(value: any) => {
          onChange({
            target: {
              name,
              value,
            },
          } as any)
        }}
        disabled={disabled}
      />
    )
  }

  return (
    <Input
      name={name}
      input={formInput}
      fwdRef={ref}
      disabled={disabled}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  )
}

export const FormInput = React.forwardRef(InnerFormInput)
