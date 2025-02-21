import React, { FC } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { secondStepValidationSchema } from '../validation-schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'
import { formFields } from './../form-fields'

const { companyNameField, telephoneField } = formFields

export const SecondStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
  errors?: FieldErrors<{ companyName: string }>
}> = ({ previousStep, nextStep, setFormSubmittedData, errors: initialErrors }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    companyName: string
    telephone: string
    website: string
    registrationNumber: string
    taxNumber: string
  }>({
    resolver: yupResolver(secondStepValidationSchema),
    defaultValues: {
      companyName: '',
      telephone: '',
      website: '',
      registrationNumber: '',
      taxNumber: '',
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
            label={companyNameField.label as string}
            id={companyNameField.name}
            placeholder={companyNameField.placeHolder}
            {...register('companyName')}
            errorMessage={errors?.companyName?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="tel"
            label={telephoneField.label as string}
            id={telephoneField.name}
            placeholder={telephoneField.placeHolder}
            {...register('telephone')}
            errorMessage={errors?.telephone?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Website"
            id="website"
            placeholder="https://mycompany.co.uk"
            {...register('website')}
            errorMessage={errors?.website?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Registration Number"
            id="registration-number"
            placeholder=""
            {...register('registrationNumber')}
            errorMessage={errors['registrationNumber']?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="VAT Number"
            id="vat-number"
            placeholder=""
            {...register('taxNumber')}
            errorMessage={errors['taxNumber']?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup>
            <Button
              onClick={(event) => {
                event.preventDefault()

                previousStep()
              }}
            >
              Previous
            </Button>
            <Button intent={'primary'}>Next</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}
