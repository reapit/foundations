import React, { forwardRef, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Button, FormLayout, Loader, useSnack } from '@reapit/elements'

import { ComponentWrapper, ContainerProps } from './container'

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
    const { context, setPageId } = usePageId()
    const { data, loading: getLoading } = useObjectGet(typeName, context.editObjectId as string | undefined)
    const { args, mutateFunction, mutationLoading } = useObjectMutate(formType, typeName)
    const [formState, setFormState] = useState({})
    const { success, error } = useSnack()

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
        setFormState((prevState) => ({
          ...prevState,
          ...dataCopy,
        }))
      }
    }, [data, args])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, type, value, checked } = e.target as HTMLInputElement
      if (type === 'checkbox') {
        return setFormState((prevState) => ({ ...prevState, [name]: checked }))
      }
      setFormState((prevState) => {
        console.log({ ...prevState, [name]: value })
        return { ...prevState, [name]: value }
      })
    }

    return (
      <ComponentWrapper {...props} ref={ref}>
        {!typeName && <div>No type selected, choose one from the sidebar.</div>}
        <form
          onSubmit={(e) => {
            if (!args) return
            e.preventDefault()
            let variables
            if (formType === 'create') {
              let fs = { ...formState }
              if (args[0].fields?.find((field) => field.name === 'id')) {
                fs = {
                  ...fs,
                  id: v4(),
                }
              }
              variables = {
                [args[0].name]: fs,
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
                  setPageId(destination, context)
                }
              })
              .catch((e) => {
                error(`Error ${formType}ing ${typeName}: ${e.message}`)
              })
          }}
        >
          <FormContextProvider value={{ onChange: handleInputChange, defaultValues: data || {} }}>
            <FormLayout>
              {getLoading ? <Loader label="Loading" /> : children}
              <Button intent="primary" disabled={disabled} loading={mutationLoading}>
                {formType === 'create' ? 'Create' : 'Save'}
              </Button>
            </FormLayout>
          </FormContextProvider>
        </form>
      </ComponentWrapper>
    )
  },
)
