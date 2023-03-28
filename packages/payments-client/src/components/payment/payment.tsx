import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { elFadeIn, Loader, PersistentNotification } from '@reapit/elements'
import {
  ClientConfigModel,
  CreateTransactionModel,
  MerchantKey,
  PaymentEmailReceipt,
  PaymentPageContent,
  PaymentProvider,
  PaymentProviderInitialisers,
  ThreeDSecureResponse,
  UpdateStatusBody,
} from '@reapit/payments-ui'
import {
  GetActionNames,
  getActions,
  useReapitGet,
  useReapitUpdate,
  updateActions,
  UpdateActionNames,
  UpdateReturnTypeEnum,
  SendFunction,
  ReapitGetState,
} from '@reapit/use-reapit-data'
import { useConfigState } from '../../core/use-config-state'
import dayjs from 'dayjs'

export interface PaymentProps {
  paymentRequest: ReapitGetState<PaymentModel>
}

export interface SetProviderParams extends Omit<PaymentProviderInitialisers, 'config' | 'payment' | 'merchantKey'> {
  paymentProvider: PaymentProvider | null
  setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>
  config: ClientConfigModel | null
  payment: PaymentModel | null
  merchantKey?: MerchantKey
}

export const handleSetProvider =
  ({ config, payment, property, merchantKey, paymentProvider, setPaymentProvider, ...rest }: SetProviderParams) =>
  () => {
    const paymentHasProperty = payment?.propertyId
    const propertyFetched = !paymentHasProperty || (paymentHasProperty && property)
    const paymentHasChanged =
      paymentProvider?.payment?._eTag && payment?._eTag && paymentProvider.payment._eTag !== payment._eTag
    const merchantKeyHasChanged =
      paymentProvider?.merchantKey && merchantKey?.expiry && paymentProvider?.merchantKey.expiry !== merchantKey?.expiry
    const providerInvalid =
      !paymentProvider || (paymentProvider && paymentHasChanged) || (merchantKey && merchantKeyHasChanged)

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

export const handleGetMerchantKey =
  (getMerchantKey: SendFunction<void, boolean | MerchantKey>, idToken: string, config: ClientConfigModel | null) =>
  () => {
    if (idToken && config?.clientCode && config?.isConfigured) {
      getMerchantKey()
    }
  }

export const handleMerchantKeyRefresh =
  (
    merchantKey: MerchantKey | undefined,
    getMerchantKey: SendFunction<void, boolean | MerchantKey>,
    payment: PaymentModel | null,
    config: ClientConfigModel | null,
  ) =>
  () => {
    if (!merchantKey || !config?.isConfigured) return

    const expiry = dayjs(merchantKey.expiry)

    const timer = setInterval(() => {
      if (expiry.isBefore(dayjs().add(1, 'minute'))) {
        clearInterval(timer)
        getMerchantKey()
      }
    }, 45000)

    if (payment?.status === 'posted') {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }

export const handleDeleteNomTran = () => () => {
  const nomTranCode = window['__REAPIT_MARKETPLACE_GLOBALS__'] && window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode
  if (nomTranCode) {
    window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode = null
  }
}

export const Payment: FC<PaymentProps> = ({ paymentRequest }) => {
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { config, configLoading } = useConfigState()
  const configNotConfigured = !config?.isConfigured

  const clientCode = connectSession?.loginIdentity?.clientId
  const idToken = connectSession?.idToken ?? ''

  const [payment, paymentLoading, , refreshPayment] = paymentRequest
  const paymentId = payment?.id

  const propertyId = payment?.propertyId

  const [property, propertyLoading] = useReapitGet<PropertyModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPropertyById],
    uriParams: {
      propertyId,
    },
    fetchWhenTrue: [propertyId],
  })

  const [receiptLoading, , receiptSubmit] = useReapitUpdate<PaymentEmailReceipt, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.submitPrivatePaymentReceipt],
    method: 'POST',
    headers: {
      Authorization: idToken,
      'reapit-customer': clientCode as string,
      'reapit-app-id': window.reapit.config.appId,
    },
    uriParams: {
      paymentId,
    },
  })

  const [statusLoading, , statusSubmit] = useReapitUpdate<UpdateStatusBody, boolean>({
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

  const [merchantKeyLoading, merchantKey, getMerchantKey] = useReapitUpdate<void, MerchantKey>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.getOpayoMerchantKey],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
    headers: {
      Authorization: idToken,
      'reapit-customer': clientCode as string,
      'reapit-app-id': window.reapit.config.appId,
    },
  })

  const [, , transactionSubmit] = useReapitUpdate<CreateTransactionModel, ThreeDSecureResponse>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.submitOpayoTransaction],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
    headers: {
      Authorization: idToken,
      'reapit-customer': clientCode as string,
      'reapit-app-id': window.reapit.config.appId,
    },
  })

  useEffect(handleGetMerchantKey(getMerchantKey, idToken, config), [config, idToken])

  useEffect(handleMerchantKeyRefresh(merchantKey, getMerchantKey, payment, config), [merchantKey, payment, config])

  useEffect(handleDeleteNomTran(), [])

  useEffect(
    handleSetProvider({
      paymentProvider,
      setPaymentProvider,
      config,
      payment,
      property,
      merchantKey,
      getMerchantKey,
      receiptAction: {
        receiptLoading,
        receiptSubmit,
      },
      statusAction: {
        statusLoading,
        statusSubmit,
      },
      transactionSubmit: transactionSubmit as SendFunction<CreateTransactionModel, ThreeDSecureResponse>,
      refreshPayment,
      isPortal: false,
    }),
    [
      paymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptSubmit,
      statusSubmit,
      transactionSubmit,
      refreshPayment,
    ],
  )

  if (configNotConfigured && !configLoading) {
    return (
      <PersistentNotification className={elFadeIn} intent="danger" isFullWidth isInline isExpanded>
        The app cannnot currently process client payments. This is likely because your payment provider has not been
        configured. Please contact your Reapit Organisation Administrator or if you are an Admin, use the dedicated page
        in the main navigation.
      </PersistentNotification>
    )
  }

  if ((configLoading || paymentLoading || propertyLoading || merchantKeyLoading) && !paymentProvider) {
    return <Loader />
  }

  if (!payment) {
    return (
      <PersistentNotification className={elFadeIn} intent="secondary" isFullWidth isInline isExpanded>
        We do not have any information about this payment.
      </PersistentNotification>
    )
  }

  if (!paymentProvider) {
    return (
      <PersistentNotification className={elFadeIn} intent="danger" isFullWidth isInline isExpanded>
        Your payment solution has not been properly configured, please contact your Reapit Administrator if this problem
        persists.
      </PersistentNotification>
    )
  }

  return <PaymentPageContent paymentProvider={paymentProvider} />
}
