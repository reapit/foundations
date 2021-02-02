import * as React from 'react'
import { shallow } from 'enzyme'
import { PaymentLogo } from '../payment-logo'

describe('PaymentLogo', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentLogo />)).toMatchSnapshot()
  })
})
