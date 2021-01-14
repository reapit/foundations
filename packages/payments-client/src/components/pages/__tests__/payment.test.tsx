import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentPage, { PaymentForm } from '../payment'
import { data } from '../../ui/__stubs__/payment'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentPage />)).toMatchSnapshot()
  })
})

describe('PaymentForm', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(<PaymentForm data={data} merchantKey={{ merchantSessionKey: 'merchantSessionKey', expiry: 'expiry' }} />),
    ).toMatchSnapshot()
  })
})
