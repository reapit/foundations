import React from 'react'
import { Loader, H3, Grid, H5, Section, FadeIn, IconList, H6 } from '@reapit/elements'
import PaymentCustomerSection from './payment-customer-section'
import PaymentForm from './payment-form'
import PropertySection from './property-section'
import { FaPoundSign, FaShoppingCart, FaStickyNote } from 'react-icons/fa'
import { PaymentLogo } from './payment-logo'
import { MerchantKey } from '../../types/opayo'
import { PaymentWithPropertyModel } from '../../types/payment'

export interface PaymentPageContentProps {
  payment: PaymentWithPropertyModel
  merchantKey: MerchantKey
  refetchPayment: () => void
  session?: string
}

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
  payment,
  merchantKey,
  refetchPayment,
  session,
}: PaymentPageContentProps) => {
  const { customer, amount, description, property, id } = payment
  return (
    <>
      <H3 className="flex justify-between" isHeadingSection>
        Card Payment <PaymentLogo />
      </H3>
      <Section>
        <Grid>
          <PaymentCustomerSection customer={customer} />
          <PropertySection property={property} />
        </Grid>
      </Section>
      <Section>
        <FadeIn>
          <H5>Payment Details</H5>
          <IconList
            items={[
              {
                icon: <FaPoundSign className="icon-list-icon" />,
                text: <H6 className="inline-block">{amount ? (amount / 100).toFixed(2) : 0}</H6>,
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
      {merchantKey && payment ? (
        <FadeIn>
          <PaymentForm
            payment={payment}
            merchantKey={merchantKey}
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
