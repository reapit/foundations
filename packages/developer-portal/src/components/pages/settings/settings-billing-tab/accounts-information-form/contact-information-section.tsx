import * as React from 'react'
import { FormHeading, FormSubHeading, Input } from '@reapit/elements'
import formFields from './form-schema/form-fields'
/*
 * TODOME(   * TODOME(disablFields)
 * get selector)
 *
 */

export type ContactInformationSectionProps = {}

const { billingEmailField, billingTelephoneField, billingKeyContactField } = formFields

const ContactInformationSection: React.FC<ContactInformationSectionProps> = () =>
  /*
   * TODOME(disablFields)
   * get selector
   */

  {
    return (
      <>
        <FormHeading>{billingEmailField.heading}</FormHeading>
        <FormSubHeading>{billingEmailField.subHeading}</FormSubHeading>
        {/*
         * TODOME(disablFields)
         * disable input
         */}
        <Input
          dataTest="email"
          type="email"
          id={billingEmailField.name}
          name={billingEmailField.name}
          placeholder={billingEmailField.placeHolder}
        />
        <FormHeading>{billingTelephoneField.heading}</FormHeading>
        <FormSubHeading>{billingTelephoneField.subHeading}</FormSubHeading>
        <Input
          dataTest="phoneNumber"
          type="text"
          id={billingTelephoneField.name}
          name={billingTelephoneField.name}
          placeholder={billingTelephoneField.placeHolder}
        />
        <FormHeading>{billingKeyContactField.heading}</FormHeading>
        <FormSubHeading>{billingKeyContactField.subHeading}</FormSubHeading>
        <Input
          dataTest="contact"
          type="text"
          id={billingKeyContactField.name}
          name={billingKeyContactField.name}
          placeholder={billingKeyContactField.placeHolder}
        />
      </>
    )
  }

export default ContactInformationSection
