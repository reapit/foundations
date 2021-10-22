import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import qs from 'query-string'
import { Button, FormLayout, Loader, useSnack } from '@reapit/elements'

import { Container, ContainerProps } from './container'
import { uppercaseSentence } from './utils'

import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { useObjectGet } from '../../../hooks/objects/use-object-get'

import { usePageId } from '../../../hooks/use-page-id'
import { FormInput } from './form-input'

export interface FormProps extends ContainerProps {
  typeName?: string
  destination?: string
  formType?: string
  excludeFields?: string[]
}

const camelCaseToSentence = (camelCase: string) => {
  return uppercaseSentence(camelCase.replace(/([A-Z])/g, ' $1'))
}

const friendlyIdName = (idName: string) => {
  const words = idName.replaceAll('Id', '').split('_')
  return words.map(camelCaseToSentence).join(' ')
}

export const Form = forwardRef<HTMLDivElement, FormProps & { disabled?: boolean }>(
  ({ typeName, destination, disabled, formType = 'create', excludeFields, ...props }, ref) => {
    const { context } = usePageId()
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
              variables: {
                ...variables,
                ...context,
              },
            })
              .then(() => {
                success(`Successfully ${formType}d ${typeName}`)
                if (destination) {
                  history.push({
                    pathname: destination,
                    search: qs.stringify(context),
                  })
                }
              })
              .catch((e) => {
                error(`Error ${formType}ing ${typeName}: ${e.message}`)
              })
          }}
        >
          <FormLayout>
            {getLoading && <Loader label="Loading" />}
            {args &&
              args[0].fields
                ?.filter(({ name }) => !excludeFields?.includes(name))
                .map((arg) => {
                  const { name, isRequired, typeName, enumValues, idOfType } = arg
                  const value = formState[name]

                  return (
                    <FormInput
                      key={name}
                      label={friendlyIdName(name)}
                      value={value}
                      onChange={(value) => {
                        setFormState({ ...formState, [name]: value })
                      }}
                      isRequired={isRequired}
                      typeName={typeName}
                      enumValues={enumValues}
                      idOfType={idOfType}
                    />
                  )
                })}
            <Button disabled={disabled} loading={mutationLoading}>
              {formType === 'create' ? 'Create' : 'Save'}
            </Button>
          </FormLayout>
        </form>
      </Container>
    )
  },
)
