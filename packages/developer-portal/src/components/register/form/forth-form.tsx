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
            Holly to provide helper text, this is to be provided by Holly, Holly is the best and will provide us with
            helper text for notification email fields.
          </BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            type="email"
            label="Notification Email"
            id="notification-email"
            placeholder="notifications@mycompany.co.uk"
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
