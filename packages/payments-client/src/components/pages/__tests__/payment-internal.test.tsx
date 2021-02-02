import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentPage from '../payment-internal'
import { stubPaymentModel } from '../../ui/__stubs__/payment'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: stubPaymentModel,
  })),
)

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentPage paymentId="MKT20000010" />)).toMatchSnapshot()
  })
})
