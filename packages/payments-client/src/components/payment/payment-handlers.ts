import { Dispatch, SetStateAction } from 'react'
import {
  updatePaymentStatus,
  updatePaymentSessionStatus,
  generateEmailPaymentReceiptExternal,
  generateEmailPaymentReceiptInternal,
} from '../../services/payment'
import { MerchantKey } from '../../types/opayo'
import { opayoMerchantKeyService, opayoCreateTransactionService } from '../../services/opayo'
import { CardDetails, PaymentStatusType } from './payment-form'
import { PaymentWithPropertyModel, UpdateStatusBody, UpdateStatusParams } from '../../types/payment'
import { v4 as uuid } from 'uuid'
import { PaymentProvider, OpayoProvider } from '../../../../payments-ui/src/types/providers'
import { unformatCard, unformatCardExpires } from './payment-card-helpers'

export const handlePaymentProvider =
  (
    setProviderLoading: Dispatch<SetStateAction<boolean>>,
    setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>,
    errorSnack: (message: string) => void,
    clientCode?: string | null,
  ) =>
  () => {
    if (clientCode) {
      const fetchmerchantKey = async () => {
        const fetchedKey = await opayoMerchantKeyService(clientCode, errorSnack)
        if (fetchedKey) {
          const provider = new OpayoProvider(fetchedKey)
          setPaymentProvider(provider)
        }
        setProviderLoading(false)
      }
      fetchmerchantKey()
      setProviderLoading(true)
    }
  }

export const onUpdateStatus = async (
  updateStatusBody: UpdateStatusBody,
  updateStatusParams: UpdateStatusParams,
  cardDetails: CardDetails,
  payment: PaymentWithPropertyModel,
  setPaymentStatus: Dispatch<SetStateAction<PaymentStatusType>>,
  errorSnack: (message: string) => void,
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
    errorSnack('The transaction has been rejected by our payment provider, please check your details and try again.')
  }

  if (session) {
    await updatePaymentSessionStatus(updateStatusBody, updateStatusParams, errorSnack)
    await generateEmailPaymentReceiptExternal(emailReceiptBody, updateStatusParams, errorSnack)
  } else {
    await updatePaymentStatus(updateStatusBody, updateStatusParams, errorSnack)
    await generateEmailPaymentReceiptInternal(emailReceiptBody, updateStatusParams, errorSnack)
  }

  setPaymentStatus('posted')
}

export const handleCreateTransaction =
  (
    merchantKey: MerchantKey,
    payment: PaymentWithPropertyModel,
    cardDetails: CardDetails,
    paymentId: string,
    setPaymentStatus: Dispatch<SetStateAction<PaymentStatusType>>,
    errorSnack: (message: string) => void,
    session?: string | null,
  ) =>
  async (result: any) => {
    const { customerFirstName, customerLastName, address1, city, postalCode, country } = cardDetails
    const { amount, description, clientCode, _eTag = '', id } = payment
    const updateStatusParams = { paymentId, clientCode, _eTag, session }

    if (result.success && id) {
      const transaction = await opayoCreateTransactionService(
        clientCode,
        {
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
        },
        errorSnack,
      )

      const status = transaction && transaction?.status?.toLowerCase() === 'ok' ? 'posted' : 'rejected'
      const externalReference = transaction && transaction.transactionId ? transaction.transactionId : 'rejected'
      const updateStatusBody = { status, externalReference: externalReference }

      return onUpdateStatus(updateStatusBody, updateStatusParams, cardDetails, payment, setPaymentStatus, errorSnack)
    }

    const updateStatusBody = { status, externalReference: 'rejected' }

    return onUpdateStatus(updateStatusBody, updateStatusParams, cardDetails, payment, setPaymentStatus, errorSnack)
  }

export const onHandleSubmit =
  (
    merchantKey: MerchantKey,
    payment: PaymentWithPropertyModel,
    paymentId: string,
    setPaymentStatus: Dispatch<SetStateAction<PaymentStatusType>>,
    errorSnack: (message: string) => void,
    session?: string | null,
  ) =>
  (cardDetails: CardDetails) => {
    const { cardholderName, cardNumber, expiryDate, securityCode } = cardDetails
    setPaymentStatus('loading')
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
          setPaymentStatus,
          errorSnack,
          session,
        ),
      })
  }
