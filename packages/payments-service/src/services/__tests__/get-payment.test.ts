import reapitConnectSession from '../../core/connect-session'
import { ApiKey } from '../../core/schema'
import { getPlatformPayment } from '../get-payment'

jest.mock('../../core/connect-session', () => ({
  connectAccessToken: jest.fn().mockReturnValue('TOKEN'),
}))

jest.mock('axios', () => ({
  get: jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          status: 200,
          data: { propertyId: 'SOME_ID' },
        })
      }),
  ),
}))

describe('getPlatformPayment', () => {
  it('should correctly return a payment with a property inside', async () => {
    const payment = await getPlatformPayment({} as ApiKey, 'latest')

    expect(reapitConnectSession.connectAccessToken).toHaveBeenCalledTimes(1)
    expect(payment).toEqual({
      property: {
        propertyId: 'SOME_ID',
      },
      propertyId: 'SOME_ID',
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
