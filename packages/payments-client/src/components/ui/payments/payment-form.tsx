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
  Helper,
  FadeIn,
  useFormikContext,
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
import Routes from '../../../constants/routes'
import { history } from '../../../core/router'

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
  email: string
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

export interface ResendConfirmButtonProps {
  payment: PaymentWithPropertyModel
  session?: string
}

export const ResendConfirmButton: React.FC<ResendConfirmButtonProps> = ({
  payment,
  session,
}: ResendConfirmButtonProps) => {
  const {
    values: { email, customerFirstName, customerLastName },
  } = useFormikContext<CardDetails>()
  const [loading, setLoading] = useState<boolean>(false)

  if (!email) return null

  const emailReceiptBody = {
    receipientEmail: email,
    recipientName: `${customerFirstName} ${customerLastName}`,
    paymentReason: payment?.description ?? 'No Reason Provided',
    paymentAmount: payment?.amount ?? 0,
    paymentCurrency: 'GBP',
  }

  const params = {
    _eTag: payment._eTag,
    paymentId: payment.id,
    session,
    clientCode: payment.clientCode,
  } as UpdateStatusParams

  const onClick = async () => {
    setLoading(true)
    session
      ? await generateEmailPaymentReceiptExternal(emailReceiptBody, params)
      : await generateEmailPaymentReceiptInternal(emailReceiptBody, params)
    setLoading(false)
  }

  return (
    <Button variant="primary" type="button" onClick={onClick} loading={loading} disabled={loading}>
      Re-send Confirmation
    </Button>
  )
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
  const { forename = '', surname = '', email = '', primaryAddress = {} } = customer || {}
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
        email: email,
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
                  <ResendConfirmButton payment={payment} />
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
