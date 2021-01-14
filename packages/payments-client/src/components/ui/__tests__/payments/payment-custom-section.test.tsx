import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentCustomerSection from '../../payments/payment-customer-section'
import { data } from '../../__stubs__/payment'

describe('PaymentCustomerSection', () => {
  it('should match a snapshot', () => {
    const customer = data.customer
    const wrapper = shallow(<PaymentCustomerSection customer={customer} />)
    expect(wrapper).toMatchSnapshot()
  })
})
