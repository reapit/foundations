import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CardInputGroup } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'
import { H6 } from '../Typography'

storiesOf('CardInputGroup', module)
  .add('HasBillingAddress', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{
          customerFirstName: '',
          customerLastName: '',
          address1: '',
          city: '',
          postalCode: '',
          country: '',
          cardholderName: '',
          cardNumber: '',
          expiryDate: '',
          securityCode: '',
          cardIdentifier: '',
        }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <CardInputGroup hasBillingAddress />
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  ))
  .add('HasNoBillingAddress', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{
          cardholderName: '',
          cardNumber: '',
          expiryDate: '',
          securityCode: '',
          cardIdentifier: '',
        }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <CardInputGroup hasBillingAddress={false} />
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  ))
  .add('HasWhiteListedTestCard', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{
          cardholderName: '',
          cardNumber: '',
          expiryDate: '',
          securityCode: '',
          cardIdentifier: '',
        }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <CardInputGroup hasBillingAddress={false} whiteListTestCards={['4929000000006']} />
              <H6 isHeadingSection>Test Card is: 4929000000006</H6>
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  ))
