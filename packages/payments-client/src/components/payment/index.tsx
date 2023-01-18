import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
// import { PaymentPageContent } from './payment-page-content'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import { ClientConfigModel, MerchantKey, PaymentProvider, useMerchantKey } from '@reapit/payments-ui'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { useParams } from 'react-router-dom'

export interface PaymentUriParams {
  paymentId: string
}

export const handleSetProvider =
  (
    setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>,
    config: ClientConfigModel | null,
    paymentModel: PaymentModel | null,
    propertyModel: PropertyModel | null,
    merchantKey: MerchantKey | null,
  ) =>
  () => {
    if (config && paymentModel && merchantKey) {
      const paymentProvider = new PaymentProvider(config, paymentModel, propertyModel, merchantKey)
      setPaymentProvider(paymentProvider)
    }
  }

export const PaymentPage: FC = () => {
  const { paymentId } = useParams<PaymentUriParams>()
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const clientCode = connectSession?.loginIdentity?.clientId
  const idToken = connectSession?.idToken ?? ''

  const [config, configLoading] = useReapitGet<ClientConfigModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPaymentsClientConfig],
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
    fetchWhenTrue: [clientCode, idToken],
  })

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

  const { merchantKey, merchantKeyLoading } = useMerchantKey(config)

  useEffect(handleSetProvider(setPaymentProvider, config, payment, property, merchantKey), [
    config,
    payment,
    property,
    merchantKey,
  ])

  console.log(paymentProvider)

  if (configLoading || paymentLoading || propertyLoading || merchantKeyLoading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    )
  }

  if (!payment) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          We do not have any information about this payment.
        </PersistentNotification>
      </PageContainer>
    )
  }

  if (!config || !merchantKey) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          Your payment solution has not been properly configured, please contact your Reapit Administrator if this
          problem persists.
        </PersistentNotification>
      </PageContainer>
    )
  }

  return null
  // return <PaymentPageContent paymentWithProperty={paymentWithProperty} />
}

export default PaymentPage
