import React, { Dispatch, SetStateAction, useState } from 'react'
import { PaymentWithPropertyModel, UpdateStatusParams } from '../../types/payment'
import { generateEmailPaymentReceiptExternal, generateEmailPaymentReceiptInternal } from '../../services/payment'
import { Button, useFormikContext } from '@reapit/elements-legacy'
import { CardDetails } from './payment-form'
import { useSnack } from '@reapit/elements'

export interface ResendConfirmButtonProps {
  payment: PaymentWithPropertyModel
  session?: string
}

export const ResendConfirmButton: React.FC<ResendConfirmButtonProps> = ({
  payment,
  session,
}: ResendConfirmButtonProps) => {
  const {
    values: { email, customerFirstName, customerLastName },
  } = useFormikContext<CardDetails>()
  const [loading, setLoading] = useState<boolean>(false)
  const { error } = useSnack()

  if (!email) return null

  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  const params = {
    _eTag: payment._eTag,
    paymentId: payment.id,
    session,
    clientCode: payment.clientCode,
  } as UpdateStatusParams

  const onClick = (setLoading: Dispatch<SetStateAction<boolean>>) => async () => {
    setLoading(true)
    session
      ? await generateEmailPaymentReceiptExternal(emailReceiptBody, params, error)
      : await generateEmailPaymentReceiptInternal(emailReceiptBody, params, error)
    setLoading(false)
  }

  return (
    <Button variant="primary" type="button" onClick={onClick(setLoading)} loading={loading} disabled={loading}>
      Re-send Confirmation
    </Button>
  )
}
