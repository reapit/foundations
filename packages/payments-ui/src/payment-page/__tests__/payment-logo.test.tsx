import React from 'react'
import { render } from '../../tests/react-testing'
import { PaymentLogo } from '../payment-logo'

describe('PaymentLogo', () => {
  it('should match a snapshot', () => {
    expect(render(<PaymentLogo />)).toMatchSnapshot()
  })
})
