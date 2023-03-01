import { Dispatch, SetStateAction } from 'react'
import { CachedTransaction, CardDetails, PaymentStatusType } from './payment-form'
import { v4 as uuid } from 'uuid'
import { unformatCard, unformatCardExpires } from './payment-card-helpers'
import { PaymentProvider } from '../payment-provider'
import { ThreeDSecureResponse } from '../types/opayo'
import { logger } from '@reapit/utils-react'

export const onUpdateStatus = async (
  transactionStatus: PaymentStatusType,
  paymentProvider: PaymentProvider,
  cardDetails: CardDetails,
  setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
  transactionId?: string,
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

  const updateStatusBody = {
    status: transactionStatus,
    externalReference: transactionStatus === 'posted' ? transactionId : transactionStatus,
  }

  try {
    const statusUpdate = await statusAction.statusSubmit(updateStatusBody)

    if (!statusUpdate) {
      return setTransactionProcessing(false)
    }

    if (transactionStatus === 'posted') {
      await receiptAction.receiptSubmit(emailReceiptBody)
    }
  } catch (error) {
    console.error(error)
  } finally {
    setTransactionProcessing(false)
    paymentProvider.refreshPayment()
  }
}

export const handle3DSecure = async (
  transaction: ThreeDSecureResponse,
  paymentProvider: PaymentProvider,
  cardDetails: CardDetails,
  setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
  setThreeDSecureRes: Dispatch<SetStateAction<CachedTransaction | null>>,
) => {
  const { transactionId, status } = transaction
  if (status === '3DAuth') {
    setThreeDSecureRes({ transaction, cardDetails })
  } else if (status === 'Ok') {
    onUpdateStatus('posted', paymentProvider, cardDetails, setTransactionProcessing, transactionId)
  } else {
    onUpdateStatus('rejected', paymentProvider, cardDetails, setTransactionProcessing, transactionId)
  }
}

export const handleCreateTransaction =
  (
    paymentProvider: PaymentProvider,
    cardDetails: CardDetails,
    setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
    setThreeDSecureRes: Dispatch<SetStateAction<CachedTransaction | null>>,
  ) =>
  async (result: any) => {
    const { payment, merchantKey, transactionSubmit } = paymentProvider
    const { customerFirstName, customerLastName, address1, city, postalCode, country } = cardDetails
    const { amount, description, id } = payment
    const localhost = 'http://localhost:8080'
    const dev = 'https://payments.dev.paas.reapit.cloud'
    const siteUrl = window.location.origin.includes(localhost)
      ? window.location.origin.replace(localhost, dev)
      : window.location.origin

    if (result.success && id) {
      try {
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
          apply3DSecure: 'UseMSPSetting',
          applyAvsCvcCheck: 'UseMSPSetting',
          customerFirstName,
          customerLastName,
          billingAddress: {
            address1,
            city,
            postalCode,
            country,
          },
          entryMethod: 'Ecommerce',
          strongCustomerAuthentication: {
            notificationURL: `${window.reapit.config.paymentsApiUrl}/opayo/private/notification`,
            website: siteUrl,
            browserAcceptHeader: 'text/html, application/json',
            browserJavascriptEnabled: true,
            browserJavaEnabled: false,
            browserLanguage: window.navigator.language,
            browserColorDepth: String(window.screen.colorDepth),
            browserScreenHeight: String(window.screen.height),
            browserScreenWidth: String(window.screen.width),
            browserTZ: String(new Date().getTimezoneOffset()),
            browserUserAgent: navigator.userAgent,
            challengeWindowSize: 'Small',
            threeDSRequestorChallengeInd: '03',
            requestSCAExemption: false,
            transType: 'GoodsAndServicePurchase',
            threeDSRequestorDecReqInd: 'N',
          },
        })

        return handle3DSecure(transaction, paymentProvider, cardDetails, setTransactionProcessing, setThreeDSecureRes)
      } catch (error) {
        logger(error as Error)
        paymentProvider.getMerchantKey()
        return onUpdateStatus('rejected', paymentProvider, cardDetails, setTransactionProcessing)
      }
    }

    return onUpdateStatus('rejected', paymentProvider, cardDetails, setTransactionProcessing)
  }

export const handleTransaction =
  (
    paymentProvider: PaymentProvider,
    setTransactionProcessing: Dispatch<SetStateAction<boolean>>,
    setThreeDSecureRes: Dispatch<SetStateAction<CachedTransaction | null>>,
    setThreeDSecureMessage: Dispatch<SetStateAction<string | null>>,
  ) =>
  (cardDetails: CardDetails) => {
    const { merchantKey } = paymentProvider
    const { cardholderName, cardNumber, expiryDate, securityCode } = cardDetails
    setTransactionProcessing(true)
    setThreeDSecureRes(null)
    setThreeDSecureMessage(null)

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
          paymentProvider,
          cardDetails,
          setTransactionProcessing,
          setThreeDSecureRes,
        ),
      })
  }
