import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import {
  ClientConfigModel,
  handleLoadOpayoScript,
  MerchantKey,
  PaymentPageContent,
  PaymentProvider,
  PaymentProviderInitialisers,
} from '@reapit/payments-ui'
import { useParams } from 'react-router-dom'
import { useClientConfig, useMerchantKey, usePayment, useReceipt, useStatusUpdate, useTransaction } from './queries'
import { useLocation } from 'react-router'
import { FourOFour } from '../../core/router'
import dayjs from 'dayjs'

export interface PaymentUriParams {
  paymentId: string
}

export interface SetProviderParams extends Omit<PaymentProviderInitialisers, 'config' | 'payment' | 'merchantKey'> {
  paymentProvider: PaymentProvider | null
  setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>
  config: ClientConfigModel | null
  payment: PaymentModel | null
  merchantKey: MerchantKey | null
}

export const handleSetProvider =
  ({ config, payment, property, merchantKey, paymentProvider, setPaymentProvider, ...rest }: SetProviderParams) =>
  () => {
    const paymentHasProperty = payment?.propertyId
    const propertyFetched = !paymentHasProperty || (paymentHasProperty && property)
    const paymentHasChanged =
      paymentProvider?.payment?._eTag && payment?._eTag && paymentProvider.payment._eTag !== payment._eTag
    const providerInvalid = !paymentProvider || (paymentProvider && paymentHasChanged)

    if (config && payment && propertyFetched && merchantKey && providerInvalid) {
      const paymentProvider = new PaymentProvider({
        config,
        payment,
        property,
        merchantKey,
        ...rest,
      })
      setPaymentProvider(paymentProvider)
    }
  }

export const handleMerchantKeyRefresh =
  (merchantKey: MerchantKey | null, refreshMerchantKey: () => void, payment: PaymentModel | null) => () => {
    if (!merchantKey) return

    const expiry = dayjs(merchantKey.expiry)

    const timer = setInterval(() => {
      if (expiry.isBefore(dayjs().add(1, 'minute'))) {
        clearInterval(timer)
        refreshMerchantKey()
      }
    }, 45000)

    if (payment?.status === 'posted') {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }

export const PaymentPage: FC = () => {
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const [configLoading, setConfigLoading] = useState<boolean>(true)
  const { paymentId } = useParams<PaymentUriParams>()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const session = params.get('session')
  const clientCode = params.get('clientCode')

  const { config, configError } = useClientConfig(session, clientCode, paymentId)

  const { payment, paymentLoading, refreshPayment } = usePayment(session, clientCode, paymentId)

  const { merchantKey, merchantKeyLoading, refreshMerchantKey } = useMerchantKey(session, clientCode, paymentId)

  const { transactionSubmit } = useTransaction(session, clientCode, paymentId)

  const property = payment?.property ?? null

  const receiptAction = useReceipt(session, clientCode, paymentId)

  const statusAction = useStatusUpdate(session, clientCode, payment)

  useEffect(
    handleSetProvider({
      paymentProvider,
      setPaymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptAction,
      statusAction,
      transactionSubmit,
      refreshPayment,
      isPortal: true,
    }),
    [
      paymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptAction,
      statusAction,
      transactionSubmit,
      refreshPayment,
    ],
  )

  useEffect(handleMerchantKeyRefresh(merchantKey, refreshMerchantKey, payment), [merchantKey, payment])
  useEffect(handleLoadOpayoScript(config, setConfigLoading), [config])

  if (!session || !paymentId || !clientCode) {
    return <FourOFour />
  }

  if (configError) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          This service is currently unavailable to take payments. Please try refreshing the page and if the problem
          persists, please contact the company that requested this payment.
        </PersistentNotification>
      </PageContainer>
    )
  }

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
          We do not have any information about this payment. Please try refreshing the page and if the problem persists,
          please contact the company that requested this payment.
        </PersistentNotification>
      </PageContainer>
    )
  }

  if (!paymentProvider) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          This service is currently unavailable to take payments. Please try refreshing the page and if the problem
          persists, please contact the company that requested this payment.{' '}
        </PersistentNotification>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PaymentPageContent paymentProvider={paymentProvider} />
    </PageContainer>
  )
}

export default PaymentPage
