import React, { useState } from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'
import { Button, InputGroup, Label, Loader, Select } from '@reapit/elements'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { MutationType } from '@/components/hooks/use-introspection/types'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { useObjectList } from '@/components/hooks/objects/use-object-list'

const defaultProps = {
  destination: '/',
}

interface FormProps extends ContainerProps {
  typeName?: string
  formType: MutationType
}

const SelectIDofType = ({ typeName, value, onChange }) => {
  const { data, loading } = useObjectList(typeName)
  if (data) {
    return (
      <Select value={value} onChange={onChange}>
        {data.map(({ id, firstName, lastName }) => (
          <option key={id} value={id}>
            {firstName} {lastName}
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

const Form = ({ typeName, formType, ...props }: FormProps) => {
  const { loading, args, mutateFunction } = useObjectMutate(formType, typeName)
  const [formState, setFormState] = useState({})

  return (
    <Container {...props}>
      {loading && <Loader label="Loading" />}
      {!loading && !typeName && <div>No type selected</div>}
      <form
        onSubmit={() => {
          if (!args) return
          mutateFunction({
            variables: {
              [args[0].name]: formState,
            },
          })
        }}
      >
        {args &&
          args[0].fields?.map((arg) => {
            const { name, isRequired, typeName, enumValues, idOfType } = arg
            if (enumValues) {
              return (
                <>
                  <Label>{name}</Label>
                  <Select
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        [name]: e.target.value,
                      })
                    }}
                    value={formState[name]}
                  >
                    {enumValues.map((value) => {
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    })}
                    <option selected disabled>
                      Select a {typeName}
                    </option>
                  </Select>
                </>
              )
            }
            if (idOfType) {
              return (
                <>
                  <Label>{idOfType}</Label>
                  <SelectIDofType
                    typeName={idOfType}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        [name]: e.target.value,
                      })
                    }}
                    value={formState[name]}
                  />
                </>
              )
            }
            return (
              <InputGroup
                required={isRequired}
                key={name}
                label={name}
                type="text"
                value={formState[name]}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    [name]: e.target.value,
                  })
                }}
              />
            )
          })}
        <Button>Save</Button>
      </form>
    </Container>
  )
}

const ContainerSettings = Container.craft.related.toolbar

const FormSettings = () => {
  const { data, loading } = useTypeList()

  return (
    <>
      <ContainerSettings />
      <ToolbarSection
        title="Type Name"
        props={['typeName']}
        summary={({ typeName }: any) => {
          return `Form of ${typeName || ''}${typeName ? 's' : ''}`
        }}
      >
        <ToolbarItem type={ToolbarItemType.Select} propKey="typeName" title="Object Type">
          {(data || []).map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            {loading ? 'Loading...' : 'Select a Type'}
          </option>
        </ToolbarItem>
        <ToolbarItem type={ToolbarItemType.Select} propKey="formType" title="Form Type">
          {['create', 'update'].map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            Select a Type
          </option>
        </ToolbarItem>
      </ToolbarSection>
    </>
  )
}

Form.craft = {
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: FormSettings,
  },
}

export default Form
