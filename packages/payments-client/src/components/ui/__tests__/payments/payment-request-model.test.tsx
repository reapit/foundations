import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentRequestModal from '../../payments/payment-request-modal'

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PaymentRequestModal isShowConfirmModal={true} setRequestPaymentId={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
