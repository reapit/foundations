import React from 'react'
import { Button, Input, DatePicker, Formik, Form } from '@reapit/elements'
import { ContactCommunicationModel, ContactAddressModel, ContactModel } from '@reapit/foundations-ts-definitions'

export const renderForm = () => () => {
  return (
    <Form>
      <Input type="text" labelText="Name" id="name" name="name" />
      <DatePicker labelText="Date Of Birth" id="dateOfBirth" name="dateOfBirth" />
      <Input type="text" labelText="Address" id="address" name="address" />
      <Input type="text" labelText="Home" id="home" name="home" />
      <Input type="text" labelText="Mobile" id="mobile" name="mobile" />
      <Input type="email" labelText="Email" id="email" name="email" />
    </Form>
  )
}

export const filterCommunication = (
  communications: ContactCommunicationModel[] | undefined,
  type: 'Home' | 'Mobile' | 'Work' | 'E-Mail'
) => {
  if (!communications) {
    return null
  }
  const newCommunication: ContactCommunicationModel | undefined = communications.find(
    (communication: ContactCommunicationModel) => {
      return communication.label === type
    }
  )
  if (newCommunication) {
    return newCommunication.detail
  }
  return null
}

export const combineAdress = (addresses: ContactAddressModel[] | undefined): string => {
  let addressCombined = ''
  if (!addresses || (addresses && addresses.length === 0)) {
    return addressCombined
  }
  const address = addresses[0]
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

export const PersonalDetails = ({ contact }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${contact.title} ${contact.forename} ${contact.surname}`,
          dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth) : null,
          address: combineAdress(contact.addresses),
          home: filterCommunication(contact.communications, 'Home'),
          mobile: filterCommunication(contact.communications, 'Mobile'),
          email: filterCommunication(contact.communications, 'E-Mail')
        }}
        onSubmit={values => {
          console.log(values)
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
          }}
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
