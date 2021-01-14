import React from 'react'
import { Loader, GridItem } from '@reapit/elements'
import { PaymentCustomerModel } from '@reapit/foundations-ts-definitions'

const PaymentCustomerSection: React.FC<{ customer: PaymentCustomerModel | undefined }> = ({ customer }) => {
  if (!customer) return <Loader />
  const { id, name, primaryAddress } = customer
  const { line1, line2, line3, postcode } = primaryAddress || {}
  return (
    <GridItem>
      <div>Customer Ref: {id}</div>
      <div>{name}</div>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>{line3}</div>
      <div>{postcode}</div>
    </GridItem>
  )
}
export default PaymentCustomerSection
