import React from 'react'
import { GridItem, combineAddress, IconList, H5, FadeIn } from '@reapit/elements'
import { PaymentCustomerModel } from '@reapit/foundations-ts-definitions'
import { FaHome, FaUserAlt, FaEnvelope, FaStickyNote } from 'react-icons/fa'

const PaymentCustomerSection: React.FC<{ customer?: PaymentCustomerModel }> = ({ customer }) => {
  if (!customer) {
    return <GridItem />
  }
  const { id, name, primaryAddress, email } = customer
  const address = combineAddress(primaryAddress)

  return (
    <GridItem>
      <FadeIn>
        <H5>Customer</H5>
        <IconList
          items={[
            {
              icon: <FaUserAlt className="icon-list-icon" />,
              text: name,
            },
            {
              icon: <FaHome className="icon-list-icon" />,
              text: address,
            },
            {
              icon: <FaEnvelope className="icon-list-icon" />,
              text: email,
            },
            {
              icon: <FaStickyNote className="icon-list-icon" />,
              text: `Customer ref: ${id}`,
            },
          ]}
        />
      </FadeIn>
    </GridItem>
  )
}
export default PaymentCustomerSection
