import React, { FC } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { thirdStepValidationSchema } from '../validation-schema'
import { useForm } from 'react-hook-form'
import { Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrapFull, Label, Select } from '@reapit/elements'
import { COUNTRY_OPTIONS } from '../../settings/company/country-options-list'

export const ThirdStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
}> = ({ previousStep, nextStep, setFormSubmittedData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(thirdStepValidationSchema),
    defaultValues: {
      companyAddress: {
        line1: '',
        line2: '',
        countryId: 'GB',
        postcode: '',
      },
    },
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
            label="Address Line 1"
            id="companyAddress.line1"
            placeholder=""
            {...register('companyAddress.line1')}
            intent={errors.companyAddress?.line1?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.line1?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Address Line 2"
            id="companyAddress.line2"
            placeholder=""
            {...register('companyAddress.line2')}
            intent={errors.companyAddress?.line2?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.line2?.message}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup>
            <Select {...register('companyAddress.countryId')}>
              {COUNTRY_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Label>Country</Label>
            {errors.companyAddress?.countryId && errors.companyAddress.countryId.message && (
              <InputError message={errors.companyAddress?.countryId.message} />
            )}
          </InputGroup>
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="text"
            label="Post Code"
            id="companyAddress.postcode"
            placeholder=""
            {...register('companyAddress.postcode')}
            intent={errors.companyAddress?.postcode?.message ? 'danger' : undefined}
            errorMessage={errors.companyAddress?.postcode?.message}
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
