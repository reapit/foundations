import React, { useState } from 'react'
import { Grid, GridItem } from '../Layout'
import { H5 } from '../Typography'
import { Input } from '../Input'
import { SelectBox } from '../SelectBox'
import { COUNTRY_OPTIONS } from './card-country-options'
import { CardExpiresInput } from './card-expires-input'
import { CardType, handleValidateSecureCode } from './card-helpers'
import { CardInput } from './card-input'

export interface CardInputGroupProps {
  hasBillingAddress: boolean
  whiteListTestCards?: string[]
}

export const CardInputGroup: React.FC<CardInputGroupProps> = ({ hasBillingAddress, whiteListTestCards }) => {
  const [cardType, setCardType] = useState<CardType>('unknown')
  return (
    <>
      {hasBillingAddress && (
        <>
          <H5>Billing Details</H5>
          <Grid>
            <GridItem>
              <Input
                id="customerFirstName"
                type="text"
                placeholder="Your first name here"
                name="customerFirstName"
                labelText="First Name"
                required
              />
            </GridItem>
            <GridItem>
              <Input
                id="customerLastName"
                type="text"
                placeholder="Your second name here"
                name="customerLastName"
                labelText="Second Name"
                required
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
                required
              />
            </GridItem>
            <GridItem>
              <Input id="city" type="text" placeholder="Your city here" name="city" labelText="Town / City" required />
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
                required
              />
            </GridItem>
            <GridItem>
              <SelectBox id="country" name="country" options={COUNTRY_OPTIONS} labelText="Country" required />
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <Input id="email" type="email" placeholder="example@mail.com" name="email" labelText="Email" required />
            </GridItem>
            <GridItem></GridItem>
          </Grid>
        </>
      )}
      <>
        <H5>Card Details</H5>
        <Grid>
          <GridItem>
            <CardInput
              id="cardNumber"
              name="cardNumber"
              labelText="Card Number"
              cardType={cardType}
              setCardType={setCardType}
              whiteListTestCards={whiteListTestCards}
            />
          </GridItem>
          <GridItem>
            <Input
              id="cardholderName"
              type="text"
              placeholder="Cardholder name here"
              name="cardholderName"
              labelText="Cardholder Name"
              required
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <CardExpiresInput id="expiryDate" name="expiryDate" labelText="Expires" required />
          </GridItem>
          <GridItem>
            <Input
              id="securityCode"
              type="text"
              placeholder="CSV"
              name="securityCode"
              labelText="Security Code"
              validate={handleValidateSecureCode(cardType)}
              maxLength={cardType === 'amex' ? 4 : 3}
              required
            />
          </GridItem>
        </Grid>
      </>
    </>
  )
}
