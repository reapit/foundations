import React from 'react'
import { Loader, H3, Grid, H5, Section, FadeIn, IconList, H6 } from '@reapit/elements'
import PaymentCustomerSection from './payment-customer-section'
import PaymentForm from './payment-form'
import PropertySection from './property-section'
import { FaPoundSign, FaShoppingCart, FaStickyNote } from 'react-icons/fa'
import { PaymentLogo } from './payment-logo'
import { PaymentWithPropertyModel } from '../../types/payment'
import { PaymentProvider } from '../../services/providers'

export interface PaymentPageContentProps {
  payment: PaymentWithPropertyModel
  paymentProvider: PaymentProvider
  session?: string
}

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
  payment,
  paymentProvider,
  session,
}: PaymentPageContentProps) => {
  const { customer, amount, description, property, id } = payment

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
      {paymentProvider && payment ? (
        <FadeIn>
          <PaymentForm payment={payment} paymentProvider={paymentProvider} paymentId={id as string} session={session} />
        </FadeIn>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PaymentPageContent
