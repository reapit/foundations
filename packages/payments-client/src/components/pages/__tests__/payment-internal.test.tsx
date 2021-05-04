import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentInternalPage from '../payment-internal'
import { stubPaymentModel } from '../../ui/__stubs__/payment'
import { stubPropertyModel } from '../../ui/__stubs__/property'
import useSWR from 'swr'
import { OpayoProvider } from '@/services/providers'

jest.mock('swr')
jest.mock('../../../core/connect-session')

const mockSWR = useSWR as jest.Mock

describe('PaymentInternalPage', () => {
  it('should match a snapshot when loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(shallow(<PaymentInternalPage paymentId="MKT20000010" />)).toMatchSnapshot()
  })

  it('should match a snapshot when has a merchantKey and data', () => {
    mockSWR.mockReturnValue({
      data: {},
      error: null,
      mutate: jest.fn(),
    })
    expect(
      shallow(
        <PaymentInternalPage
          paymentId="MKT20000010"
          defaultPaymentProvider={new OpayoProvider({ merchantSessionKey: 'SomeKey', expiry: 'SomeDateTime' })}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when has data but no merchantKey', () => {
    mockSWR.mockReturnValue({
      data: { ...stubPropertyModel, ...stubPaymentModel },
      error: null,
      mutate: jest.fn(),
    })
    expect(shallow(<PaymentInternalPage paymentId="MKT20000010" />)).toMatchSnapshot()
  })

  it('should match a snapshot when has a merchantKey and data', () => {
    mockSWR.mockReturnValue({
      data: { ...stubPropertyModel, ...stubPaymentModel },
      error: null,
      mutate: jest.fn(),
    })
    expect(
      shallow(
        <PaymentInternalPage
          paymentId="MKT20000010"
          defaultPaymentProvider={new OpayoProvider({ merchantSessionKey: 'SomeKey', expiry: 'SomeDateTime' })}
        />,
      ),
    ).toMatchSnapshot()
  })
})
