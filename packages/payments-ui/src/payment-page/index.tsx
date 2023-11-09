import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { PaymentForm } from './payment-form'
import { PaymentProvider } from '../payment-provider'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elFadeIn,
  elMb11,
  elMb7,
  elMr4,
  FlexContainer,
  Grid,
  Icon,
  PersistentNotification,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import { combineAddress } from '@reapit/utils-common'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { PaymentsBackButton } from './__styles__'
import { navigateRoute } from '../utils'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()
  const { Modal, openModal } = useModal()
  const { payment, property, isPortal, config } = paymentProvider
  const { customer, amount, description, id } = payment ?? {}
  const { companyName } = config

  useEffect(() => {
    const timer = setTimeout(() => {
      openModal()
    }, 600000) // 10 minutes
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={elFadeIn}>
      {!isPortal && (
        <PaymentsBackButton onClick={navigateRoute(navigate, '/payments')}>
          <Icon icon="chevronLeft" intent="primary" />
        </PaymentsBackButton>
      )}
      <FlexContainer>
        {isPortal && config.logoUri && <img className={elMr4} src={config.logoUri} alt="logo" height="34" />}
        <Title>Card Payment{isPortal && companyName && `, requested by ${companyName}`}</Title>
      </FlexContainer>
      <Subtitle>Payment Details{id && `, Ref: ${id}`}</Subtitle>
      <Grid className={elMb11}>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="pound" intent="default" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Payment Amount</Subtitle>
              <BodyText hasGreyText>{amount ? amount.toFixed(2) : 0}</BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="listInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Reason For Payment</Subtitle>
              <BodyText hasGreyText>{description ? description : 'Unknown'}</BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="applicantInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Customer{customer?.id && `, Ref: ${customer.id}`}</Subtitle>
              <BodyText hasGreyText>{customer?.name ? `${customer.name}` : 'Unknown'}</BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="userHouseInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Customer Address</Subtitle>
              <BodyText hasGreyText>
                {customer?.primaryAddress ? combineAddress(customer?.primaryAddress) : 'Unknown'}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="mailInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Customer Email</Subtitle>
              <BodyText hasGreyText>
                {customer?.email ? <a href={`mailto:${customer.email}`}>{customer.email}</a> : 'Unknown'}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer>
            <Icon className={elMr4} icon="houseInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Property{property?.id && `, Ref: ${property.id}`}</Subtitle>
              <BodyText hasGreyText>{property?.address ? combineAddress(property?.address) : 'Unknown'}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      </Grid>
      <PaymentForm paymentProvider={paymentProvider} />
      <Modal title="Payment Session Timeout" onModalClose={() => window.location.reload()}>
        <PersistentNotification isInline isFullWidth isExpanded intent="danger" className={elMb7}>
          You have exceeded the 10 minutes we allow to complete a transaction. For security reasons, please refresh the
          page to re-start your session.
        </PersistentNotification>
        <ButtonGroup alignment="right">
          <Button intent="primary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}
