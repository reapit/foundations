import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, InputGroup, Label, Loader, Select, useSnack } from '@reapit/elements'

import { Container, ContainerProps } from './container'
import { uppercaseSentence } from './utils'

import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObjectGet } from '../../../hooks/objects/use-object-get'

import { usePageId } from '../../../hooks/use-page-id'

export interface FormProps extends ContainerProps {
  typeName?: string
  destination?: string
}

const SelectIDofType = ({
  typeName,
  value,
  onChange,
}: {
  typeName: string
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value']
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}) => {
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

export const Form = forwardRef<HTMLDivElement, FormProps & { disabled?: boolean }>(
  ({ typeName, destination, disabled, ...props }, ref) => {
    const { context } = usePageId()
    const formType = context.editObjectId ? 'update' : 'create'
    const { data, loading: getLoading } = useObjectGet(typeName, context.editObjectId as string | undefined)
    const { args, mutateFunction, mutationLoading } = useObjectMutate(formType, typeName)
    const [formState, setFormState] = useState({})
    const { success, error } = useSnack()
    const history = useHistory()

    useEffect(() => {
      if (data && args) {
        const dataCopy = {}
        args[0].fields?.forEach((arg) => {
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
    }, [data, args])

    return (
      <Container {...props} ref={ref}>
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
          <Button disabled={disabled} loading={mutationLoading}>
            {formType === 'create' ? 'Create' : 'Save'}
          </Button>
        </form>
      </Container>
    )
  },
)
