import reapitConnectSession from '../../core/connect-session'
import { ApiKey } from '../../core/schema'
import { UpdatePaymentModel } from '../../types/payment'
import { updatePlatformPayment } from '../update-payment'

jest.mock('../../core/connect-session', () => ({
  connectAccessToken: jest.fn(),
}))

const mockFetchPromiseSuccess = Promise.resolve({
  ok: true,
})

describe('updatePlatformPayment', () => {
  it('should correctly return a payment', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromiseSuccess)

    const payment = await updatePlatformPayment({} as ApiKey, {} as UpdatePaymentModel, 'latest', 'SOME_ETAG')

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(reapitConnectSession.connectAccessToken).toHaveBeenCalledTimes(1)
    expect(payment).toBe(true)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
