import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { UpdateStatusParams } from '../../types/payment'
import { generateEmailPaymentReceiptExternal, generateEmailPaymentReceiptInternal } from '../../services/payment'
import { CardDetails } from './payment-form'
import { Button, useSnack } from '@reapit/elements'
import { usePaymentsState } from '../../core/use-payments-state'

export interface ResendConfirmButtonProps {
  paymentFormValues: CardDetails
}

export const ResendConfirmButton: FC<ResendConfirmButtonProps> = ({ paymentFormValues }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { paymentsDataState } = usePaymentsState()

  const { paymentParams, paymentWithProperty } = paymentsDataState
  const { email, customerFirstName, customerLastName } = paymentFormValues
  const { session } = paymentParams
  const { error } = useSnack()

  if (!email || !paymentWithProperty) return null

  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: paymentWithProperty?.description ?? 'No Reason Provided',
    paymentAmount: paymentWithProperty?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  const params = {
    _eTag: paymentWithProperty?._eTag,
    paymentId: paymentWithProperty?.id,
    session,
    clientCode: paymentWithProperty?.clientCode,
  } as UpdateStatusParams

  const onClick = (setLoading: Dispatch<SetStateAction<boolean>>) => async () => {
    setLoading(true)
    session
      ? await generateEmailPaymentReceiptExternal(emailReceiptBody, params, error)
      : await generateEmailPaymentReceiptInternal(emailReceiptBody, params, error)
    setLoading(false)
  }

  return (
    <Button intent="primary" type="button" onClick={onClick(setLoading)} loading={loading} disabled={loading}>
      Re-send Confirmation
    </Button>
  )
}
