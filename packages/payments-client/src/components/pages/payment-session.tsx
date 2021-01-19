import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router'
import useSWR from 'swr'
import {
  Section,
  H3,
  Helper,
  Loader,
  Formik,
  Form,
  CardInputGroup,
  Input,
  LevelRight,
  Button,
  unformatCard,
  unformatCardExpires,
  H5,
  H6,
  Grid,
  GridItem,
  notification,
} from '@reapit/elements'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../constants/api'
import { MerchantKey, opayoSessionMerchantKeyService } from '../../opayo-api/merchant-key'
import { opayoCreateTransactionServiceSession } from '../../opayo-api/transactions'
import PaymentCustomerSection from '../ui/payments/payment-customer-section'
// import PropertySection from '../ui/payments/property-section'
import { localFetcher } from '../../utils/fetcher'
import { updatePaymentStatus, UpdateStatusBody, UpdateStatusParams } from '../../services/payment'
import { toastMessages } from '../../constants/toast-messages'

export interface PaymentSessionModel extends PaymentModel {
  clientCode: string
}

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
      message: result.description || toastMessages.UPDATE_PAYMENT_STATUS_REJECTED,
      placement: 'bottomRight',
    })
  }

  return notification.error({
    message: updateStatusRes.description || toastMessages.FAILED_TO_UPDATE_PAYMENT_STATUS,
    placement: 'bottomRight',
  })
}

export const PaymentForm: React.FC<{
  data: PaymentSessionModel
  merchantKey: MerchantKey
  paymentId: string
  session: string
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

const PaymentSessionPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>()
  const location = useLocation()
  const { search } = location
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session') || ''

  const { data: paymentData } = useSWR<{ payment: PaymentSessionModel }>(
    [`${URLS.PAYMENTS}/${paymentId}`, session],
    localFetcher,
  )
  const data = paymentData?.payment

  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey>()

  useEffect(() => {
    if (data) {
      const fetchmerchantKey = async () => {
        const fetchedKey = await opayoSessionMerchantKeyService(data.clientCode || 'SBOX')
        if (fetchedKey) {
          setMerchantKey(fetchedKey)
        }
        setLoading(false)
      }

      fetchmerchantKey()

      setLoading(true)
    }
  }, [setMerchantKey, data])

  const { customer, amount, description, externalReference, propertyId } = data || {}
  return (
    <>
      <H3 isHeadingSection>Card Payment</H3>
      <H5 isHeadingSection>Payment For {paymentId}</H5>
      {data && !merchantKey && !loading && (
        <Helper variant="info">
          Welome to Reapit Payments portal. It seems you dont currently have an account registered with Opayo. Please
          talk to your administrator to set this up for you.
        </Helper>
      )}
      {!loading && data ? (
        <Section>
          <Grid>
            <PaymentCustomerSection customer={customer} />
            {/*          <PropertySection propertyId={propertyId} />*/}
            <GridItem>
              <H5>GBP: {amount}</H5>
              <H6>Payment description: {description}</H6>
              <H6>Payment ref: {externalReference}</H6>
            </GridItem>
          </Grid>
          <H6>Payment amount: {amount} GBP</H6>
        </Section>
      ) : (
        <Loader />
      )}
      {merchantKey && data ? (
        <PaymentForm data={data} merchantKey={merchantKey} paymentId={paymentId} session={session} />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PaymentSessionPage
