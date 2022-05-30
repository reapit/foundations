import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Formik, Form } from 'formik'
import { act } from 'react-dom/test-utils'
import { CardInput, CardInputProps } from '../card-input'

const props: CardInputProps = {
  id: 'cardNumber',
  name: 'cardNumber',
  labelText: 'Card Number',
  required: true,
  disabled: false,
  className: 'some-class',
  setCardType: jest.fn(),
  cardType: 'unknown',
}

describe('CardInput', () => {
  it('should match a snapshot for an unknown card', () => {
    const wrapper = render(
      <Formik initialValues={{ cardNumber: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardInput {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for visa', () => {
    const wrapper = render(
      <Formik initialValues={{ cardNumber: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardInput {...{ ...props, cardType: 'visa' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for mastercard', () => {
    const wrapper = render(
      <Formik initialValues={{ cardNumber: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardInput {...{ ...props, cardType: 'mastercard' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for amex', () => {
    const wrapper = render(
      <Formik initialValues={{ cardNumber: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardInput {...{ ...props, cardType: 'amex' }} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work when integrating with Formik', async () => {
    const wrapper = render(
      <Formik initialValues={{ cardNumber: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardInput {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: {
          value: '4444444444444444',
          name: 'cardNumber',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toEqual('4444 4444 4444 4444')
  })
})
