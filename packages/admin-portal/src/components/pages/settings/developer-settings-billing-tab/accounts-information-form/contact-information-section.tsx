import * as React from 'react'
import { FormHeading, FormSubHeading, Input } from '@reapit/elements'
import formFields from './form-schema/form-fields'

export type ContactInformationSectionProps = {}

const { emailField, phoneNumberField, contactField } = formFields

const ContactInformationSection: React.FC<ContactInformationSectionProps> = () => {
  return (
    <>
      <FormHeading>{emailField.heading}</FormHeading>
      <FormSubHeading>{emailField.subHeading}</FormSubHeading>
      <Input
        dataTest="email"
        type="email"
        id={emailField.name}
        name={emailField.name}
        placeholder={emailField.placeHolder}
      />
      <FormHeading>{phoneNumberField.heading}</FormHeading>
      <FormSubHeading>{phoneNumberField.subHeading}</FormSubHeading>
      <Input
        dataTest="phoneNumber"
        type="text"
        id={phoneNumberField.name}
        name={phoneNumberField.name}
        placeholder={phoneNumberField.placeHolder}
      />
      <FormHeading>{contactField.heading}</FormHeading>
      <FormSubHeading>{contactField.subHeading}</FormSubHeading>
      <Input
        dataTest="contact"
        type="text"
        id={contactField.name}
        name={contactField.name}
        placeholder={contactField.placeHolder}
      />
    </>
  )
}

export default ContactInformationSection
