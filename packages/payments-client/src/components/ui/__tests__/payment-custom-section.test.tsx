import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentCustomerSection from '../payment-customer-section'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'

describe('PaymentCustomerSection', () => {
  it('should match a snapshot', () => {
    const customer = mockPaymentModel.customer
    const wrapper = render(<PaymentCustomerSection customer={customer} />)
    expect(wrapper).toMatchSnapshot()
  })
})
