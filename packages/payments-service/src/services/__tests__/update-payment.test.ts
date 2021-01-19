import reapitConnectSession from '../../core/connect-session'
import { ApiKey } from '../../core/schema'
import { UpdatePaymentModel } from '../../types/payment'
import { updatePlatformPayment } from '../update-payment'

jest.mock('../../core/connect-session', () => ({
  connectAccessToken: jest.fn().mockReturnValue('TOKEN'),
}))

jest.mock('axios', () => ({
  patch: jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          status: 204,
        })
      }),
  ),
}))

describe('updatePlatformPayment', () => {
  it('should correctly return a payment', async () => {
    const payment = await updatePlatformPayment({} as ApiKey, {} as UpdatePaymentModel, 'latest', 'SOME_ETAG')

    expect(reapitConnectSession.connectAccessToken).toHaveBeenCalledTimes(1)
    expect(payment).toBe(true)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
