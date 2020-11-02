import React, { useEffect, useState } from 'react'
import {
  Button,
  Section,
  H3,
  LevelRight,
  // H5,
  Helper,
  // Alert,
  Loader,
  // Grid,
  // Content,
  // SubTitleH6,
  // GridItem,
  Formik,
  Form,
  FormSection,
  FormHeading,
  FormSubHeading,
  Input,
} from '@reapit/elements'
import { MerchantKey, opayoMerchantKeyService } from '../../opayo-api/merchant-key'
// import * as Yup from 'yup'

export const Authenticated: React.FC = () => {
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
      {merchantKey && (
        <Section isFlexColumn>
          <Formik
            initialValues={{
              cardholderName: '',
              cardNumber: '',
              expiryDate: '',
              securityCode: '',
              cardIdentifier: '',
            }}
            onSubmit={cardDetails => {
              console.log(window.sagepayOwnForm, cardDetails)
              window
                .sagepayOwnForm({
                  merchantSessionKey: merchantKey.merchantSessionKey,
                })
                .tokeniseCardDetails({
                  cardDetails: {
                    cardholderName: cardDetails.cardholderName,
                    cardNumber: cardDetails.cardNumber,
                    expiryDate: cardDetails.expiryDate,
                    securityCode: cardDetails.securityCode,
                  },
                  onTokenised: function(result) {
                    if (result.success) {
                      cardDetails.cardIdentifier = result.cardIdentifier
                      const form = document.querySelector('form')
                      if (form) {
                        form.submit()
                      }
                    } else {
                      console.log(JSON.stringify(result))
                    }
                  },
                })
            }}
            // validationSchema={Yup.object({
            //   cardholderName: Yup.string().required('Required'),
            //   cardNumber: Yup.string().required('Required'),
            // })}
          >
            {() => (
              <Form className="form">
                <FormSection>
                  <FormHeading>Account details</FormHeading>
                  <FormSubHeading>Card payment form here</FormSubHeading>
                  <Input
                    id="cardholderName"
                    type="text"
                    placeholder="Your name here"
                    name="cardholderName"
                    labelText="Cardholder Name"
                  />
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="Your Card Number here"
                    name="cardNumber"
                    labelText="Card Number"
                  />
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="Your Expiry Date here"
                    name="expiryDate"
                    labelText="Expires"
                  />
                  <Input
                    id="securityCode"
                    type="text"
                    placeholder="Your securityCode here"
                    name="securityCode"
                    labelText="Security Code"
                  />
                  <Input id="cardIdentifier" type="hidden" name="cardIdentifier" />
                  <LevelRight>
                    <Button variant="primary" type="submit">
                      Make Payment
                    </Button>
                  </LevelRight>
                </FormSection>
              </Form>
            )}
          </Formik>
        </Section>
      )}
    </>
  )
}

export default Authenticated
