import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { CardInputGroup, CardInputGroupProps } from '.'
import { Form, Formik } from 'formik'
import { H6 } from '../Typography'
import { FlexContainerResponsive } from '../Layout'

export default {
  title: 'Components/CardInputGroup',
  component: CardInputGroup,
}

const initialFormValues = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  securityCode: '',
  cardIdentifier: '',
}

export const HasBillingAddress: Story<CardInputGroupProps> = (args) => (
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
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <FlexContainerResponsive isScrollable isFullHeight flexColumn>
        <CardInputGroup {...args} />
      </FlexContainerResponsive>
    </Form>
  </Formik>
)
HasBillingAddress.args = {
  hasBillingAddress: true,
}

export const HasNoBillingAddress: Story<CardInputGroupProps> = (args) => (
  <Formik
    initialValues={{
      ...initialFormValues,
    }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <FlexContainerResponsive isScrollable isFullHeight flexColumn>
        <CardInputGroup {...args} />
      </FlexContainerResponsive>
    </Form>
  </Formik>
)
HasNoBillingAddress.args = {
  hasBillingAddress: false,
}

export const HasWhiteListedTestCard: Story<CardInputGroupProps> = (args) => (
  <Formik
    initialValues={{
      ...initialFormValues,
    }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <FlexContainerResponsive isScrollable isFullHeight flexColumn>
        <CardInputGroup {...args} />
        <H6 isHeadingSection>Test Card is: 4929000000006</H6>
      </FlexContainerResponsive>
    </Form>
  </Formik>
)
HasWhiteListedTestCard.args = {
  hasBillingAddress: false,
  whiteListTestCards: ['4929000000006'],
}
