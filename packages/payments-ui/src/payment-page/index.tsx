import React, { Dispatch, FC, SetStateAction } from 'react'
import { PaymentForm } from './payment-form'
import { PaymentLogo } from './payment-logo'
import { PaymentProvider } from '../payment-provider'
import { Card, Col, elMb11, FlexContainer, Grid, Icon, PageContainer, Subtitle, Title } from '@reapit/elements'
import { combineAddress } from '@reapit/utils-common'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { useHistory } from 'react-router-dom'
import { PaymentsBackButton } from './__styles__'
import { navigate } from '../utils'

export interface PaymentPageContentProps {
  paymentProvider: PaymentProvider
}

export const handleOpenModal =
  (openModal: () => void, setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>, payment: PaymentModel) =>
  () => {
    setSelectedPayment(payment)
    openModal()
  }

export const PaymentPageContent: FC<PaymentPageContentProps> = ({ paymentProvider }) => {
  const history = useHistory()
  const { payment, property, isPortal } = paymentProvider
  const { customer, amount, description, id } = payment ?? {}
  const isDesktop = window['__REAPIT_MARKETPLACE_GLOBALS__']

  return (
    <PageContainer>
      {!isPortal && !isDesktop && (
        <PaymentsBackButton onClick={navigate(history, '/payments')}>
          <Icon icon="backSystem" intent="primary" />
        </PaymentsBackButton>
      )}
      <FlexContainer isFlexJustifyBetween>
        <Title>Card Payment</Title>
        <PaymentLogo />
      </FlexContainer>
      <Subtitle>Payment Details</Subtitle>
      <Grid className={elMb11}>
        <Col>
          <Card
            hasListCard
            listCardHeading="Payment"
            listCardSubHeading="The value and reason this transaction was raised"
            listCardItems={[
              {
                listCardItemHeading: 'Name',
                listCardItemSubHeading: amount ? amount.toFixed(2) : 0,
                listCardItemIcon: 'poundSystem',
              },
              {
                listCardItemHeading: 'Description',
                listCardItemSubHeading: description,
                listCardItemIcon: 'houseInfographic',
              },
              {
                listCardItemHeading: 'Payment Ref',
                listCardItemSubHeading: id,
                listCardItemIcon: 'listInfographic',
              },
            ]}
          />
        </Col>
        <Col>
          <Card
            hasListCard
            listCardHeading="Customer"
            listCardSubHeading="The customer eg Applicant or Tennant to be charged for this transaction"
            listCardItems={[
              {
                listCardItemHeading: 'Name',
                listCardItemSubHeading: customer?.name,
                listCardItemIcon: 'applicantInfographic',
              },
              {
                listCardItemHeading: 'Address',
                listCardItemSubHeading: combineAddress(customer?.primaryAddress),
                listCardItemIcon: 'houseInfographic',
              },
              {
                listCardItemHeading: 'Email',
                listCardItemSubHeading: customer?.email,
                listCardItemIcon: 'mailInfographic',
              },
              {
                listCardItemHeading: 'Customer Ref',
                listCardItemSubHeading: customer?.id,
                listCardItemIcon: 'listInfographic',
              },
            ]}
          />
        </Col>
        <Col>
          <Card
            hasListCard
            listCardHeading="Property"
            listCardSubHeading="The property to which this transaction relates if relevant"
            listCardItems={[
              {
                listCardItemHeading: 'Address',
                listCardItemSubHeading: combineAddress(property?.address),
                listCardItemIcon: 'houseInfographic',
              },
              {
                listCardItemHeading: 'Property Ref',
                listCardItemSubHeading: property?.id,
                listCardItemIcon: 'listInfographic',
              },
            ]}
          />
        </Col>
      </Grid>
      <PaymentForm paymentProvider={paymentProvider} />
    </PageContainer>
  )
}
