import * as React from 'react'
import { render } from '@testing-library/react'
import { Formik, Form } from 'formik'
import { CardExpiresInput, CardExpiresInputProps } from '../card-expires-input'

const props: CardExpiresInputProps = {
  id: 'expiryDate',
  name: 'expiryDate',
  labelText: 'Card Expires',
  required: true,
  disabled: false,
  className: 'some-class',
}

describe('CardExpiresInput', () => {
  it('should match a snapshot for an unknown card', () => {
    const wrapper = render(
      <Formik initialValues={{ expiryDate: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardExpiresInput {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for visa', () => {
    const wrapper = render(
      <Formik initialValues={{ expiryDate: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardExpiresInput {...{ ...props, cardType: 'visa' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for mastercard', () => {
    const wrapper = render(
      <Formik initialValues={{ expiryDate: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardExpiresInput {...{ ...props, cardType: 'mastercard' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for amex', () => {
    const wrapper = render(
      <Formik initialValues={{ expiryDate: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardExpiresInput {...{ ...props, cardType: 'amex' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
