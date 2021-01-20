import React from 'react'
import {
  Section,
  Formik,
  Form,
  CardInputGroup,
  Input,
  LevelRight,
  Button,
  unformatCard,
  unformatCardExpires,
  notification,
} from '@reapit/elements'
import { opayoCreateTransactionServiceSession } from '../../../opayo-api/transactions'
import { MerchantKey } from '../../../opayo-api/merchant-key'
import { PaymentSessionModel } from '../../pages/payment-session'
import { updatePaymentStatus, UpdateStatusBody, UpdateStatusParams } from '../../../services/payment'
import { toastMessages } from '../../../constants/toast-messages'

export const onUpdateStatus = async (body: UpdateStatusBody, params: UpdateStatusParams, result?: any) => {
  const updateStatusRes = await updatePaymentStatus(body, params)

  if (updateStatusRes) {
    if (body.status === 'posted') {
      return notification.success({
        message: toastMessages.UPDATE_PAYMENT_STATUS_POSTED,
        placement: 'bottomRight',
      })
    }
    return notification.warn({
      message: result?.description || toastMessages.UPDATE_PAYMENT_STATUS_REJECTED,
      placement: 'bottomRight',
    })
  }

  return notification.error({
    message: toastMessages.FAILED_TO_UPDATE_PAYMENT_STATUS,
    placement: 'bottomRight',
  })
}

const PaymentForm: React.FC<{
  data: PaymentSessionModel
  merchantKey: MerchantKey
  paymentId?: string
  session?: string
}> = ({ data, merchantKey, paymentId, session }) => {
  const { customer, amount, description, clientCode, externalReference = '', _eTag = '' } = data
  const { forename = '', surname = '', primaryAddress = {} } = customer || {}
  const { buildingName, buildingNumber, line1, line3, line4, postcode = '', countryId = '' } = primaryAddress
  let address1: string
  if (buildingName && line1) {
    address1 = `${buildingName} ${line1}`
  } else if (buildingNumber && line1) {
    address1 = `${buildingNumber} ${line1}`
  } else {
    address1 = buildingName || buildingNumber || line1 || ''
  }

  return (
    <Formik
      initialValues={{
        customerFirstName: forename,
        customerLastName: surname,
        address1,
        city: line3 || line4 || '',
        postalCode: postcode,
        country: countryId,
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardIdentifier: '',
      }}
      onSubmit={cardDetails => {
        const {
          cardholderName,
          cardNumber,
          expiryDate,
          securityCode,
          customerFirstName,
          customerLastName,
          address1,
          city,
          postalCode,
          country,
        } = cardDetails
        window
          .sagepayOwnForm({
            merchantSessionKey: merchantKey.merchantSessionKey,
          })
          .tokeniseCardDetails({
            cardDetails: {
              cardholderName,
              cardNumber: unformatCard(cardNumber),
              expiryDate: unformatCardExpires(expiryDate),
              securityCode,
            },
            onTokenised: async (result: any) => {
              if (result.success) {
                await opayoCreateTransactionServiceSession(clientCode || 'SBOX', {
                  transactionType: 'Payment',
                  paymentMethod: {
                    card: {
                      merchantSessionKey: merchantKey.merchantSessionKey,
                      cardIdentifier: result.cardIdentifier,
                      save: false,
                    },
                  },
                  vendorTxCode: `demotransaction-${Math.floor(Math.random() * 1000)}`,
                  amount: amount || 0,
                  currency: 'GBP',
                  description: description || '',
                  apply3DSecure: 'Disable',
                  customerFirstName,
                  customerLastName,
                  billingAddress: {
                    address1,
                    city,
                    postalCode,
                    country,
                  },
                  entryMethod: 'Ecommerce',
                })
                onUpdateStatus({ status: 'posted', externalReference }, { paymentId, clientCode, _eTag, session })
              } else {
                onUpdateStatus(
                  { status: 'rejected', externalReference },
                  { paymentId, clientCode, _eTag, session },
                  result,
                )
              }
            },
          })
      }}
    >
      {() => (
        <Form className="form">
          <CardInputGroup hasBillingAddress whiteListTestCards={['4929000000006']} />
          <Section>
            <Input id="cardIdentifier" type="hidden" name="cardIdentifier" />
            <LevelRight>
              <Button variant="primary" type="submit">
                Make Payment
              </Button>
            </LevelRight>
          </Section>
        </Form>
      )}
    </Formik>
  )
}

export default PaymentForm
