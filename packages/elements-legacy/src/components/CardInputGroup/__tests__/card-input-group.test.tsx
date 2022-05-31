import * as React from 'react'
import { render } from '@testing-library/react'
import { Formik, Form } from 'formik'
import { CardInputGroup, CardInputGroupProps } from '../card-input-group'

const props: CardInputGroupProps = {
  hasBillingAddress: true,
  whiteListTestCards: ['444444444444'],
}

describe('CardInputGroup', () => {
  it('should match a snapshot for hasBillingAddress', () => {
    const wrapper = render(
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
        onSubmit={jest.fn()}
      >
        {() => (
          <Form>
            <CardInputGroup {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for no billing address', () => {
    const wrapper = render(
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
        onSubmit={jest.fn()}
      >
        {() => (
          <Form>
            <CardInputGroup {...{ ...props, hasBillingAddress: false }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
