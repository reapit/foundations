import React from 'react'
import { shallow } from 'enzyme'
import { fetcher, notification } from '@reapit/elements'
import PaymentForm, { onUpdateStatus, onHandleSubmit, handleCreateTransaction } from '../../payments/payment-form'
import { dataSession, cardDetails } from '../../__stubs__/payment'

jest.mock('@reapit/elements')

const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
const merchantKey = {
  merchantSessionKey: 'merchantSessionKey',
  expiry: '2021-08-26T19:00:12.357Z',
}
const session = '475625c2-af01-4e64-a948-c504992f5e'
const paymentId = 'MKT20000010'

describe('PaymentForm', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <PaymentForm
          data={dataSession}
          merchantKey={{ merchantSessionKey: 'merchantSessionKey', expiry: 'expiry' }}
          paymentId={paymentId}
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

describe('onHandleSubmit', () => {
  window.sagepayOwnForm = jest.fn().mockReturnValue({ tokeniseCardDetails: jest.fn() })
  const onSubmit = onHandleSubmit(merchantKey, dataSession, paymentId, session)

  it('should show notification error', () => {
    onSubmit(cardDetails)
    expect(window.sagepayOwnForm).toHaveBeenCalled()
  })
})

describe('handleCreateTransaction', () => {
  it('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    const onTokenised = handleCreateTransaction(merchantKey, dataSession, cardDetails, paymentId, session)
    await onTokenised({ success: true })
    expect(notification.success).toHaveBeenCalled()
  })

  it('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(false)
    const onTokenised = handleCreateTransaction(merchantKey, dataSession, cardDetails, paymentId, session)
    await onTokenised({ success: true })
    expect(notification.error).toHaveBeenCalled()
  })
})
