import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import qs from 'query-string'
import path from 'path'
import { Button, FormLayout, Loader, useSnack } from '@reapit/elements'

import { Container, ContainerProps } from './container'

import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { useObjectGet } from '../../../hooks/objects/use-object-get'

import { usePageId } from '../../../hooks/use-page-id'
import { FormContextProvider } from '../../../hooks/form-context'

export interface FormProps extends ContainerProps {
  typeName?: string
  destination?: string
  formType?: string
  children?: React.ReactNode
}

export const Form = forwardRef<HTMLDivElement, FormProps & { disabled?: boolean }>(
  ({ typeName, destination, disabled, formType = 'create', children, ...props }, ref) => {
    const { context } = usePageId()
    const { data, loading: getLoading } = useObjectGet(typeName, context.editObjectId as string | undefined)
    const { args, mutateFunction, mutationLoading } = useObjectMutate(formType, typeName)
    const [formState, setFormState] = useState({})
    const { success, error } = useSnack()
    const history = useHistory()
    const { appId } = usePageId()

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, type, value, checked } = e.target as HTMLInputElement
      if (type === 'checkbox') {
        return setFormState((prevState) => ({ ...prevState, [name]: checked }))
      }
      setFormState((prevState) => ({ ...prevState, [name]: value }))
    }

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
                  const pathname = path.join('/', appId || '', destination === '~' ? '' : destination)
                  history.push({
                    pathname,
                    search: qs.stringify(context),
                  })
                }
              })
              .catch((e) => {
                error(`Error ${formType}ing ${typeName}: ${e.message}`)
              })
          }}
        >
          <FormContextProvider value={{ onChange: handleInputChange, defaultValues: data || {} }}>
            <FormLayout>
              {getLoading && <Loader label="Loading" />}
              {children}
              <Button disabled={disabled} loading={mutationLoading}>
                {formType === 'create' ? 'Create' : 'Save'}
              </Button>
            </FormLayout>
          </FormContextProvider>
        </form>
      </Container>
    )
  },
)
