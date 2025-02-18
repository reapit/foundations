import React, { FC } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { firstStepValidationSchema } from '../validation-schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'
import { formFields } from './../form-fields'

const { emailField, nameField, jobTitleField } = formFields

export const FirstStepForm: FC<{
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
  errors?: FieldErrors<{ email: string }>
}> = ({ nextStep, setFormSubmittedData, errors: initialErrors }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string; jobTitle: string; email: string }>({
    resolver: yupResolver(firstStepValidationSchema),
    defaultValues: {
      name: '',
      jobTitle: '',
      email: '',
    },
    errors: initialErrors,
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setFormSubmittedData(values)
        nextStep()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup
            type="text"
            label={nameField.label as string}
            id={nameField.name}
            placeholder={nameField.placeHolder}
            {...register('name')}
            errorMessage={errors?.name?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label={jobTitleField.label as string}
            id={jobTitleField.name}
            placeholder={jobTitleField.placeHolder}
            {...register('jobTitle')}
            errorMessage={errors?.jobTitle?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="email"
            label={emailField.label as string}
            id={emailField.name}
            placeholder={emailField.placeHolder}
            {...register('email')}
            errorMessage={errors?.email?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button disabled={true}>Previous</Button>
            <Button intent={'primary'}>Next</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}
