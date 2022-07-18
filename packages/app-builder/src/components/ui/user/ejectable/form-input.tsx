import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  CardWrap,
  ElBodyText,
  elFlex,
  elFlex1,
  elFlexAlignCenter,
  elHasGreyText,
  elMy2,
  elP3,
  FileInput,
  FlexContainer,
  FloatingButton,
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
import { uppercaseSentence } from './utils'
import { useFormContext } from '../../../hooks/form-context'
import { ParsedArg } from '../../../hooks/use-introspection/query-generators'
import { cx } from '@linaria/core'
import { block } from '../../styles'
import { styled } from '@linaria/react'
import { useObjectGet } from '../../../../components/hooks/objects/use-object-get'

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
    if (defaultValue?.id) {
      onChange({
        target: { value: defaultValue.id, name },
      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
    }
  }, [defaultValue?.id])

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
          defaultValue={defaultValue?.id}
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

export const camelCaseToSentence = (camelCase: string) => {
  return uppercaseSentence(camelCase.replace(/([A-Z])/g, ' $1'))
}

const friendlyIdName = (idName: string) => {
  const words = idName.replaceAll('Id', '').split('_')
  return words
    .map((w) => w.split('.'))
    .flat()
    .map(camelCaseToSentence)
    .join(' ')
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
}: {
  disabled?: boolean
  label: string
  value?: string
  defaultValue?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className={cx(elFlex1)} style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}>
      <FileInput
        disabled={disabled}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        onFileView={() => setModalIsOpen(true)}
      />
      <Modal title="Image Preview" isOpen={modalIsOpen} onModalClose={() => setModalIsOpen(false)}>
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          {value && <img src={value} />}
        </FlexContainer>
        <ButtonGroup alignment="right">
          <Button intent="low" onClick={() => setModalIsOpen(false)}>
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

const Input = ({
  name,
  input,
  fwdRef,
  disabled,
  defaultValue,
  label = friendlyIdName(name),
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
            typeName={idOfType}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
          />
        </div>
      )}
      {!enumValues && !idOfType && !customInputType && (
        <InputGroup
          disabled={disabled}
          key={label}
          label={label}
          value={value}
          required={isRequired && inputTypeName !== 'Boolean'}
          type={fieldTypeToInputType(inputTypeName.toLowerCase())}
          onChange={(e) => {
            const value =
              inputTypeName === 'Float' || inputTypeName === 'Int' ? parseFloat(e.target.value) : e.target.value
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
      {customInputType && customInputType === 'image-upload' && (
        <FileUploadInput
          disabled={disabled}
          label={label}
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
                    typeName={formInput.idOfType}
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
                    value={listValue[idx]}
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
          {listValue.length === 0 && <ElBodyText className={cx(elMy2, elHasGreyText)}>None yet</ElBodyText>}
        </InputGroup>
        <FloatingButton
          type="button"
          intent="secondary"
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
          icon="addSystem"
        />
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
  const formInput = args && args[0] && findFormInput(args[0], name)

  if (!formInput) return null

  const { isList } = formInput
  const label = friendlyIdName(name)
  if (isList) {
    const newDefaultValue = defaultValues[label.toLowerCase()]
    return (
      <ListInput
        defaultValue={newDefaultValue}
        label={label}
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
