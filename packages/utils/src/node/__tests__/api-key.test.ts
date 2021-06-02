import { ApiKeyModel, getApiKey } from "../authorisation"

const SUCCESS_API_KEY = 'success-api-key'
const NOT_FOUND_API_KEY = 'not-found-api-key'
const EXPIRED_API_KEY = 'expired-api-key'
const MIXED_API_KEY = 'mixed-api-key'

const createApiKeyModel = (apiKey: string, keyExpiresAt: Date): ApiKeyModel => {
  const model = new ApiKeyModel()
  model.apiKey = apiKey
  model.keyExpiresAt = keyExpiresAt.toISOString()

  return model
}

jest.mock('@aws/dynamodb-data-mapper', () => ({
  DataMapper: () => ({
    // TODO mock asyncIterator
    query: () => jest.fn((apiKeyHeader) => {
      const expires = new Date()
      if (apiKeyHeader === SUCCESS_API_KEY) {
        expires.setDate(expires.getDate() + 3)
        return [createApiKeyModel(SUCCESS_API_KEY, expires)]
      } else if (apiKeyHeader === EXPIRED_API_KEY) {
        expires.setDate(expires.getDate() - 3)
        return [createApiKeyModel(EXPIRED_API_KEY, expires)]
      } else if (apiKeyHeader === MIXED_API_KEY) {
        return [
          createApiKeyModel(MIXED_API_KEY, expires),
          createApiKeyModel(MIXED_API_KEY, expires),
          createApiKeyModel(MIXED_API_KEY, expires),
        ]
      }

      return []
    }),
  }),
}))
jest.mock('aws-sdk/clients/dynamodb', () => ({
  default: class {},
}))

describe('ApiKey', () => {
  describe('getApiKey', () => {
    it('Can get apiKey', async () => {
      const result = await getApiKey({region: 'eu-west-2'})(SUCCESS_API_KEY)

      expect(result?.apiKey).toBe(SUCCESS_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) > new Date()).toBeTruthy()
    })

    it('Can get expired apiKey', async () => {
      const result = await getApiKey({region: 'eu-west-2'})(EXPIRED_API_KEY)

      expect(result?.apiKey).toBe(EXPIRED_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) < new Date()).toBeTruthy()
    })

    it('Returns undefined on no apiKey', async () => {
      const result = await getApiKey({region: 'eu-west-2'})(NOT_FOUND_API_KEY)

      expect(typeof result).toBe('undefined')
    })

    it('Can get latest apiKey', async () => {
      const result = await getApiKey({region: 'eu-west-2'})(MIXED_API_KEY)

      expect(result?.apiKey).toBe(MIXED_API_KEY)
      // TODO add expect for the most recent
    })
  })

  describe('resolveApiKey', () => {

  })
})
