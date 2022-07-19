import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Helper, Loader } from '@reapit/elements-legacy'
import { sessionFetcher } from '../../utils/fetcher'
import PropertyPageContent from '../ui/payment-page-content'
import { URLS } from '../../constants/api'
import { PaymentWithPropertyModel } from '../../types/payment'
import { PaymentProvider } from '@/services/providers'
import { handlePaymentProviderEffect } from '../ui/payment-handlers'
import { useSnack } from '@reapit/elements'

export interface PaymentExternalPageProps {
  session: string
  paymentId: string
  clientId: string
  // Inject test dependiencies
  defaultPaymentProvider?: PaymentProvider | null
}

const PaymentExternalPage: React.FC<PaymentExternalPageProps> = ({
  session,
  paymentId,
  clientId,
  defaultPaymentProvider = null,
}) => {
  const { data, error } = useSWR<{ payment?: PaymentWithPropertyModel; error?: string }>(
    [`${URLS.PAYMENTS}/${paymentId}`, session, clientId],
    sessionFetcher,
  )
  const paymentModel = data?.payment as PaymentWithPropertyModel
  const hasError = data?.error
  const [loading, setLoading] = useState(false)
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(defaultPaymentProvider)
  const { error: errorSnack } = useSnack()

  useEffect(handlePaymentProviderEffect(setLoading, setPaymentProvider, errorSnack, clientId), [
    setPaymentProvider,
    clientId,
  ])

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

  if (!paymentProvider) {
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

  return <PropertyPageContent payment={payment} paymentProvider={paymentProvider} session={session} />
}

export default PaymentExternalPage
