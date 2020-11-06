import React, { useEffect, useState } from 'react'
import {
  Button,
  Section,
  H3,
  LevelRight,
  Helper,
  Loader,
  Formik,
  Form,
  FormSection,
  Input,
  GridItem,
  Grid,
  H5,
} from '@reapit/elements'
import { MerchantKey, opayoMerchantKeyService } from '../../opayo-api/merchant-key'
import { opayoCreateTransactionService } from '../../opayo-api/transactions'
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
              customerFirstName: '',
              customerLastName: '',
              address1: '',
              city: '',
              postalCode: '',
              country: '',
              cardholderName: '',
              cardNumber: '',
              expiryDate: '',
              securityCode: '',
              cardIdentifier: '',
            }}
            onSubmit={cardDetails => {
              console.log(cardDetails)
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
                    cardNumber,
                    expiryDate,
                    securityCode,
                  },
                  onTokenised: async result => {
                    if (result.success) {
                      // cardDetails.cardIdentifier = result.cardIdentifier

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
            // validationSchema={Yup.object({
            //   cardholderName: Yup.string().required('Required'),
            //   cardNumber: Yup.string().required('Required'),
            // })}
          >
            {() => (
              <Form className="form">
                <FormSection>
                  <H5>Payee Details</H5>
                  <Grid>
                    <GridItem>
                      <Input
                        id="customerFirstName"
                        type="text"
                        placeholder="Your first name here"
                        name="customerFirstName"
                        labelText="Billing First Name"
                      />
                    </GridItem>
                    <GridItem>
                      <Input
                        id="customerLastName"
                        type="text"
                        placeholder="Your second name here"
                        name="customerLastName"
                        labelText="Billing Second Name"
                      />
                    </GridItem>
                  </Grid>
                  <Grid>
                    <GridItem>
                      <Input
                        id="address1"
                        type="text"
                        placeholder="Your address first line"
                        name="address1"
                        labelText="Address First Line"
                      />
                    </GridItem>
                    <GridItem>
                      <Input id="city" type="text" placeholder="Your city here" name="city" labelText="Town / City" />
                    </GridItem>
                  </Grid>
                  <Grid>
                    <GridItem>
                      <Input
                        id="postalCode"
                        type="text"
                        placeholder="Your postcode here"
                        name="postalCode"
                        labelText="Postcode"
                      />
                    </GridItem>
                    <GridItem>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Your country here"
                        name="country"
                        labelText="Country"
                      />
                    </GridItem>
                  </Grid>
                  <H5>Card Details</H5>
                  <Grid>
                    <GridItem>
                      <Input
                        id="cardholderName"
                        type="text"
                        placeholder="Your name here"
                        name="cardholderName"
                        labelText="Cardholder Name"
                      />
                    </GridItem>
                    <GridItem>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="Your Card Number here"
                        name="cardNumber"
                        labelText="Card Number"
                      />
                    </GridItem>
                  </Grid>
                  <Grid>
                    <GridItem>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="Your Expiry Date here"
                        name="expiryDate"
                        labelText="Expires"
                      />
                    </GridItem>
                    <GridItem>
                      <Input
                        id="securityCode"
                        type="text"
                        placeholder="Your securityCode here"
                        name="securityCode"
                        labelText="Security Code"
                      />
                    </GridItem>
                  </Grid>

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
