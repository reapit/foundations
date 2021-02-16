import React from 'react'
import { Button, Input, DatePicker, Formik, Form } from '@reapit/elements'
import { ContactAddressModel, ContactModel } from '@reapit/foundations-ts-definitions'

export const renderForm = () => () => {
  return (
    <Form>
      <Input type="text" labelText="Name" id="name" name="name" />
      <DatePicker labelText="Date Of Birth" id="dateOfBirth" name="dateOfBirth" />
      <Input type="text" labelText="Address" id="address" name="address" />
      <Input type="text" labelText="Home" id="homePhone" name="homePhone" />
      <Input type="text" labelText="Mobile" id="mobilePhone" name="mobilePhone" />
      <Input type="email" labelText="Email" id="email" name="email" />
    </Form>
  )
}

export const combineAdress = (address: ContactAddressModel | undefined): string => {
  let addressCombined = ''
  if (!address) {
    return addressCombined
  }
  if (address.buildingNumber) {
    addressCombined = addressCombined.concat(`${address.buildingNumber}`)
  }
  if (address.buildingName) {
    addressCombined = addressCombined.concat(` ${address.buildingName}`)
  }
  if (address.line1) {
    addressCombined = addressCombined.concat(` ${address.line1}`)
  }
  if (address.line2) {
    addressCombined = addressCombined.concat(` ${address.line2}`)
  }
  if (address.line3) {
    addressCombined = addressCombined.concat(` ${address.line3}`)
  }
  if (address.line4) {
    addressCombined = addressCombined.concat(` ${address.line4}`)
  }
  if (address.postcode) {
    addressCombined = addressCombined.concat(` ${address.postcode}`)
  }
  return addressCombined
}

export const combineName = (contact: ContactModel) => {
  let nameCombined = ''
  if (!contact) {
    return nameCombined
  }
  if (contact.title) {
    nameCombined = nameCombined.concat(`${contact.title}`)
  }
  if (contact.forename) {
    nameCombined = nameCombined.concat(` ${contact.forename}`)
  }
  if (contact.surname) {
    nameCombined = nameCombined.concat(` ${contact.surname}`)
  }
  return nameCombined
}

export type PersonalDetailsProps = {
  contact: ContactModel
}

export const PersonalDetails = ({ contact }: PersonalDetailsProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${contact.title} ${contact.forename} ${contact.surname}`,
          dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth) : null,
          address: combineAdress(contact.primaryAddress),
          homePhone: contact.homePhone,
          mobilePhone: contact.mobilePhone,
          email: contact.email,
        }}
        onSubmit={values => {
          console.log(values) // TODO: will check this one again
        }}
      >
        {renderForm()}
      </Formik>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="mr-2"
          variant="primary"
          onClick={() => {
            return null
          }} // TODO: will check this one again
        >
          Submit
        </Button>
        <Button type="button" variant="primary" dataTest="submit-revision-modal-edit-button">
          Next
        </Button>
      </div>
    </div>
  )
}

export default PersonalDetails
