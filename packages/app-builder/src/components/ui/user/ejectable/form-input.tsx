import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  CardWrap,
  ElBodyText,
  elFlex1,
  elHasGreyText,
  elMy2,
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
} from '@reapit/elements'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObject } from '../../../hooks/objects/use-object'
import { useLazyObjectSearch } from '../../../hooks/objects/use-object-search'
import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { uppercaseSentence } from './utils'
import { useFormContext } from '../../../hooks/form-context'
import { ParsedArg } from '../../..//hooks/use-introspection/query-generators'
import { cx } from '@linaria/core'

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
  defaultValue?: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) => {
  const { data, loading } = useObjectList(typeName)
  const { object } = useObject(typeName)
  const { available: searchAvailable, search } = useLazyObjectSearch(typeName)

  useEffect(() => {
    if (defaultValue?.id) {
      onChange({
        target: { value: defaultValue.id, name },
      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
    }
  }, [defaultValue?.id])

  if (searchAvailable) {
    return (
      <>
        <SearchableDropdown<GenericObject>
          onChange={onChange}
          getResults={search}
          getResultLabel={(result) => getLabel(result, object?.labelKeys)}
          getResultValue={(result) => result.id}
          name={name}
          disabled={disabled}
          defaultVal={defaultValue}
        />
      </>
    )
  }

  if (data) {
    return (
      <Select name={name} value={value} onChange={onChange} disabled={disabled} defaultValue={defaultValue?.id}>
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
    )
  }

  if (loading) return <Loader />
  return null
}

export const camelCaseToSentence = (camelCase: string) => {
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
  const { typeName: inputTypeName, isRequired, idOfType, enumValues, customInputType, fields } = input

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
              v[field.name] = e.target.value
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
                {value}
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
          type={inputTypeName === 'Boolean' ? 'checkbox' : 'text'}
          onChange={onChange}
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
    </InputWrap>
  )
}

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
        <InputGroup>
          {listValue.map((value, idx) => (
            <CardWrap key={idx} className={elMy2}>
              <InputWrap>
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
              <FloatingButton
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

const InnerFormInput = (
  { typeName, name, formType, ...rest }: FormInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { args } = useObjectMutate(formType, typeName)
  const disabled = rest.disabled || rest.isReadOnly
  const { onChange, defaultValues } = useFormContext()
  const defaultValue = defaultValues[name]
  const formInput = args && args[0] && args[0].fields?.find((arg) => arg.name === name)

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
