import React, { FC } from 'react'
import { CardDetails } from './payment-form'
import { Button } from '@reapit/elements'
import { PaymentProvider } from '../payment-provider'

export interface ResendConfirmButtonProps {
  paymentFormValues: CardDetails
  paymentProvider: PaymentProvider
}

export const ResendConfirmButton: FC<ResendConfirmButtonProps> = ({ paymentFormValues, paymentProvider }) => {
  const { receiptAction, payment } = paymentProvider
  const { receiptLoading, receiptSubmit } = receiptAction
  const { email, customerFirstName, customerLastName } = paymentFormValues

  if (!email) return null

  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  const onClick = () => {
    receiptSubmit(emailReceiptBody)
  }

  return (
    <Button intent="primary" type="button" onClick={onClick} loading={receiptLoading} disabled={receiptLoading}>
      Re-send Confirmation
    </Button>
  )
}
