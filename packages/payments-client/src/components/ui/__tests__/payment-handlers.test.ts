import { fetcher, notification } from '@reapit/elements'
import { handleCreateTransaction, onUpdateStatus, onHandleSubmit } from '../payment-handlers'
import { stubCardDetails, stubPaymentWithPropertyModel } from '../__stubs__/payment'
jest.mock('@reapit/elements')

const session = '475625c2-af01-4e64-a948-c504992f5e'
const paymentId = 'MKT20000010'
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
const merchantKey = {
  merchantSessionKey: 'merchantSessionKey',
  expiry: '2021-08-26T19:00:12.357Z',
}

xdescribe('updateStatusRes', () => {
  const updateStatusParams = { paymentId: 'paymentId', clientCode: 'clientCode', _eTag: '_eTag', session: 'session' }

  it('toast message for posted', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    await onUpdateStatus(
      { status: 'posted', externalReference: '' },
      updateStatusParams,
      stubCardDetails,
      stubPaymentWithPropertyModel,
      jest.fn(),
    )
    expect(notification.success).toHaveBeenCalled()
  })
  it('toast message for rejected', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    await onUpdateStatus(
      { status: 'rejected', externalReference: '' },
      updateStatusParams,
      stubCardDetails,
      stubPaymentWithPropertyModel,
      jest.fn(),
    )
    expect(notification.warn).toHaveBeenCalled()
  })
  xit('toast message for update status failed', async () => {
    mockedFetch.mockReturnValueOnce(false)
    await onUpdateStatus(
      { status: 'posted', externalReference: '' },
      updateStatusParams,
      stubCardDetails,
      stubPaymentWithPropertyModel,
      jest.fn(),
    )
    expect(notification.error).toHaveBeenCalled()
  })
})

describe('onHandleSubmit', () => {
  window.sagepayOwnForm = jest.fn().mockReturnValue({ tokeniseCardDetails: jest.fn() })
  const onSubmit = onHandleSubmit(merchantKey, stubPaymentWithPropertyModel, paymentId, jest.fn(), jest.fn(), session)

  it('should show notification error', () => {
    onSubmit(stubCardDetails)
    expect(window.sagepayOwnForm).toHaveBeenCalled()
  })
})

describe('handleCreateTransaction', () => {
  xit('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    const onTokenised = handleCreateTransaction(
      merchantKey,
      stubPaymentWithPropertyModel,
      stubCardDetails,
      paymentId,
      jest.fn(),
      jest.fn(),
      session,
    )
    await onTokenised({ success: true })
    expect(notification.success).toHaveBeenCalled()
  })

  xit('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(false)
    const onTokenised = handleCreateTransaction(
      merchantKey,
      stubPaymentWithPropertyModel,
      stubCardDetails,
      paymentId,
      jest.fn(),
      jest.fn(),
      session,
    )
    await onTokenised({ success: true })
    expect(notification.error).toHaveBeenCalled()
  })
})
