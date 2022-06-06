import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentCustomerSection from '../payment-customer-section'
import { stubPaymentModel } from '../__stubs__/payment'

describe('PaymentCustomerSection', () => {
  it('should match a snapshot', () => {
    const customer = stubPaymentModel.customer
    const wrapper = render(<PaymentCustomerSection customer={customer} />)
    expect(wrapper).toMatchSnapshot()
  })
})
