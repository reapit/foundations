import * as React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import PaymentExternalPage from '../payment-external'
import { stubPaymentWithPropertyModel } from '../../ui/__stubs__/payment'

jest.mock('@reapit/elements')
const session = 'token-of-session'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: () => ({ location: { search: `?session=${session}` } }),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      payment: {
        data: stubPaymentWithPropertyModel,
      },
    },
  })),
)

jest.spyOn(notification, 'success')
jest.spyOn(notification, 'warn')
jest.spyOn(notification, 'error')

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentExternalPage session={session} paymentId="MKT20000010" clientId="SBOX" />)).toMatchSnapshot()
  })
})
