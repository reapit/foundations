import React, { useState, useEffect, FC, SetStateAction, Dispatch } from 'react'
import { PaymentPageContent } from './payment-page-content'
import { PaymentWithPropertyModel } from '../../../types/payment'
import { handlePaymentProvider } from './payment-handlers'
import { Loader, PageContainer, PersistentNotification, useSnack } from '@reapit/elements'
import { PaymentParams, usePaymentsState } from '../../../core/use-payments-state'
import { getPaymentWithProperty } from '../../../services/payment'

export const handleSetPaymentWithProperty =
  (
    setPaymentWithProperty: Dispatch<SetStateAction<PaymentWithPropertyModel | null>>,
    setPaymentWithPropertyLoading: Dispatch<SetStateAction<boolean>>,
    paymentParams: PaymentParams,
    errorSnack: (message: string) => void,
  ) =>
  () => {
    const fetchPaymentWithProperty = async () => {
      const { paymentId, clientId, session } = paymentParams
      if (paymentId && clientId && session) {
        setPaymentWithPropertyLoading(true)

        const paymentWithPropertyModel = await getPaymentWithProperty(paymentParams, errorSnack)

        if (paymentWithPropertyModel && clientId) {
          setPaymentWithProperty({ ...paymentWithPropertyModel, clientCode: clientId })
        }

        setPaymentWithPropertyLoading(false)
      }
    }

    fetchPaymentWithProperty()
  }

export const PaymentExternalPage: FC = () => {
  const { paymentsDataState } = usePaymentsState()
  const [providerLoading, setProviderLoading] = useState(false)
  const [paymentWithPropertyLoading, setPaymentWithPropertyLoading] = useState(false)
  const { error: errorSnack } = useSnack()

  const { paymentProvider, paymentParams, paymentWithProperty, setPaymentProvider, setPaymentWithProperty } =
    paymentsDataState
  const { clientId } = paymentParams

  useEffect(handlePaymentProvider(setProviderLoading, setPaymentProvider, errorSnack, clientId), [
    setPaymentProvider,
    clientId,
  ])

  useEffect(
    handleSetPaymentWithProperty(setPaymentWithProperty, setPaymentWithPropertyLoading, paymentParams, errorSnack),
    [paymentParams],
  )

  if (providerLoading || paymentWithPropertyLoading) {
    return <Loader />
  }

  if (!paymentWithProperty) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          No valid session was found for this transaction. It is likely that the payment request has expired (refer to
          your email), or the payment has been made successfully. If you think you are seeing this message in error,
          please contact your agent so they can re-issue the payment request.
        </PersistentNotification>
      </PageContainer>
    )
  }

  if (!paymentProvider) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          There seems to be a problem with account with the payment provider. Please inform your agent of this issue and
          they will provide you with payment alternatives.
        </PersistentNotification>
      </PageContainer>
    )
  }

  return <PaymentPageContent />
}
