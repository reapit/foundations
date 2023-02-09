import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import {
  Button,
  elMb3,
  elMb5,
  Icon,
  Loader,
  PageContainer,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  Title,
  useModal,
} from '@reapit/elements'
import {
  ClientConfigModel,
  MerchantKey,
  PaymentEmailReceipt,
  PaymentPageContent,
  PaymentProvider,
  PaymentProviderInitialisers,
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
} from '@reapit/use-reapit-data'
import { useParams } from 'react-router-dom'
import { openNewPage } from '../../core/nav'
import PaymentRequestModal from '../payments/payment-request-modal'

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

export const PaymentPage: FC = () => {
  const { paymentId } = useParams<PaymentUriParams>()
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const [configNotFound, setConfigNotFound] = useState<boolean>(false)
  const { Modal, openModal, closeModal } = useModal()
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
    onError: () => {
      setConfigNotFound(true)
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

  const [receiptLoading, , receiptSubmit] = useReapitUpdate<PaymentEmailReceipt, boolean>({
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

  const { merchantKey, merchantKeyLoading } = useMerchantKey(config)
  const { transactionSubmit } = useTransaction(config)

  useEffect(
    handleSetProvider({
      paymentProvider,
      setPaymentProvider,
      config,
      payment,
      property,
      merchantKey,
      receiptAction: {
        receiptLoading,
        receiptSubmit,
      },
      statusAction: {
        statusLoading,
        statusSubmit,
      },
      transactionSubmit,
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

  if (configNotFound) {
    return (
      <PageContainer>
        <PersistentNotification intent="secondary" isFullWidth isInline isExpanded>
          The app cannnot currently process client payments. This is likely because your payment provider has not been
          configured. Please contact your Reapit Organisation Administrator or if you are an Admin, use the dedicated
          page in the main navigation.
        </PersistentNotification>
      </PageContainer>
    )
  }

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

  return (
    <>
      <SecondaryNavContainer>
        <Title>Payment</Title>
        <Icon className={elMb5} iconSize="large" icon="newCustomerInfographic" />
        <SmallText hasGreyText>
          From this page you can either send an email request for payment to the customer using the button below, or
          take a payment in person using our payment form.
        </SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
        <Button intent="secondary" disabled={status === 'posted' || configNotFound} onClick={openModal}>
          Request Payment
        </Button>
      </SecondaryNavContainer>
      <PaymentPageContent paymentProvider={paymentProvider} />
      <Modal title={`Request Payment of £${payment?.amount ? payment?.amount.toFixed(2) : 0} for ${payment?.id}`}>
        <PaymentRequestModal closeModal={closeModal} refreshPayments={refreshPayment} selectedPayment={payment} />
      </Modal>
    </>
  )
}

export default PaymentPage
