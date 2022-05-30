import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Formik, Form } from 'formik'
import { act } from 'react-dom/test-utils'
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

  it('should work when integrating with Formik', async () => {
    const wrapper = render(
      <Formik initialValues={{ expiryDate: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CardExpiresInput {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: {
          value: '1224',
          name: 'expiryDate',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toEqual('12 / 24')
  })
})
