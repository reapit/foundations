import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements'
import { sessionFetcher } from '../../utils/fetcher'
import PropertyPageContent from '../ui/payment-page-content'
import { MerchantKey } from '../../types/opayo'
import { URLS } from '../../constants/api'
import { handleMerchantKeyEffect } from '../ui/payment-handlers'
import { PaymentWithPropertyModel } from '../../types/payment'

export interface PaymentExternalPageProps {
  session: string
  paymentId: string
  clientId: string
  // Inject test dependiencies
  defaultMerchantKey?: MerchantKey | null
}

const PaymentExternalPage: React.FC<PaymentExternalPageProps> = ({
  session,
  paymentId,
  clientId,
  defaultMerchantKey = null,
}) => {
  const { data, error, mutate: refetchPayment } = useSWR<{ payment?: PaymentWithPropertyModel; error?: string }>(
    [`${URLS.PAYMENTS}/${paymentId}`, session, clientId],
    sessionFetcher,
  )
  const paymentModel = data?.payment as PaymentWithPropertyModel
  const hasError = data?.error
  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey | null>(defaultMerchantKey)

  useEffect(handleMerchantKeyEffect(setLoading, setMerchantKey, clientId), [setMerchantKey, clientId])

  if (loading || !data) {
    return <Loader />
  }

  if (error || hasError) {
    return (
      <Helper variant="warning">
        No valid session was found for this transaction. It is likely that the payment request has expired (refer to
        your email), or the payment has been made successfully. If you think you are seeing this message in error,
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

  const payment: PaymentWithPropertyModel = {
    ...paymentModel,
    clientCode: clientId,
  }

  return (
    <PropertyPageContent
      payment={payment}
      merchantKey={merchantKey}
      session={session}
      refetchPayment={refetchPayment}
    />
  )
}

export default PaymentExternalPage
