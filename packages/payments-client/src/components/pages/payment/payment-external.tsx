import React, { useState, useEffect, FC, SetStateAction, Dispatch } from 'react'
import { PaymentPageContent } from './payment-page-content'
import { PaymentWithPropertyModel } from '../../../types/payment'
import { handlePaymentProvider } from './payment-handlers'
import { Loader, PageContainer, PersistentNotification, useSnack } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { usePaymentsState } from '../../../core/use-payments-state'

export const handleSetPaymentWithProperty =
  (
    setPaymentWithProperty: Dispatch<SetStateAction<PaymentWithPropertyModel | null>>,
    paymentWithPropertyModel: PaymentWithPropertyModel | null,
    clientId?: string | null,
  ) =>
  () => {
    if (paymentWithPropertyModel && clientId) {
      setPaymentWithProperty({ ...paymentWithPropertyModel, clientCode: clientId })
    }
  }

export const PaymentExternalPage: FC = () => {
  const { paymentsDataState } = usePaymentsState()
  const [providerLoading, setProviderLoading] = useState(false)
  const { error: errorSnack } = useSnack()

  const { paymentProvider, paymentParams, setPaymentProvider, setPaymentWithProperty } = paymentsDataState
  const { paymentId, clientId, session } = paymentParams

  const [paymentWithProperty, paymentWithPropertyLoading] = useReapitGet<PaymentWithPropertyModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPaymentWithPropertyById],
    headers: {
      'reapit-customer': clientId as string,
      'x-api-key': session as string,
      'api-version': '2020-01-31',
    },
    uriParams: {
      paymentId,
    },
    queryParams: {
      clientId,
      session,
    },
    fetchWhenTrue: [paymentId, clientId, session],
  })

  useEffect(handlePaymentProvider(setProviderLoading, setPaymentProvider, errorSnack, clientId), [
    setPaymentProvider,
    clientId,
  ])

  useEffect(handleSetPaymentWithProperty(setPaymentWithProperty, paymentWithProperty, clientId), [
    paymentWithProperty,
    clientId,
  ])

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
