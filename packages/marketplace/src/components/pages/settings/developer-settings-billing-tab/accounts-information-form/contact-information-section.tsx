import * as React from 'react'
import { GridItem, FormHeading, FormSubHeading, Input } from '@reapit/elements'

export type ContactInformationSectionProps = {}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = () => {
  return (
    <>
      <GridItem>
        <FormHeading>Accounts Email</FormHeading>
        <FormSubHeading>
          This email will be used by our Accounts Department to send any account related correspondence
        </FormSubHeading>
        <Input dataTest="email" type="email" id="email" name="email" placeholder="Please enter email address" />
      </GridItem>
      <GridItem>
        <FormHeading>Accounts Telephone</FormHeading>
        <FormSubHeading>
          If you have a specific telephone number for your accounts department, please enter here
        </FormSubHeading>
        <Input
          dataTest="phoneNumber"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Please enter telephone number"
        />
      </GridItem>
      <GridItem>
        <FormHeading>Accounts Contact</FormHeading>
        <FormSubHeading>If you have a key contact in your Accounts Department, please enter here</FormSubHeading>
        <Input dataTest="contact" type="text" id="contact" name="contact" placeholder="Please enter contact" />
      </GridItem>
    </>
  )
}

export default ContactInformationSection
