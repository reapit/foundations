import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { PaymentPageContent } from './payment-page-content'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { handlePaymentProvider } from './payment-handlers'
import { Loader, PageContainer, PersistentNotification, useSnack } from '@reapit/elements'
import { usePaymentsState } from '../../../core/use-payments-state'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { PaymentWithPropertyModel } from '../../../types/payment'

export const handleSetPaymentWithProperty =
  (
    setPaymentWithProperty: Dispatch<SetStateAction<PaymentWithPropertyModel | null>>,
    paymentModel: PaymentModel | null,
    propertyModel: PropertyModel | null,
    clientId?: string | null,
  ) =>
  () => {
    if (paymentModel && propertyModel && clientId) {
      const payment: PaymentWithPropertyModel = {
        ...paymentModel,
        clientCode: clientId,
        property: propertyModel,
      }
      setPaymentWithProperty(payment)
    }
  }

export const PaymentInternalPage: FC = () => {
  const { paymentsDataState } = usePaymentsState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [providerLoading, setProviderLoading] = useState(false)
  const { error } = useSnack()

  const { paymentProvider, paymentParams, setPaymentProvider, setPaymentWithProperty } = paymentsDataState
  const { paymentId } = paymentParams
  const clientId = connectSession?.loginIdentity?.clientId

  const [payment, paymentLoading] = useReapitGet<PaymentModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPaymentById],
    uriParams: {
      paymentId,
    },
    fetchWhenTrue: [paymentId],
  })

  const propertyId = payment?.propertyId

  const [property, propertyLoading] = useReapitGet<PropertyModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPropertyById],
    uriParams: {
      propertyId,
    },
    fetchWhenTrue: [propertyId],
  })

  useEffect(handlePaymentProvider(setProviderLoading, setPaymentProvider, error, clientId), [
    setPaymentProvider,
    connectSession,
  ])

  useEffect(handleSetPaymentWithProperty(setPaymentWithProperty, payment, property, clientId), [
    payment,
    property,
    connectSession,
  ])

  if (providerLoading || paymentLoading || propertyLoading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    )
  }

  if (!paymentProvider) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          Welome to Reapit Payments portal. It seems you don&apos;t currently have an account registered with Opayo.
          Please talk to your administrator to set this up for you.
        </PersistentNotification>
      </PageContainer>
    )
  }

  return <PaymentPageContent />
}
