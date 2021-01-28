import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Section,
  Formik,
  Form,
  CardInputGroup,
  Input,
  LevelRight,
  Button,
  unformatCard,
  unformatCardExpires,
  notification,
  Helper,
} from '@reapit/elements'
import { opayoCreateTransactionService } from '../../../opayo-api/transactions'
import { MerchantKey } from '../../../opayo-api/merchant-key'
import { PaymentWithPropertyModel } from '../../pages/payment-external'
import {
  updatePaymentStatus,
  updatePaymentSessionStatus,
  UpdateStatusBody,
  UpdateStatusParams,
  generateEmailPaymentReceiptExternal,
  generateEmailPaymentReceiptInternal,
} from '../../../services/payment'
import { toastMessages } from '../../../constants/toast-messages'
import Routes from '../../../constants/routes'
import { history } from '../../../core/router'
import FadeIn from '../../../../../data-warehouse/src/styles/fade-in'

export interface CardDetails {
  customerFirstName: string
  customerLastName: string
  address1: string
  city: string
  postalCode: string
  country: string
  cardholderName: string
  cardNumber: string
  expiryDate: string
  securityCode: string
  cardIdentifier: string
}

export const onUpdateStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
  payment: PaymentWithPropertyModel,
  refetchPayment: () => void,
  result?: any,
) => {
  const { session } = params

  const updateStatusRes = session
    ? await updatePaymentSessionStatus(body, params)
    : await updatePaymentStatus(body, params)

  if (updateStatusRes) {
    if (body.status === 'posted') {
      notification.success({
        message: toastMessages.UPDATE_PAYMENT_STATUS_POSTED,
        placement: 'bottomRight',
      })
    } else {
      notification.warn({
        message: result?.description || toastMessages.UPDATE_PAYMENT_STATUS_REJECTED,
        placement: 'bottomRight',
      })
    }
  }

  const emailReceiptBody = {
    receipientEmail: payment?.customer?.email ?? 'willmcvay@pm.me',
    recipientName: payment?.customer?.name ?? 'Name Unknown',
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  const emailReceiptRes = session
    ? await generateEmailPaymentReceiptExternal(emailReceiptBody, params)
    : await generateEmailPaymentReceiptInternal(emailReceiptBody, params)

  if (emailReceiptRes) {
    if (body.status === 'posted') {
      notification.success({
        message: toastMessages.UPDATE_PAYMENT_STATUS_POSTED,
        placement: 'bottomRight',
      })
    } else {
      notification.warn({
        message: result?.description || toastMessages.UPDATE_PAYMENT_STATUS_REJECTED,
        placement: 'bottomRight',
      })
    }
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
  const { amount, description, clientCode, externalReference = '', _eTag = '' } = payment
  if (result.success) {
    const transaction = await opayoCreateTransactionService(clientCode, {
      transactionType: 'Payment',
      paymentMethod: {
        card: {
          merchantSessionKey: merchantKey.merchantSessionKey,
          cardIdentifier: result.cardIdentifier,
          save: false,
        },
      },
      vendorTxCode: `demotransaction-${Math.floor(Math.random() * 1000)}`,
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

    if (transaction && transaction.retrievalReference) {
      await onUpdateStatus(
        { status: 'posted', externalReference: transaction.transactionId },
        { paymentId, clientCode, _eTag, session },
        payment,
        refetchPayment,
      )
    } else {
      await onUpdateStatus(
        { status: 'rejected', externalReference },
        { paymentId, clientCode, _eTag, session },
        payment,
        refetchPayment,
        result,
      )
    }
  } else {
    await onUpdateStatus(
      { status: 'rejected', externalReference },
      { paymentId, clientCode, _eTag, session },
      payment,
      refetchPayment,
      result,
    )
  }
  setIsLoading(false)
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

const PaymentForm: React.FC<{
  payment: PaymentWithPropertyModel
  merchantKey: MerchantKey
  paymentId: string
  session?: string
  refetchPayment: () => void
}> = ({ payment, merchantKey, paymentId, session, refetchPayment }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onSubmit = onHandleSubmit(merchantKey, payment, paymentId, setIsLoading, refetchPayment, session)
  const { customer, status } = payment
  const { forename = '', surname = '', primaryAddress = {} } = customer || {}
  const { buildingName, buildingNumber, line1, line3, line4, postcode = '', countryId = '' } = primaryAddress
  const redirectToDashboard = () => history.push(Routes.PAYMENTS)
  const address1 =
    buildingName && line1
      ? `${buildingName} ${line1}`
      : buildingNumber && line1
      ? `${buildingNumber} ${line1}`
      : buildingName || buildingNumber || line1 || ''

  return (
    <Formik
      initialValues={{
        customerFirstName: forename,
        customerLastName: surname,
        address1,
        city: line3 || line4 || '',
        postalCode: postcode,
        country: countryId,
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardIdentifier: '',
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="form">
          {status === 'rejected' && (
            <FadeIn>
              <Helper variant="warning">
                This payment has failed. Please check the details submitted are correct and try again.
              </Helper>
            </FadeIn>
          )}
          {status === 'posted' && (
            <FadeIn>
              <Helper variant="info">
                This payment has been successfully submitted and confirmation of payment has been emailed to the address
                supplied. If no email was received, you can send again by clicking the button below.
              </Helper>
              <Section>
                <LevelRight>
                  {!session && (
                    <Button variant="secondary" type="button" onClick={redirectToDashboard}>
                      Back to dashboard
                    </Button>
                  )}
                  <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading}>
                    Re-send Confirmation
                  </Button>
                </LevelRight>
              </Section>
            </FadeIn>
          )}
          {status !== 'posted' && (
            <FadeIn>
              <CardInputGroup hasBillingAddress whiteListTestCards={['4929000000006']} />
              <Section>
                <LevelRight>
                  <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading}>
                    Make Payment
                  </Button>
                </LevelRight>
              </Section>
              <Input id="cardIdentifier" type="hidden" name="cardIdentifier" />
            </FadeIn>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default PaymentForm
