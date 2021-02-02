import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentExternalPage from '../payment-external'
import { stubPaymentWithPropertyModel } from '../../ui/__stubs__/payment'
import useSWR from 'swr'

jest.mock('swr')

const mockSWR = useSWR as jest.Mock
const session = 'session-token'

describe('PaymentExternalPage', () => {
  it('should match a snapshot when loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(shallow(<PaymentExternalPage session={session} paymentId="MKT20000010" clientId="SBOX" />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    mockSWR.mockReturnValue({
      data: {},
      error: new Error(''),
      mutate: jest.fn(),
    })
    expect(shallow(<PaymentExternalPage session={session} paymentId="MKT20000010" clientId="SBOX" />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no merchantKey and no error', () => {
    mockSWR.mockReturnValue({
      data: {
        payment: stubPaymentWithPropertyModel,
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(shallow(<PaymentExternalPage session={session} paymentId="MKT20000010" clientId="SBOX" />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data and a merchantKey', () => {
    mockSWR.mockReturnValue({
      data: {
        payment: stubPaymentWithPropertyModel,
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(
      shallow(
        <PaymentExternalPage
          session={session}
          paymentId="MKT20000010"
          clientId="SBOX"
          defaultMerchantKey={{ merchantSessionKey: 'SomeKey', expiry: 'SomeDateTime' }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
