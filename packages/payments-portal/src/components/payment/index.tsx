import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import {
  ClientConfigModel,
  CreateTransactionModel,
  MerchantKey,
  PaymentPageContent,
  PaymentProvider,
  ReceiptAction,
  StatusAction,
  Transaction,
  useMerchantKey,
  useTransaction,
} from '@reapit/payments-ui'
import { useParams } from 'react-router-dom'
import { useClientConfig, usePayment, useReceipt, useStatusUpdate } from './queries'
import { useLocation } from 'react-router'

export interface PaymentUriParams {
  paymentId: string
}

export const handleSetProvider =
  (
    paymentProvider: PaymentProvider | null,
    setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>,
    config: ClientConfigModel | null,
    paymentModel: PaymentModel | null,
    propertyModel: PropertyModel | null,
    merchantKey: MerchantKey | null,
    receiptAction: ReceiptAction,
    statusAction: StatusAction,
    transactionSubmit: (transaction: CreateTransactionModel) => Promise<Transaction>,
    refreshPayment: () => void,
  ) =>
  () => {
    const paymentHasProperty = paymentModel?.propertyId
    const propertyFetched = !paymentHasProperty || (paymentHasProperty && propertyModel)

    if (config && paymentModel && propertyFetched && merchantKey && !paymentProvider) {
      const paymentProvider = new PaymentProvider(
        config,
        paymentModel,
        propertyModel,
        merchantKey,
        receiptAction,
        statusAction,
        transactionSubmit,
        refreshPayment,
        true,
      )
      setPaymentProvider(paymentProvider)
    }
  }

export const PaymentPage: FC = () => {
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const { paymentId } = useParams<PaymentUriParams>()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const session = params.get('session')
  const clientCode = params.get('clientCode')

  const { config, configLoading } = useClientConfig(session, clientCode, paymentId)

  const { payment, paymentLoading, refreshPayment } = usePayment(session, clientCode, paymentId)

  const { merchantKey, merchantKeyLoading } = useMerchantKey(config)

  const { transactionSubmit } = useTransaction(config)

  const property = payment?.property ?? null

  const receiptUpdate = useReceipt(session, clientCode, paymentId)

  const statusUpdate = useStatusUpdate(session, clientCode, payment)

  useEffect(
    handleSetProvider(
      paymentProvider,
      setPaymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptUpdate,
      statusUpdate,
      transactionSubmit,
      refreshPayment,
    ),
    [
      paymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptUpdate,
      statusUpdate,
      transactionSubmit,
      refreshPayment,
    ],
  )

  if (configLoading || paymentLoading || merchantKeyLoading) {
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

  if (!paymentProvider) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          Your payment solution has not been properly configured, please contact your Reapit Administrator if this
          problem persists.
        </PersistentNotification>
      </PageContainer>
    )
  }

  return <PaymentPageContent paymentProvider={paymentProvider} />
}

export default PaymentPage
