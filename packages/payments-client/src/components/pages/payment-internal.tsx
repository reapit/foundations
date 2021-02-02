import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements'
import { URLS } from '../../constants/api'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import PaymentPageContent from '../ui/payment-page-content'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { handleMerchantKeyEffect } from '../ui/payment-handlers'
import { MerchantKey } from '../../types/opayo'
import { PaymentWithPropertyModel } from '../../types/payment'

export interface PaymentInternalPageProps {
  paymentId: string
  // Inject test dependiencies
  defaultMerchantKey?: MerchantKey | null
}

const PaymentInternalPage: React.FC<PaymentInternalPageProps> = ({ paymentId, defaultMerchantKey = null }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: paymentModel, mutate: refetchPayment } = useSWR<PaymentModel>(`${URLS.PAYMENTS}/${paymentId}`)
  const { data: propertyModel } = useSWR<PropertyModel>(
    paymentModel?.propertyId ? `${URLS.PROPERTIES}/${paymentModel?.propertyId}` : null,
  )
  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey | null>(defaultMerchantKey)

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

  return <PaymentPageContent payment={payment} merchantKey={merchantKey} refetchPayment={refetchPayment} />
}

export default PaymentInternalPage
