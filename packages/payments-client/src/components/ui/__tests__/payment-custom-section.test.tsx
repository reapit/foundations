import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentCustomerSection from '../payment-customer-section'
import { stubPaymentModel } from '../__stubs__/payment'

describe('PaymentCustomerSection', () => {
  it('should match a snapshot', () => {
    const customer = stubPaymentModel.customer
    const wrapper = shallow(<PaymentCustomerSection customer={customer} />)
    expect(wrapper).toMatchSnapshot()
  })
})
