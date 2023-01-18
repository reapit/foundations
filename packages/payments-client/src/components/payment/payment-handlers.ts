// import { Dispatch, SetStateAction } from 'react'
// import { updatePaymentStatus, generateEmailPaymentReceipt } from '../../services/payment'

// import {
//   PaymentWithPropertyModel,
//   UpdateStatusBody,
//   UpdateStatusParams,
//   opayoCreateTransactionService,
//   MerchantKey,
// } from '@reapit/payments-ui'
// import { v4 as uuid } from 'uuid'
// import { unformatCard, unformatCardExpires } from './payment-card-helpers'

// export const onUpdateStatus = async (
//   updateStatusBody: UpdateStatusBody,
//   updateStatusParams: UpdateStatusParams,
//   cardDetails: CardDetails,
//   payment: PaymentWithPropertyModel,
//   setPaymentStatus: Dispatch<SetStateAction<PaymentStatusType>>,
//   errorSnack: (message: string) => void,
// ) => {
//   const { externalReference } = updateStatusBody
//   const { customerFirstName, customerLastName, email } = cardDetails
//   const emailReceiptBody = {
//     receipientEmail: email,
//     recipientName: `${customerFirstName} ${customerLastName}`,
//     paymentReason: payment?.description ?? 'No Reason Provided',
//     paymentAmount: payment?.amount ?? 0,
//     paymentCurrency: 'GBP',
//   }

//   if (externalReference === 'rejected') {
//     errorSnack('The transaction has been rejected by our payment provider, please check your details and try again.')
//   }

//   await updatePaymentStatus(updateStatusBody, updateStatusParams, errorSnack)
//   await generateEmailPaymentReceipt(emailReceiptBody, updateStatusParams, errorSnack)

//   setPaymentStatus('posted')
// }

// export const handleCreateTransaction =
//   (
//     merchantKey: MerchantKey,
//     payment: PaymentWithPropertyModel,
//     cardDetails: CardDetails,
//     paymentId: string,
//     setPaymentStatus: Dispatch<SetStateAction<PaymentStatusType>>,
//     errorSnack: (message: string) => void,
//     session?: string | null,
//   ) =>
//   async (result: any) => {
//     const { customerFirstName, customerLastName, address1, city, postalCode, country } = cardDetails
//     const { amount, description, clientCode, _eTag = '', id } = payment
//     const updateStatusParams = { paymentId, clientCode, _eTag, session }

//     if (result.success && id) {
//       const transaction = await opayoCreateTransactionService(
//         clientCode,
//         {
//           transactionType: 'Payment',
//           paymentMethod: {
//             card: {
//               merchantSessionKey: merchantKey.merchantSessionKey,
//               cardIdentifier: result.cardIdentifier,
//               save: false,
//             },
//           },
//           vendorTxCode: window.reapit.config.appEnv === 'production' ? id : `${uuid()}`,
//           amount: amount ? amount * 100 : 0,
//           currency: 'GBP',
//           description: description || '',
//           apply3DSecure: 'Disable',
//           customerFirstName,
//           customerLastName,
//           billingAddress: {
//             address1,
//             city,
//             postalCode,
//             country,
//           },
//           entryMethod: 'Ecommerce',
//         },
//         errorSnack,
//       )

//       const status = transaction && transaction?.status?.toLowerCase() === 'ok' ? 'posted' : 'rejected'
//       const externalReference = transaction && transaction.transactionId ? transaction.transactionId : 'rejected'
//       const updateStatusBody = { status, externalReference: externalReference }

//       return onUpdateStatus(updateStatusBody, updateStatusParams, cardDetails, payment, setPaymentStatus, errorSnack)
//     }

//     const updateStatusBody = { status, externalReference: 'rejected' }

//     return onUpdateStatus(updateStatusBody, updateStatusParams, cardDetails, payment, setPaymentStatus, errorSnack)
//   }

// export const onHandleSubmit =
//   (
//     merchantKey: MerchantKey,
//     payment: PaymentWithPropertyModel,
//     paymentId: string,
//   ) =>
//   (cardDetails: CardDetails) => {
//     const { cardholderName, cardNumber, expiryDate, securityCode } = cardDetails
//     setPaymentStatus('loading')
//     window
//       .sagepayOwnForm({
//         merchantSessionKey: merchantKey.merchantSessionKey,
//       })
//       .tokeniseCardDetails({
//         cardDetails: {
//           cardholderName,
//           cardNumber: unformatCard(cardNumber),
//           expiryDate: unformatCardExpires(expiryDate),
//           securityCode,
//         },
//         onTokenised: handleCreateTransaction(
//           merchantKey,
//           payment,
//           cardDetails,
//           paymentId,
//           setPaymentStatus,
//           errorSnack,
//           session,
//         ),
//       })
//   }
