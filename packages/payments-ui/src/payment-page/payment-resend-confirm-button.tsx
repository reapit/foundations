import React, { FC } from 'react'
import { CardDetails } from './payment-form'
import { Button, ButtonGroup, elMb7, FormLayout, InputError, InputGroup, InputWrap } from '@reapit/elements'
import { PaymentProvider } from '../payment-provider'
import { resendConfirmationSchema } from './payment-validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { PaymentEmailReceipt } from '../types/payment'

export interface ResendConfirmButtonProps {
  paymentFormValues: CardDetails
  paymentProvider: PaymentProvider
}

export const handleOnSubmit =
  (receiptSubmit: (transaction: PaymentEmailReceipt) => Promise<boolean>, payment: PaymentModel) =>
  ({ email, customerFirstName, customerLastName }: CardDetails) => {
    receiptSubmit({
      receipientEmail: email,
      recipientName: `${customerFirstName} ${customerLastName}`,
      paymentReason: payment?.description ?? 'No Reason Provided',
      paymentAmount: payment?.amount ?? 0,
      paymentCurrency: 'GBP',
    })
  }

export const ResendConfirmButton: FC<ResendConfirmButtonProps> = ({ paymentFormValues, paymentProvider }) => {
  const { receiptAction, payment } = paymentProvider
  const { receiptLoading, receiptSubmit } = receiptAction
  const { email, customerFirstName, customerLastName } = paymentFormValues

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardDetails>({
    resolver: yupResolver(resendConfirmationSchema),
    defaultValues: {
      customerFirstName,
      customerLastName,
      email,
    },
  })

  return (
    <form onSubmit={handleSubmit(handleOnSubmit(receiptSubmit, payment))}>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup
            {...register('customerFirstName')}
            type="text"
            label="Customer First Name"
            placeholder="First name here"
          />
          {errors.customerFirstName?.message && <InputError message={errors.customerFirstName.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('customerLastName')}
            type="text"
            label="Customer Last Name"
            placeholder="Last name here"
          />
          {errors.customerLastName?.message && <InputError message={errors.customerLastName.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('email')} type="email" label="Customer Email" placeholder="Email here" />
          {errors.email?.message && <InputError message={errors.email.message} />}
        </InputWrap>
      </FormLayout>
      <ButtonGroup className={elMb7}>
        <Button intent="primary" type="submit" loading={receiptLoading} disabled={receiptLoading}>
          Re-send Confirmation
        </Button>
      </ButtonGroup>
    </form>
  )
}
