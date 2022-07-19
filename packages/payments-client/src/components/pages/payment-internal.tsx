import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements-legacy'
import { URLS } from '../../constants/api'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import PaymentPageContent from '../ui/payment-page-content'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { PaymentWithPropertyModel } from '../../types/payment'
import { PaymentProvider } from '@/services/providers'
import { handlePaymentProviderEffect } from '../ui/payment-handlers'
import { useSnack } from '@reapit/elements'

export interface PaymentInternalPageProps {
  paymentId: string
  // Inject test dependiencies
  defaultPaymentProvider?: PaymentProvider | null
}

const PaymentInternalPage: React.FC<PaymentInternalPageProps> = ({ paymentId, defaultPaymentProvider = null }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: paymentModel } = useSWR<PaymentModel>(`${URLS.PAYMENTS}/${paymentId}`)
  const { data: propertyModel } = useSWR<PropertyModel>(
    paymentModel?.propertyId ? `${URLS.PROPERTIES}/${paymentModel?.propertyId}` : null,
  )
  const [loading, setLoading] = useState(false)
  const { error } = useSnack()
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(defaultPaymentProvider)

  useEffect(
    handlePaymentProviderEffect(setLoading, setPaymentProvider, error, connectSession?.loginIdentity?.clientId),
    [setPaymentProvider, connectSession],
  )

  if (loading || !propertyModel || !paymentModel) {
    return <Loader />
  }

  if (!paymentProvider) {
    return (
      <Helper variant="info">
        Welome to Reapit Payments portal. It seems you don&apos;t currently have an account registered with Opayo.
        Please talk to your administrator to set this up for you.
      </Helper>
    )
  }

  const payment: PaymentWithPropertyModel = {
    ...paymentModel,
    clientCode: connectSession?.loginIdentity?.clientId as string,
    property: propertyModel,
  }

  return <PaymentPageContent payment={payment} paymentProvider={paymentProvider} />
}

export default PaymentInternalPage
