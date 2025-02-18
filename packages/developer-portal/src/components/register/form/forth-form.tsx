import React, { FC } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { forthStepValidationSchema } from '../validation-schema'
import { useForm } from 'react-hook-form'
import { BodyText, Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'

export const ForthStepForm: FC<{
  previousStep: () => void
  nextStep: () => void
  setFormSubmittedData: (data: any) => void
  submitForm: () => void
}> = ({ previousStep, setFormSubmittedData, submitForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(forthStepValidationSchema),
    defaultValues: {
      notificationsEmail: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setFormSubmittedData(values)
        submitForm()
      })}
    >
      <FormLayout hasMargin>
        <InputWrapFull>
          <BodyText hasGreyText>
            Please provide an alternative email address (to your own) to receive notifications of app installations and
            Reapit service updates. You can update this at anytime.
          </BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="email"
            label="Notification Email"
            id="notification-email"
            placeholder="sales@partnerteam.com"
            {...register('notificationsEmail')}
            intent={errors['notificationsEmail']?.message ? 'danger' : undefined}
            errorMessage={errors['notificationsEmail']?.message}
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
            <Button intent={'primary'}>Register</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}
