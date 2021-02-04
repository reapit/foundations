import React from 'react'
import { shallow } from 'enzyme'

import PaymentForm from '../payment-form'
import { stubPaymentWithPropertyModel } from '../__stubs__/payment'

const session = '475625c2-af01-4e64-a948-c504992f5e'
const paymentId = 'MKT20000010'

describe('PaymentForm', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <PaymentForm
          payment={stubPaymentWithPropertyModel}
          merchantKey={{ merchantSessionKey: 'merchantSessionKey', expiry: 'expiry' }}
          paymentId={paymentId}
          session={session}
          refetchPayment={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
