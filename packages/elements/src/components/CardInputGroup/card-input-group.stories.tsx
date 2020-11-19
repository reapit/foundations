import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CardInputGroup } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('CardInputGroup', module).add('CardInputGroup', () => (
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
