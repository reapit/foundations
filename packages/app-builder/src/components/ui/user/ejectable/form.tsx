import React, { forwardRef, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Button, FormLayout, Loader, useSnack } from '@reapit/elements'

import { ComponentWrapper, ContainerProps } from './container'

import { useObjectMutate } from '../../../hooks/objects/use-object-mutate'
import { useObjectGet } from '../../../hooks/objects/use-object-get'

import { usePageId } from '../../../hooks/use-page-id'
import { FormContextProvider } from '../../../hooks/form-context'
import { cloneDeep } from '@apollo/client/utilities'
import { ParsedArg } from '../../../../components/hooks/use-introspection/query-generators'

export interface FormProps extends ContainerProps {
  typeName?: string
  destination?: string
  formType?: string
  children?: React.ReactNode
}

const addValueToObject = (object: any, key: string, value: any) => {
  const newObject = cloneDeep(object)
  const parts = key.split('.')

  let modifyingObject = newObject
  parts.forEach((part, idx) => {
    if (idx === parts.length - 1) {
      return
    }
    if (!modifyingObject[part]) {
      modifyingObject[part] = {}
    }
    modifyingObject = modifyingObject[part]
  })

  const lastKey = parts.pop()
  if (lastKey) {
    modifyingObject[lastKey] = value
  }

  return newObject
}

const removeTypename = (object: any) => {
  if (object && typeof object === 'object') {
    const newObj = cloneDeep(object)
    delete newObj.__typename
    Object.keys(newObj).forEach((key) => {
      newObj[key] = removeTypename(newObj[key])
    })
    return newObj
  }
  return object
}

const mapDataToArgs = (data: any, args?: ParsedArg[], mapIds?: boolean) => {
  if (!args) return {}
  if (!data) return {}
  const dataCopy = {}
  const [objInput] = args.filter((a) => a.name !== 'id')
  objInput.fields?.forEach((arg) => {
    const { name, idOfType } = arg
    if (data[name]) {
      dataCopy[name] = data[name]
    }
    if (idOfType) {
      const obj = data[name.replace('Id', '')]
      if (obj) {
        if (mapIds) {
          dataCopy[name] = Array.isArray(obj) ? obj.map((o) => o.id) : obj.id
        } else {
          dataCopy[name] = obj
        }
      }
    }
  })
  return dataCopy
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
        setFormState((prevState) => ({
          ...prevState,
          ...mapDataToArgs(data, args, true),
        }))
      }
    }, [data, args])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, type, value, checked } = (e.currentTarget || e.target) as HTMLInputElement
      let actualValue: string | number | boolean = type === 'checkbox' ? checked : value
      if (type === 'number') {
        actualValue = parseFloat(value)
      }
      setFormState((prevState) => {
        return addValueToObject(prevState, name, actualValue)
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
            let fs = removeTypename(formState)
            if (formType === 'create') {
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
              const [objInput] = args.filter((a) => a.name !== 'id')
              variables = {
                id: context.editObjectId,
                [objInput.name]: fs,
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
          <FormContextProvider
            value={{ onChange: handleInputChange, defaultValues: mapDataToArgs(data, args), values: formState }}
          >
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
