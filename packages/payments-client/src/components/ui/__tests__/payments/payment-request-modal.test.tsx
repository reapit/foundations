import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentRequestModal from '../../payments/payment-request-modal'
import { data } from '../../__stubs__/payment'

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <PaymentRequestModal payment={data} setSelectedPayment={jest.fn()} refetchPayments={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
