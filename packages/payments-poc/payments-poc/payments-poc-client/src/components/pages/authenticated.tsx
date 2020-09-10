import * as React from 'react'
import { getOauthLink } from '../../stripe-api/oauth'
import { onBoardUser } from '../../stripe-api/onboard'
import {
  Button,
  Section,
  H3,
  LevelRight,
  GridFourCol,
  Tile,
  GridFourColItem,
  combineAddress,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { propertiesApiService } from '../../platform-api/properties-api'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../ui/checkout-form'
import { getPublicStripeKey } from '../../stripe-api/payment'

const stripePromise = getPublicStripeKey({}).then((key) => loadStripe(key))

export type AuthenticatedProps = {}

export type Payment = {
  currency: string
  amount: number
}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [properties, setProperties] = React.useState([] as PropertyModel[])
  const [payment, setPayment] = React.useState(null as Payment | null)
  const [propertyId, setPropertyId] = React.useState('')

  React.useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      const serviceResponse = await propertiesApiService(connectSession)
      if (serviceResponse) {
        setProperties(serviceResponse)
      }
    }
    if (connectSession) {
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  console.log(properties)

  return (
    <>
      <H3 isHeadingSection>Reapit Payments Portal</H3>
      <Section>
        <LevelRight>
          <Button type="submit" onClick={getOauthLink}>
            Create Stripe Express Account
          </Button>
          <Button type="submit" onClick={onBoardUser}>
            Setup Stripe Payouts
          </Button>
        </LevelRight>
      </Section>
      {payment && (
        <Section>
          <Elements stripe={stripePromise}>
            <CheckoutForm payment={payment} propertyId={propertyId} />
          </Elements>
        </Section>
      )}
      {properties && (
        <Section>
          <GridFourCol>
            {properties.map((property) => (
              <GridFourColItem>
                <Tile
                  heading={property.id}
                  subHeading={combineAddress(property.address)}
                  footerItems={[
                    <Button
                      type="button"
                      onClick={() => {
                        setPropertyId(property.id as string)
                        setPayment({
                          currency: property.currency || 'GBP',
                          amount: property.letting?.rent || 0,
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
            ))}
          </GridFourCol>
        </Section>
      )}
    </>
  )
}

export default Authenticated
