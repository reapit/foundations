import React, { useEffect, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  // Button,
  Section,
  // GridFourCol,
  Tile,
  // GridFourColItem,
  combineAddress,
  // PortalProvider,
  // Modal,
  Loader,
  H3,
  Helper,
  Grid,
  GridItem,
  H5,
} from '@reapit/elements'
import {
  // propertiesApiService,
  propertyByIdApiService,
} from '../../platform-api/properties-api'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../ui/checkout-form'
import { getStripePublicKey, StripePaymentIntentRequest } from '../../payments-api/stripe'
import { loadStripe } from '@stripe/stripe-js'
import { getAccountByCustomerCode } from '../../payments-api/account'

const stripePromise = getStripePublicKey().then(key => loadStripe(key as string))

export const openPaymentModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setVisible(true)
}

export const closePaymentModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setVisible(false)
}

const Rentals: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  // const [properties, setProperties] = useState([] as PropertyModel[])
  const [property, setProperty] = useState([] as PropertyModel)
  const [payment, setPayment] = useState(null as StripePaymentIntentRequest | null)
  // const [propertyId, setPropertyId] = useState('')
  // const [visible, setVisible] = useState<boolean>(false)
  const [isOverdue, setIsOverdue] = useState(true)
  const [accountId, setAccountId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAccountId = async () => {
      const account = await getAccountByCustomerCode(connectSession?.loginIdentity.clientId as string)
      if (account && account.accountId) {
        setAccountId(account.accountId)
      }
    }
    if (connectSession) {
      fetchAccountId()
    }
  }, [connectSession])

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     const serviceResponse = await propertiesApiService(connectSession)
  //     if (serviceResponse) {
  //       setProperties(serviceResponse)
  //     }
  //     setLoading(false)
  //   }
  //   if (connectSession) {
  //     fetchProperties()
  //   }
  //   setLoading(true)
  // }, [connectSession])

  useEffect(() => {
    const fetchPropertyById = async () => {
      const serviceResponse = await propertyByIdApiService()
      if (serviceResponse) {
        // debugger
        setProperty(serviceResponse)
        setPayment({
          currency: serviceResponse.currency || 'GBP',
          amount: serviceResponse.letting?.rent || 0,
          transfer_data: {
            destination: accountId,
          },
        })
      }
      setLoading(false)
    }
    if (connectSession) {
      fetchPropertyById()
    }
    setLoading(true)
  }, [connectSession, accountId])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <H3 isHeadingSection>Rent payment for {property.id}</H3>
      {/* <Helper variant="info">
        Select a rental from the below list to make a payment. Have your card
        details to hand.
      </Helper> */}
      {isOverdue && <Helper variant="warning">Rent is 5 days overdue for this property.</Helper>}
      {!isOverdue && <Helper variant="info">Rent now up to date for this property.</Helper>}

      {/* <PortalProvider>
        <Modal
          tapOutsideToDissmiss={true}
          visible={visible}
          afterClose={() => setVisible(false)}
          title={`Payment of ${payment?.currency} ${payment?.amount} for ${propertyId}`}
        >
          <Section>
            {payment && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  payment={payment}
                  propertyId={propertyId}
                  closeModal={() => setVisible(false)}
                />
              </Elements>
            )}
          </Section>
        </Modal>
      </PortalProvider> */}
      {property && accountId && (
        <Section>
          <Grid>
            <GridItem key={property.id}>
              <Tile
                heading={property.id}
                subHeading={combineAddress(property.address)}
                //   footerItems={
                //     [
                //     <Button
                //       type="button"
                //       // disabled={!payment}
                //       onClick={() => {
                //         setVisible(true)
                //         setPropertyId(property.id as string)
                //         setPayment({
                //           currency: property.currency || 'GBP',
                //           amount: property.letting?.rent || 0,
                //           transfer_data: {
                //             destination: accountId,
                //           },
                //         })
                //       }}
                //     >
                //       Pay Rent
                //     </Button>,
                //   ]
                // }
              >
                <p>
                  <strong>
                    {property.currency} {property.letting?.rent} {property.letting?.rentFrequency}
                  </strong>
                </p>
              </Tile>
            </GridItem>
            <GridItem>
              {payment && (
                <Section>
                  <Elements stripe={stripePromise}>
                    <H5>Card Payment</H5>
                    <CheckoutForm
                      payment={payment}
                      property={property}
                      setIsOverdue={setIsOverdue}
                      // closeModal={() => setVisible(false)}
                    />
                  </Elements>
                </Section>
              )}
            </GridItem>
          </Grid>
        </Section>
      )}
      {/* {properties && accountId && (
        <Section>
          <GridFourCol>
            {properties.map((property) => (
              <GridFourColItem key={property.id}>
                <Tile
                  heading={property.id}
                  subHeading={combineAddress(property.address)}
                  footerItems={[
                    <Button
                      type="button"
                      // disabled={!payment}
                      onClick={() => {
                        setVisible(true)
                        setPropertyId(property.id as string)
                        setPayment({
                          currency: property.currency || 'GBP',
                          amount: property.letting?.rent || 0,
                          transfer_data: {
                            destination: accountId,
                          },
                        })
                      }}
                    >
                      Pay Rent
                    </Button>,
                  ]}
                >
                  <p>
                    <strong>
                      {property.currency} {property.letting?.rent}{' '}
                      {property.letting?.rentFrequency}
                    </strong>
                  </p>
                </Tile>
              </GridFourColItem>
            ))} */}
      {/* </GridFourCol>
        </Section> */}
      {/* )} */}
    </>
  )
}

export default Rentals
