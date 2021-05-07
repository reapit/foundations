import { Dispatch, SetStateAction } from 'react'
import { DATE_TIME_FORMAT, notification, unformatCard, unformatCardExpires } from '@reapit/elements'
import { PaymentEmailRequestModel } from './payment-request-modal'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  generateEmailPaymentRequest,
  generatePaymentApiKey,
  updatePaymentStatus,
  updatePaymentSessionStatus,
  generateEmailPaymentReceiptExternal,
  generateEmailPaymentReceiptInternal,
} from '../../services/payment'
import dayjs from 'dayjs'
import { MerchantKey } from '../../types/opayo'
import { opayoMerchantKeyService, opayoCreateTransactionService } from '../../services/opayo'
import { CardDetails } from './payment-form'
import { PaymentWithPropertyModel, UpdateStatusBody, UpdateStatusParams } from '../../types/payment'
import uuid from 'uuid/v4'
import { PaymentProvider, OpayoProvider } from '@/services/providers'

export const handlePaymentProviderEffect = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>,
  clientCode?: string | null,
) => () => {
  if (clientCode) {
    const fetchmerchantKey = async () => {
      const fetchedKey = await opayoMerchantKeyService(clientCode)
      if (fetchedKey) {
        const provider = new OpayoProvider(fetchedKey)
        setPaymentProvider(provider)
      }
      setLoading(false)
    }
    fetchmerchantKey()
    setLoading(true)
  }
}

export const handlePaymentRequestSubmit = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  handleOnClose: () => void,
) => async ({
  receipientEmail,
  recipientName,
  paymentReason,
  paymentAmount,
  paymentCurrency,
  keyExpiresAt,
  paymentId,
  _eTag,
}: PaymentEmailRequestModel) => {
  try {
    setIsLoading(true)
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session || !session.loginIdentity.clientId) throw new Error('No Reapit Connect Session is present')

    const formattedKeyExpires = dayjs(keyExpiresAt).format(DATE_TIME_FORMAT.RFC3339)

    const apiKey = await generatePaymentApiKey({
      clientCode: session.loginIdentity.clientId,
      keyExpiresAt: formattedKeyExpires,
      paymentId,
    })

    if (!apiKey) throw new Error('API key request failed')

    const updateParams = { paymentId, clientCode: session.loginIdentity.clientId, _eTag, session: apiKey.apiKey }

    const emailRequest = await generateEmailPaymentRequest(
      {
        receipientEmail,
        recipientName,
        paymentReason,
        paymentAmount,
        paymentCurrency,
        paymentExpiry: formattedKeyExpires,
      },
      updateParams,
    )

    if (!emailRequest) throw new Error('Email request failed')

    const paymentStatusUpdate = await updatePaymentStatus(
      {
        status: 'awaitingPosting',
      },
      updateParams,
    )

    if (!paymentStatusUpdate) throw new Error('Payment status update request failed')

    notification.success({
      message: 'Payment request was successfully sent by email',
    })
    setIsLoading(false)
    handleOnClose()
  } catch (err) {
    notification.error({
      message: 'Payment email request was unsuccessful',
    })
  }
}

export const onUpdateStatus = async (
  updateStatusBody: UpdateStatusBody,
  updateStatusParams: UpdateStatusParams,
  cardDetails: CardDetails,
  payment: PaymentWithPropertyModel,
  refetchPayment: () => void,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const { session } = updateStatusParams
  const { externalReference } = updateStatusBody
  const { customerFirstName, customerLastName, email } = cardDetails
  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  if (externalReference === 'rejected') {
    notification.error({
      message: 'The transaction has been rejected by our payment provider, please check your details and try again.',
    })
  }

  if (session) {
    await updatePaymentSessionStatus(updateStatusBody, updateStatusParams)
    await generateEmailPaymentReceiptExternal(emailReceiptBody, updateStatusParams)
  } else {
    await updatePaymentStatus(updateStatusBody, updateStatusParams)
    await generateEmailPaymentReceiptInternal(emailReceiptBody, updateStatusParams)
  }

  setIsLoading(false)
  refetchPayment()
}

export const handleCreateTransaction = (
  merchantKey: MerchantKey,
  payment: PaymentWithPropertyModel,
  cardDetails: CardDetails,
  paymentId: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  refetchPayment: () => void,
  session?: string,
) => async (result: any) => {
  const { customerFirstName, customerLastName, address1, city, postalCode, country } = cardDetails
  const { amount, description, clientCode, _eTag = '', id } = payment
  const updateStatusParams = { paymentId, clientCode, _eTag, session }

  if (result.success && id) {
    const transaction = await opayoCreateTransactionService(clientCode, {
      transactionType: 'Payment',
      paymentMethod: {
        card: {
          merchantSessionKey: merchantKey.merchantSessionKey,
          cardIdentifier: result.cardIdentifier,
          save: false,
        },
      },
      vendorTxCode: window.reapit.config.appEnv === 'production' ? id : `${uuid()}`,
      amount: amount ? amount * 100 : 0,
      currency: 'GBP',
      description: description || '',
      apply3DSecure: 'Disable',
      customerFirstName,
      customerLastName,
      billingAddress: {
        address1,
        city,
        postalCode,
        country,
      },
      entryMethod: 'Ecommerce',
    })

    const status = transaction && transaction?.status?.toLowerCase() === 'ok' ? 'posted' : 'rejected'
    const externalReference = transaction && transaction.transactionId ? transaction.transactionId : 'rejected'
    const updateStatusBody = { status, externalReference: externalReference }

    return await onUpdateStatus(
      updateStatusBody,
      updateStatusParams,
      cardDetails,
      payment,
      refetchPayment,
      setIsLoading,
    )
  }

  const updateStatusBody = { status, externalReference: 'rejected' }

  return await onUpdateStatus(updateStatusBody, updateStatusParams, cardDetails, payment, refetchPayment, setIsLoading)
}

export const onHandleSubmit = (
  merchantKey: MerchantKey,
  payment: PaymentWithPropertyModel,
  paymentId: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  refetchPayment: () => void,
  session?: string,
) => (cardDetails: CardDetails) => {
  const { cardholderName, cardNumber, expiryDate, securityCode } = cardDetails
  setIsLoading(true)
  window
    .sagepayOwnForm({
      merchantSessionKey: merchantKey.merchantSessionKey,
    })
    .tokeniseCardDetails({
      cardDetails: {
        cardholderName,
        cardNumber: unformatCard(cardNumber),
        expiryDate: unformatCardExpires(expiryDate),
        securityCode,
      },
      onTokenised: handleCreateTransaction(
        merchantKey,
        payment,
        cardDetails,
        paymentId,
        setIsLoading,
        refetchPayment,
        session,
      ),
    })
}
