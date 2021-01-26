import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../constants/api'
import { MerchantKey } from '../../opayo-api/merchant-key'
import { sessionFetcher } from '../../utils/fetcher'
import { handleMerchantKeyEffect } from '../ui/payments/payment-handlers'
import PropertyPageContent from '../ui/payments/payment-page-content'

export interface PaymentWithPropertyModel extends PaymentModel {
  clientCode: string
  property: PropertyModel
}

export interface PaymentExternalPageProps {
  session: string
  paymentId: string
  clientId: string
}

const PaymentExternalPage: React.FC<PaymentExternalPageProps> = ({ session, paymentId, clientId }) => {
  const { data, error } = useSWR<{ payment: PaymentWithPropertyModel }>(
    [`${URLS.PAYMENTS}/${paymentId}`, session, clientId],
    sessionFetcher,
  )
  const payment = data?.payment
  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey | null>(null)

  useEffect(handleMerchantKeyEffect(setLoading, setMerchantKey, clientId), [setMerchantKey, clientId])

  if (error) {
    return (
      <Helper variant="warning">
        No payment informations was found for this transaction. It is likely that the payment request has expired -
        please contact your agent so they can re-issue the payment request.
      </Helper>
    )
  }

  if (!merchantKey) {
    return (
      <Helper variant="info">
        There seems to be a problem with account with the payment provider. Please inform your agent of this issue and
        they will provide you with payment alternatives.
      </Helper>
    )
  }

  if (!payment || loading) return <Loader />

  return <PropertyPageContent payment={payment} merchantKey={merchantKey} />
}

export default PaymentExternalPage
