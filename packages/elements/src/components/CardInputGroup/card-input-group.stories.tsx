import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { CardInputGroup, CardInputGroupProps } from '.'
import { Form, Formik } from 'formik'
import { H6 } from '../Typography'

export default {
  title: 'Rereshed-Docs/CardInputGroup',
  component: CardInputGroup,
}

const initialFormValues = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  securityCode: '',
  cardIdentifier: '',
}

export const HasBillingAddress: Story<CardInputGroupProps> = args => (
  <Formik
    initialValues={{
      ...initialFormValues,
      customerFirstName: '',
      customerLastName: '',
      address1: '',
      city: '',
      postalCode: '',
      country: '',
    }}
    onSubmit={values => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <CardInputGroup {...args} />
      </div>
    </Form>
  </Formik>
)
HasBillingAddress.args = {
  hasBillingAddress: true,
}

export const HasNoBillingAddress: Story<CardInputGroupProps> = args => (
  <Formik
    initialValues={{
      ...initialFormValues,
    }}
    onSubmit={values => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <CardInputGroup {...args} />
      </div>
    </Form>
  </Formik>
)
HasNoBillingAddress.args = {
  hasBillingAddress: false,
}

export const HasWhiteListedTestCard: Story<CardInputGroupProps> = args => (
  <Formik
    initialValues={{
      ...initialFormValues,
    }}
    onSubmit={values => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <CardInputGroup {...args} />
        <H6 isHeadingSection>Test Card is: 4929000000006</H6>
      </div>
    </Form>
  </Formik>
)
HasWhiteListedTestCard.args = {
  hasBillingAddress: false,
  whiteListTestCards: ['4929000000006'],
}
