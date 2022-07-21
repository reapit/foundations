import React, { Dispatch, FC, SetStateAction } from 'react'
import { PaymentForm } from './payment-form'
import { PaymentLogo } from './payment-logo'
import { PaymentWithPropertyModel } from '../../../types/payment'
import { PaymentProvider } from '../../../services/providers'
import { usePaymentsState } from '../../../core/use-payments-state'
import {
  Card,
  CardListItemProps,
  Col,
  elMb11,
  FlexContainer,
  Grid,
  Icon,
  PageContainer,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import { combineAddress } from '@reapit/utils-common'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import PaymentRequestModal from '../payments/payment-request-modal'
import { navigate } from '../../../core/nav'
import { Routes } from '../../../constants/routes'
import { useHistory } from 'react-router-dom'
import { PaymentsBackButton } from './__styles__'

export interface PaymentPageContentProps {
  payment: PaymentWithPropertyModel
  paymentProvider: PaymentProvider
  session?: string
}

export const handleOpenModal =
  (openModal: () => void, setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>, payment: PaymentModel) =>
  () => {
    setSelectedPayment(payment)
    openModal()
  }

export const PaymentPageContent: FC = () => {
  const history = useHistory()
  const { paymentsDataState } = usePaymentsState()
  const { Modal, openModal, closeModal } = useModal()
  const { paymentProvider, paymentWithProperty, paymentParams, selectedPayment, setSelectedPayment } = paymentsDataState
  const { customer, amount, description, property, id } = paymentWithProperty ?? {}
  const isDesktop = window['__REAPIT_MARKETPLACE_GLOBALS__']

  return (
    <PageContainer>
      {!paymentParams.session && !isDesktop && (
        <PaymentsBackButton onClick={navigate(history, Routes.PAYMENTS)}>
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
            listCardItems={
              [
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
                !paymentParams.session &&
                  paymentWithProperty &&
                  paymentWithProperty.status !== 'posted' && {
                    listCardItemHeading: 'Request Payment by Email',
                    listCardItemSubHeading: id,
                    listCardItemIcon: 'mailInfographic',
                    onClick: handleOpenModal(openModal, setSelectedPayment, paymentWithProperty),
                  },
              ].filter(Boolean) as CardListItemProps[]
            }
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
      {paymentProvider && paymentWithProperty && <PaymentForm />}
      <Modal
        title={`Request Payment of £${selectedPayment?.amount ? selectedPayment?.amount.toFixed(2) : 0} for ${
          selectedPayment?.id
        }`}
      >
        <PaymentRequestModal closeModal={closeModal} />
      </Modal>
    </PageContainer>
  )
}
