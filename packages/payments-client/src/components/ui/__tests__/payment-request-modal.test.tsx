import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentRequestModal from '../payment-request-modal'
import { stubPaymentModel } from '../__stubs__/payment'

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <PaymentRequestModal payment={stubPaymentModel} setSelectedPayment={jest.fn()} refetchPayments={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
