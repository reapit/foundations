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
import { opayoMerchantKeyService } from '../../services/opayo'
import { opayoCreateTransactionService } from '../../services/opayo'
import { CardDetails } from './payment-form'
import { PaymentWithPropertyModel, UpdateStatusBody, UpdateStatusParams } from '../../types/payment'

export const handleMerchantKeyEffect = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setMerchantKey: Dispatch<SetStateAction<MerchantKey | null>>,
  clientCode?: string | null,
) => () => {
  if (clientCode) {
    const fetchmerchantKey = async () => {
      const fetchedKey = await opayoMerchantKeyService(clientCode)
      if (fetchedKey) {
        setMerchantKey(fetchedKey)
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
      placement: 'bottomRight',
    })
    setIsLoading(false)
    handleOnClose()
  } catch (err) {
    notification.error({
      message: 'Payment email request was unsuccessful',
      placement: 'bottomRight',
    })
  }
}

export const onUpdateStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
  cardDetails: CardDetails,
  payment: PaymentWithPropertyModel,
  refetchPayment: () => void,
) => {
  const { session } = params
  const { customerFirstName, customerLastName, email } = cardDetails
  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  if (session) {
    await updatePaymentSessionStatus(body, params)
    await generateEmailPaymentReceiptExternal(emailReceiptBody, params)
  } else {
    await updatePaymentStatus(body, params)
    await generateEmailPaymentReceiptInternal(emailReceiptBody, params)
  }

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
      vendorTxCode: id,
      amount: amount || 0,
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

    const status = transaction && transaction.transactionId ? 'posted' : 'rejected'
    // TODO - work out the Opayo error code structure
    const externalReference = transaction && transaction.transactionId ? transaction.transactionId : 'rejected'
    setIsLoading(false)
    return await onUpdateStatus(
      { status, externalReference: externalReference },
      { paymentId, clientCode, _eTag, session },
      cardDetails,
      payment,
      refetchPayment,
    )
  }

  setIsLoading(false)

  return await onUpdateStatus(
    { status, externalReference: 'rejected' },
    { paymentId, clientCode, _eTag, session },
    cardDetails,
    payment,
    refetchPayment,
  )
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
