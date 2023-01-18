import { Dispatch, SetStateAction } from 'react'
import { CardDetails } from './payment-form'
import { v4 as uuid } from 'uuid'
import { unformatCard, unformatCardExpires } from './payment-card-helpers'
import { PaymentProvider } from '../payment-provider'
import { UpdateStatusBody } from '../types/payment'

export const onUpdateStatus = async (
  paymentProvider: PaymentProvider,
  cardDetails: CardDetails,
  setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
  updateStatusBody: UpdateStatusBody,
) => {
  const { statusAction, receiptAction, payment } = paymentProvider
  const { customerFirstName, customerLastName, email } = cardDetails
  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  await statusAction.statusSubmit(updateStatusBody)
  await receiptAction.receiptSubmit(emailReceiptBody)

  setTransactionProcessing(false)
}

export const handleCreateTransaction =
  (
    paymentProvider: PaymentProvider,
    cardDetails: CardDetails,
    setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
  ) =>
  async (result: any) => {
    const { payment, merchantKey, transactionSubmit } = paymentProvider
    const { customerFirstName, customerLastName, address1, city, postalCode, country } = cardDetails
    const { amount, description, id } = payment

    if (result.success && id) {
      const transaction = await transactionSubmit({
        transactionType: 'Payment',
        paymentMethod: {
          card: {
            merchantSessionKey: merchantKey.merchantSessionKey,
            cardIdentifier: result.cardIdentifier,
            save: false,
          },
        },
        vendorTxCode: window.reapit.config.appEnv === 'production' ? id : uuid(),
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

      return onUpdateStatus(paymentProvider, cardDetails, setTransactionProcessing, updateStatusBody)
    }

    const updateStatusBody = { status: 'rejected', externalReference: 'rejected' }

    return onUpdateStatus(paymentProvider, cardDetails, setTransactionProcessing, updateStatusBody)
  }

export const handleTransaction =
  (paymentProvider: PaymentProvider, setTransactionProcessing: Dispatch<SetStateAction<boolean>>) =>
  (cardDetails: CardDetails) => {
    const { merchantKey } = paymentProvider
    const { cardholderName, cardNumber, expiryDate, securityCode } = cardDetails
    setTransactionProcessing(true)

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
        onTokenised: handleCreateTransaction(paymentProvider, cardDetails, setTransactionProcessing),
      })
  }
