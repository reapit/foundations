import reapitConnectSession from '../../core/connect-session'
import { ApiKey } from '../../core/schema'
import { getPlatformPayment } from '../get-payment'

jest.mock('../../core/connect-session', () => ({
  connectAccessToken: jest.fn(),
}))

const mockResponse = {}
const mockFetchPromiseSuccess = Promise.resolve({
  json: () => mockResponse,
  ok: true,
})

describe('getPlatformPayment', () => {
  it('should correctly return a payment', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromiseSuccess)

    const payment = await getPlatformPayment({} as ApiKey, 'latest')

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(reapitConnectSession.connectAccessToken).toHaveBeenCalledTimes(1)
    expect(payment).toEqual(mockResponse)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
