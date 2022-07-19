import React, { useState } from 'react'
import {
  Section,
  Formik,
  Form,
  CardInputGroup,
  Input,
  LevelRight,
  Button,
  Helper,
  FadeIn,
  H5,
} from '@reapit/elements-legacy'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { PaymentWithPropertyModel } from '../../types/payment'
import { ResendConfirmButton } from './payment-resend-confirm-button'
import { onHandleSubmit } from './payment-handlers'
import { PaymentProvider } from '@/services/providers'
import PaymentRequestModal from '../pages/payments/payment-request-modal'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { useSnack } from '@reapit/elements'

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

export type PaymentStatusType = 'pending' | 'rejected' | 'posted' | 'loading' | 'awaitingPosting'

const PaymentForm: React.FC<{
  payment: PaymentWithPropertyModel
  paymentId: string
  paymentProvider: PaymentProvider
  session?: string
}> = ({ payment, paymentProvider, paymentId, session }) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>(payment.status as PaymentStatusType)
  const [, setSelectedPayment] = useState<PaymentModel | null>(null)
  const { error } = useSnack()
  const onSubmit = onHandleSubmit(paymentProvider.merchantKey, payment, paymentId, setPaymentStatus, error, session)
  const { customer } = payment
  const { forename = '', surname = '', email = '', primaryAddress } = customer ?? {}
  const redirectToDashboard = () => history.push(Routes.PAYMENTS)
  const isLoading = paymentStatus === 'loading'

  const address1 = primaryAddress
    ? primaryAddress.buildingName && primaryAddress.line1
      ? `${primaryAddress.buildingName} ${primaryAddress.line1}`
      : primaryAddress.buildingNumber && primaryAddress.line1
      ? `${primaryAddress.buildingNumber} ${primaryAddress.line1}`
      : primaryAddress.buildingName || primaryAddress.buildingNumber || primaryAddress.line1 || ''
    : ''

  return (
    <>
      {!session && payment && paymentStatus !== 'posted' && (
        <FadeIn>
          <H5 className="flex justify-between">
            Request Payment By Email<Button onClick={() => setSelectedPayment(payment)}>Send Email</Button>
          </H5>
          <PaymentRequestModal closeModal={() => {}} refreshPayments={() => {}} />
        </FadeIn>
      )}
      <Formik
        initialValues={{
          customerFirstName: forename,
          customerLastName: surname,
          address1,
          city: primaryAddress?.line3 ?? primaryAddress?.line4 ?? '',
          postalCode: primaryAddress?.postcode ?? '',
          country: primaryAddress?.countryId ?? '',
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
            {paymentStatus === 'rejected' && (
              <FadeIn>
                <Helper variant="warning">
                  This payment has failed. Please check the details submitted are correct and try again.
                </Helper>
              </FadeIn>
            )}
            {paymentStatus === 'posted' && (
              <FadeIn>
                <Helper variant="info">
                  This payment has been successfully submitted and confirmation of payment has been emailed to the
                  address supplied. If no email was received, you can send again by clicking the button below.{' '}
                  {session
                    ? 'Your user session will expire in 5 minutes and you will not have access to this page again.'
                    : ''}
                </Helper>
                <Section hasPadding={false}>
                  <LevelRight>
                    {!session && !window['__REAPIT_MARKETPLACE_GLOBALS__'] && (
                      <Button variant="secondary" type="button" onClick={redirectToDashboard}>
                        Back to dashboard
                      </Button>
                    )}
                    <ResendConfirmButton payment={payment} />
                  </LevelRight>
                </Section>
              </FadeIn>
            )}
            {paymentStatus !== 'posted' && (
              <FadeIn>
                <CardInputGroup hasBillingAddress whiteListTestCards={['4929000000006']} />
                <Section hasPadding={false}>
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
    </>
  )
}

export default PaymentForm
