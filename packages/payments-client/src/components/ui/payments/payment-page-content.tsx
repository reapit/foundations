import React from 'react'
import { Loader, H3, Grid, H5, Section, FadeIn, IconList, H6 } from '@reapit/elements'
import { PaymentWithPropertyModel } from '../../pages/payment-external'
import PaymentCustomerSection from './payment-customer-section'
import PaymentForm from './payment-form'
import PropertySection from './property-section'
import { MerchantKey } from '../../../opayo-api/merchant-key'
import { FaPoundSign, FaShoppingCart, FaStickyNote } from 'react-icons/fa'

export interface PropertyPageContentProps {
  payment: PaymentWithPropertyModel
  merchantKey: MerchantKey
}

const PropertyPageContent: React.FC<PropertyPageContentProps> = ({ payment, merchantKey }) => {
  const { customer, amount, description, property, id } = payment
  return (
    <>
      <H3 isHeadingSection>Card Payment</H3>
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
                text: <H6 className="inline-block">{amount?.toFixed(2)}</H6>,
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
          <PaymentForm data={payment} merchantKey={merchantKey} paymentId={id as string} />
        </FadeIn>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default PropertyPageContent
