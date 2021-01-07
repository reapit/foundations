import { generateApiKey, ApiKey } from '../schema'

describe('generateApiKey', () => {
  it('should generate an api key instance', () => {
    const params = {
      apiKey: 'SOME_API_KEY',
      clientCode: 'SOME_CLIENT_CODE',
      paymentId: 'SOME_PAYMENT_ID',
      keyCreatedAt: new Date().toISOString(),
      keyExpiresAt: new Date().toISOString(),
    }

    const instance = generateApiKey(params)
    expect(instance instanceof ApiKey).toBe(true)
    expect(instance).toEqual(params)
  })
})
