import React from 'react'
import { Section, Grid, GridItem, H5, Input } from '../..'

export interface CardInputGroupProps {
  hasBillingAddress: boolean
}

export const CardInputGroup: React.FC<CardInputGroupProps> = () => {
  return (
    <>
      <Section>
        <H5>Billing Details</H5>
        <Grid>
          <GridItem>
            <Input
              id="customerFirstName"
              type="text"
              placeholder="Your first name here"
              name="customerFirstName"
              labelText="First Name"
            />
          </GridItem>
          <GridItem>
            <Input
              id="customerLastName"
              type="text"
              placeholder="Your second name here"
              name="customerLastName"
              labelText="Second Name"
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
            <Input id="country" type="text" placeholder="Your country here" name="country" labelText="Country" />
          </GridItem>
        </Grid>
      </Section>
      <Section>
        <H5>Card Details</H5>
        <Grid>
          <GridItem>
            <Input
              id="cardNumber"
              type="text"
              placeholder="Your Card Number here"
              name="cardNumber"
              labelText="Card Number"
            />
          </GridItem>
          <GridItem>
            <Input
              id="cardholderName"
              type="text"
              placeholder="Your name here"
              name="cardholderName"
              labelText="Cardholder Name"
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
      </Section>
    </>
  )
}
