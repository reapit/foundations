import React, { useEffect, useState } from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'
import { Button, InputGroup, Label, Loader, Select, useSnack } from '@reapit/elements'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { useObjectList } from '@/components/hooks/objects/use-object-list'
import { useEditor } from '@craftjs/core'
import { DestinationPage } from './link'
import { useHistory } from 'react-router'
import { usePageId } from '@/core/usePageId'
import { useObjectGet } from '@/components/hooks/objects/use-object-get'
import { uppercaseSentence } from './utils'

const defaultProps = {
  destination: '/',
}

interface FormProps extends ContainerProps {
  typeName?: string
  destination?: string
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

const Form = ({ typeName, destination, ...props }: FormProps) => {
  const { context } = usePageId()
  const formType = context.editObjectId ? 'update' : 'create'
  const { data, loading: getLoading } = useObjectGet(typeName, context.editObjectId as string | undefined)
  const { args, mutateFunction, mutationLoading } = useObjectMutate(formType, typeName)
  const [formState, setFormState] = useState({})
  const { success, error } = useSnack()
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const history = useHistory()

  useEffect(() => {
    if (data && args) {
      const dataCopy = {}
      args[0].fields?.map((arg) => {
        const { name, idOfType } = arg
        if (data[name]) {
          dataCopy[name] = data[name]
        }
        if (idOfType) {
          const obj = data[idOfType.toLowerCase()]
          if (obj) {
            dataCopy[name] = obj.id
          }
        }
      })
      setFormState(dataCopy)
    }
  }, [data])

  return (
    <Container {...props}>
      {!typeName && <div>No type selected</div>}
      <form
        onSubmit={(e) => {
          if (!args) return
          e.preventDefault()
          let variables
          if (formType === 'create') {
            variables = {
              [args[0].name]: formState,
            }
          } else {
            variables = {
              [args[0].name]: formState,
              [args[1].name]: context.editObjectId,
            }
          }
          mutateFunction({
            variables,
          })
            .then(() => {
              success(`Successfully ${formType}d ${typeName}`)
              if (destination) {
                history.push(destination)
              }
            })
            .catch(() => {
              error(`Error ${formType}ing ${typeName}`)
            })
        }}
      >
        {getLoading && <Loader label="Loading" />}
        {args &&
          args[0].fields?.map((arg) => {
            const { name, isRequired, typeName, enumValues, idOfType } = arg
            if (enumValues) {
              return (
                <>
                  <Label>{uppercaseSentence(name)}</Label>
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
                label={uppercaseSentence(name)}
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
        <Button disabled={isEditing} loading={mutationLoading}>
          {formType === 'create' ? 'Create' : 'Save'}
        </Button>
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
      <DestinationPage propKey="destination" title="Redirect To" />
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
