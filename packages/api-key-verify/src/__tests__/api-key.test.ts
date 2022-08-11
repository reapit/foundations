import { ApiKeyModel } from '../api-key-model'
import { resolveApiKey } from '../api-key'
import * as AWS from 'aws-sdk'

const SUCCESS_API_KEY = 'success-api-key'
const NOT_FOUND_API_KEY = 'not-found-api-key'
const EXPIRED_API_KEY = 'expired-api-key'

const lambda = new AWS.Lambda()

describe('ApiKey', () => {
  beforeAll(() => {
    // @ts-ignore
    jest
      .spyOn(lambda, 'invoke')
      // @ts-ignore
      .mockImplementation((_valueConstructor: any, keyCondition: any) => {
        console.log('mock implementation')
        const apiKeyHeader = (keyCondition as { [s: string]: any }).apiKey as string

        const createApiKeyModel = (apiKey: string, keyExpiresAt: Date): ApiKeyModel => {
          const model = new ApiKeyModel()
          model.apiKey = apiKey
          model.keyExpiresAt = keyExpiresAt.toISOString()

          return model
        }

        const expires = new Date()
        if (apiKeyHeader === SUCCESS_API_KEY) {
          expires.setDate(expires.getDate() + 3)
          return createApiKeyModel(SUCCESS_API_KEY, expires)
        } else if (apiKeyHeader === EXPIRED_API_KEY) {
          expires.setDate(expires.getDate() - 3)
          return createApiKeyModel(EXPIRED_API_KEY, expires)
        }

        return {}
      })
  })

  describe('resolveApiKey', () => {
    it('Can get apiKey', async () => {
      const result = await resolveApiKey({ apiKey: SUCCESS_API_KEY, functionName: '' })

      expect(result?.apiKey).toBe(SUCCESS_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) > new Date()).toBeTruthy()
    })

    it('Can get expired apiKey', async () => {
      const result = await resolveApiKey({ apiKey: EXPIRED_API_KEY, functionName: '' })

      expect(result?.apiKey).toBe(EXPIRED_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) < new Date()).toBeTruthy()
    })

    it('Returns undefined on no apiKey', async () => {
      const result = await resolveApiKey({ apiKey: NOT_FOUND_API_KEY, functionName: '' })

      expect(typeof result).toBe('undefined')
    })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
