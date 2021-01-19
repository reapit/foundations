import * as React from 'react'
import { shallow } from 'enzyme'
import { fetcher, notification } from '@reapit/elements'
import PaymentSessionPage, { PaymentForm, onUpdateStatus } from '../payment-session'
import { dataSession } from '../../ui/__stubs__/payment'

jest.mock('@reapit/elements')
const session = 'token-of-session'
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

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
        data: dataSession,
      },
    },
  })),
)

jest.spyOn(notification, 'success')
jest.spyOn(notification, 'warn')
jest.spyOn(notification, 'error')

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PaymentSessionPage />)).toMatchSnapshot()
  })
})

describe('PaymentForm', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <PaymentForm
          data={dataSession}
          merchantKey={{ merchantSessionKey: 'merchantSessionKey', expiry: 'expiry' }}
          paymentId="MKT20000010"
          session={session}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('updateStatusRes', () => {
  const updateStatusParams = { paymentId: 'paymentId', clientCode: 'clientCode', _eTag: '_eTag', session: 'session' }

  it('toast message for posted', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    await onUpdateStatus({ status: 'posted', externalReference: '' }, updateStatusParams)
    expect(notification.success).toHaveBeenCalled()
  })
  it('toast message for rejected', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    await onUpdateStatus({ status: 'rejected', externalReference: '' }, updateStatusParams)
    expect(notification.warn).toHaveBeenCalled()
  })
  it('toast message for update status failed', async () => {
    mockedFetch.mockReturnValueOnce(false)
    await onUpdateStatus({ status: 'posted', externalReference: '' }, updateStatusParams)
    expect(notification.error).toHaveBeenCalled()
  })
})
