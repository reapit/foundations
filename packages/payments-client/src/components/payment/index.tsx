import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import {
  Button,
  elMb3,
  elMb5,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Title,
  useModal,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { useParams } from 'react-router-dom'
import { openNewPage } from '../../core/nav'
import PaymentRequestModal from '../payments/payment-request-modal'
import { useConfigState } from '../../core/use-config-state'
import { Payment } from './payment'

export const PaymentPage: FC = () => {
  const { paymentId } = useParams<'paymentId'>()
  const { Modal, openModal, closeModal } = useModal()
  const { config } = useConfigState()
  const configNotConfigured = !config?.isConfigured

  const paymentRequest = useReapitGet<PaymentModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPaymentById],
    uriParams: {
      paymentId,
    },
    fetchWhenTrue: [paymentId],
  })

  const [payment, , , refreshPayment] = paymentRequest

  return (
    <>
      <SecondaryNavContainer>
        <Title>Payment</Title>
        <Icon className={elMb5} iconSize="large" icon="newCustomerInfographic" />
        <SmallText hasGreyText>
          From this page you can either send an email request for payment to the customer using the button below, or
          take a payment in person using our payment form.
        </SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
        <Button intent="primary" disabled={payment?.status === 'posted' || configNotConfigured} onClick={openModal}>
          Email Request
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <Payment paymentRequest={paymentRequest} />
      </PageContainer>
      <Modal title={`Request Payment of £${payment?.amount ? payment?.amount.toFixed(2) : 0} for ${payment?.id}`}>
        <PaymentRequestModal closeModal={closeModal} refreshPayments={refreshPayment} selectedPayment={payment} />
      </Modal>
    </>
  )
}

export default PaymentPage
