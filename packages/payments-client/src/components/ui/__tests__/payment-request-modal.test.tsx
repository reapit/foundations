import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentRequestModal from '../payment-request-modal'
import { stubPaymentModel } from '../__stubs__/payment'

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <PaymentRequestModal payment={stubPaymentModel} setSelectedPayment={jest.fn()} refetchPayments={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
