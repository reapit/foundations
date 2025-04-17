import React, { FC } from 'react'
import { Button, ButtonGroup, elMb11, FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { object, string } from 'yup'
import { SendFunction } from '@reapit/use-reapit-data'
import { emailRegex } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface ResendConsentModalProps {
  email?: string
  recipient?: string
  resendEmail: SendFunction<Marketplace.ResendAppRevisionConsentModel, boolean>
  closeModal: () => void
}

interface ResendConsentForm {
  recipient: string
}

export const validationSchema = object().shape({
  recipient: string().trim().required('Required').matches(emailRegex, 'Must be a valid email address'),
})

export const handleResendEmail =
  (resendEmail: SendFunction<Marketplace.ResendAppRevisionConsentModel, boolean>, email: string) =>
  (values: ResendConsentForm) => {
    resendEmail({
      ...values,
      actionedBy: email,
    })
  }

export const ResendConsentModal: FC<ResendConsentModalProps> = ({ email, closeModal, resendEmail, recipient }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendConsentForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      recipient,
    },
  })

  return email ? (
    <form onSubmit={handleSubmit(handleResendEmail(resendEmail, email))}>
      <FormLayout className={elMb11}>
        <InputWrapFull>
          <InputGroup
            {...register('recipient')}
            label="Consent Recipient"
            placeholder="Email of the recipient"
            errorMessage={errors?.recipient?.message}
            icon={errors?.recipient?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button onClick={closeModal}>Cancel</Button>
        <Button intent="primary" type="submit">
          Confirm
        </Button>
      </ButtonGroup>
    </form>
  ) : null
}

export default ResendConsentModal
