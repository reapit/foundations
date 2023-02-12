import React, { FC } from 'react'
import { PageContainer } from '@reapit/elements'
import { MaxWidthContainer } from './__styles__'
import { Payment } from './payment'

export const PaymentPage: FC = () => {
  return (
    <MaxWidthContainer>
      <PageContainer>
        <Payment />
      </PageContainer>
    </MaxWidthContainer>
  )
}

export default PaymentPage
