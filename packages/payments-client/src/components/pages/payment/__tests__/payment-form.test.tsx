import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PaymentForm } from '../payment-form'

describe('PaymentForm', () => {
  it('should match a snapshot', () => {
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })
})
