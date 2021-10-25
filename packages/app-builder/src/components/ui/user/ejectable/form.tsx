import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import qs from 'query-string'
import { Button, FormLayout, Loader, useSnack } from '@reapit/elements'

import { Container, ContainerProps } from './container'

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

export const Form = forwardRef<HTMLDivElement, FormProps & { disabled?: boolean }>(
  ({ typeName, destination, disabled, formType = 'create', excludeFields, ...props }, ref) => {
    const { context } = usePageId()
    const { data, loading: getLoading } = useObjectGet(typeName, context.editObjectId as string | undefined)
    const { args, mutateFunction, mutationLoading } = useObjectMutate(formType, typeName)
    const [formState, setFormState] = useState({})
    const { success, error } = useSnack()
    const history = useHistory()
    const [internalRef, setInternalRef] = useState<HTMLDivElement | null>(null)

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
      const { name, value } = e.target
      setFormState((prevState) => ({ ...prevState, [name]: value }))
    }

    useEffect(() => {
      if (internalRef) {
        internalRef.addEventListener('_inputChange', handleInputChange)
      }

      return () => {
        if (internalRef) {
          internalRef.removeEventListener('_inputChange', handleInputChange)
        }
      }
    }, [internalRef])

    return (
      <Container
        {...props}
        ref={(rref) => {
          if (rref !== internalRef) {
            setInternalRef(rref)
          }
          // @ts-ignore
          ref(rref)
        }}
      >
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
                  const { name } = arg

                  return <FormInput key={name} name={name} typeName={typeName} formType={formType} />
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
