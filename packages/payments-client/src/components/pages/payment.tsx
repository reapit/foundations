import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
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
} from '@reapit/elements'
import { URLS } from '../../constants/api'
import { MerchantKey, opayoMerchantKeyService } from '../../opayo-api/merchant-key'
import { opayoCreateTransactionService } from '../../opayo-api/transactions'
import { PaymentModel } from '@reapit/foundations-ts-definitions'

export const PaymentForm: React.FC<{ data: PaymentModel; merchantKey: MerchantKey }> = ({ data, merchantKey }) => {
  const customer = data.customer || {}
  const { forename = '', surname = '', primaryAddress = {} } = customer
  const { buildingName, buildingNumber, line1, line3, line4, postcode = '', countryId = '' } = primaryAddress
  let address1
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
            onTokenised: async result => {
              if (result.success) {
                const payment = await opayoCreateTransactionService({
                  transactionType: 'Payment',
                  paymentMethod: {
                    card: {
                      merchantSessionKey: merchantKey.merchantSessionKey,
                      cardIdentifier: result.cardIdentifier,
                      save: false,
                    },
                  },
                  vendorTxCode: `demotransaction-${Math.floor(Math.random() * 1000)}`,
                  amount: 1000,
                  currency: 'GBP',
                  description: 'Rent payment',
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

                console.log('payment result is', payment)
              } else {
                console.log(JSON.stringify(result))
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

const PaymentPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>()
  const { data } = useSWR(`${URLS.PAYMENTS}/${paymentId}`)
  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey>()

  useEffect(() => {
    const fetchmerchantKey = async () => {
      const fetchedKey = await opayoMerchantKeyService()
      if (fetchedKey) {
        setMerchantKey(fetchedKey)
      }
      setLoading(false)
    }

    fetchmerchantKey()

    setLoading(true)
  }, [setMerchantKey])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <H3 isHeadingSection>Reapit Payments</H3>
      {!merchantKey && (
        <Helper variant="info">
          Welome to Reapit Payments portal. It seems you dont currently have an account registered with Opayo. Please
          talk to your administrator to set this up for you.
        </Helper>
      )}
      {merchantKey && data ? <PaymentForm data={data} merchantKey={merchantKey} /> : <Loader />}
    </>
  )
}

export default PaymentPage
