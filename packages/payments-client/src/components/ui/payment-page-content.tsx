import React, { useState } from 'react'
import { Loader, H3, Grid, H5, Section, FadeIn, IconList, H6, Button } from '@reapit/elements'
import PaymentCustomerSection from './payment-customer-section'
import PaymentForm from './payment-form'
import PropertySection from './property-section'
import { FaPoundSign, FaShoppingCart, FaStickyNote } from 'react-icons/fa'
import { PaymentLogo } from './payment-logo'
import { PaymentWithPropertyModel } from '../../types/payment'
import PaymentRequestModal from './payment-request-modal'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { PaymentProvider } from '../../services/providers'

export interface PaymentPageContentProps {
  payment: PaymentWithPropertyModel
  paymentProvider: PaymentProvider
  refetchPayment: () => void
  session?: string
}

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
  payment,
  paymentProvider,
  refetchPayment,
  session,
}: PaymentPageContentProps) => {
  const { customer, amount, description, property, id } = payment
  const [selectedPayment, setSelectedPayment] = useState<PaymentModel | null>(null)
  return (
    <>
      <Section hasPadding={false}>
        <div className="justify-between flex items-center">
          <H3 className="mb-0">Card Payment</H3>
          <PaymentLogo />
        </div>
      </Section>
      <Section hasPadding={false}>
        <Grid>
          <PaymentCustomerSection customer={customer} />
          <PropertySection property={property} />
        </Grid>
      </Section>
      <Section hasPadding={false}>
        <FadeIn>
          <H5>Payment Details</H5>
          <IconList
            items={[
              {
                icon: <FaPoundSign className="icon-list-icon" />,
                text: <H6 className="inline-block">{amount ? amount.toFixed(2) : 0}</H6>,
              },
              {
                icon: <FaShoppingCart className="icon-list-icon" />,
                text: description,
              },
              {
                icon: <FaStickyNote className="icon-list-icon" />,
                text: `Payment ref: ${id}`,
              },
            ]}
          />
        </FadeIn>
      </Section>
      {!session && payment && payment.status !== 'posted' && (
        <FadeIn>
          <H5 className="flex justify-between">
            Request Payment By Email<Button onClick={() => setSelectedPayment(payment)}>Send Email</Button>
          </H5>
          <PaymentRequestModal
            payment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            refetchPayments={refetchPayment}
          />
        </FadeIn>
      )}
      {paymentProvider && payment ? (
        <FadeIn>
          <PaymentForm
            payment={payment}
            paymentProvider={paymentProvider}
            paymentId={id as string}
            session={session}
            refetchPayment={refetchPayment}
          />
        </FadeIn>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PaymentPageContent
