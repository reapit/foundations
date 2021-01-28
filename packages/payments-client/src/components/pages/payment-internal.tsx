import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements'
import { PaymentWithPropertyModel } from './payment-external'
import { URLS } from '../../constants/api'
import { MerchantKey } from '../../opayo-api/merchant-key'
import { handleMerchantKeyEffect } from '../ui/payments/payment-handlers'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import PropertyPageContent from '../ui/payments/payment-page-content'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'

export interface PaymentInternalPageProps {
  paymentId: string
}

const PaymentInternalPage: React.FC<PaymentInternalPageProps> = ({ paymentId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: paymentModel, mutate: refetchPayment } = useSWR<PaymentModel>(`${URLS.PAYMENTS}/${paymentId}`)
  const { data: propertyModel } = useSWR<PropertyModel>(
    paymentModel?.propertyId ? `${URLS.PROPERTIES}/${paymentModel?.propertyId}` : null,
  )
  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey | null>(null)

  useEffect(handleMerchantKeyEffect(setLoading, setMerchantKey, connectSession?.loginIdentity?.clientId), [
    setMerchantKey,
    connectSession,
  ])

  if (loading || !propertyModel || !paymentModel) {
    return <Loader />
  }

  if (!merchantKey) {
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

  return <PropertyPageContent payment={payment} merchantKey={merchantKey} refetchPayment={refetchPayment} />
}

export default PaymentInternalPage
