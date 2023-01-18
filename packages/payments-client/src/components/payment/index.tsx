import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import {
  ClientConfigModel,
  CreateTransactionModel,
  MerchantKey,
  PaymentEmailReceipt,
  PaymentPageContent,
  PaymentProvider,
  Transaction,
  UpdateStatusBody,
  useMerchantKey,
  useTransaction,
} from '@reapit/payments-ui'
import {
  GetActionNames,
  getActions,
  useReapitGet,
  useReapitUpdate,
  updateActions,
  UpdateActionNames,
  ReapitUpdateState,
} from '@reapit/use-reapit-data'
import { useParams } from 'react-router-dom'

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
    receiptUpdate: ReapitUpdateState<PaymentEmailReceipt, boolean>,
    statusUpdate: ReapitUpdateState<UpdateStatusBody, boolean>,
    transactionSubmit: (transaction: CreateTransactionModel) => Promise<Transaction>,
    refreshPayment: () => void,
  ) =>
  () => {
    const paymentHasProperty = paymentModel?.propertyId
    const propertyFetched = !paymentHasProperty || (paymentHasProperty && propertyModel)

    if (config && paymentModel && propertyFetched && merchantKey && !paymentProvider) {
      const [receiptLoading, , receiptSubmit] = receiptUpdate
      const [statusLoading, , statusSubmit] = statusUpdate

      const receiptAction = {
        receiptLoading,
        receiptSubmit,
      }

      const statusAction = {
        statusLoading,
        statusSubmit,
      }

      const paymentProvider = new PaymentProvider(
        config,
        paymentModel,
        propertyModel,
        merchantKey,
        receiptAction,
        statusAction,
        transactionSubmit,
        refreshPayment,
      )
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

  const [payment, paymentLoading, , refreshPayment] = useReapitGet<PaymentModel>({
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

  const receiptUpdate = useReapitUpdate<PaymentEmailReceipt, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.submitPrivatePaymentReceipt],
    method: 'POST',
    headers: {
      Authorization: idToken,
      'reapit-customer': clientCode as string,
    },
    uriParams: {
      paymentId,
    },
  })

  const statusUpdate = useReapitUpdate<UpdateStatusBody, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.privatePaymentUpdate],
    method: 'PATCH',
    headers: {
      'if-match': payment?._eTag as string,
    },
    uriParams: {
      paymentId,
    },
  })

  const { merchantKey, merchantKeyLoading } = useMerchantKey(config)
  const { transactionSubmit } = useTransaction(config)

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
