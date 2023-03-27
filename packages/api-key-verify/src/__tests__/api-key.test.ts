import { ApiKeyModel } from '../api-key-model'
import { resolveApiKey } from '../api-key'

const SUCCESS_API_KEY = 'success-api-key'
const NOT_FOUND_API_KEY = 'not-found-api-key'
const EXPIRED_API_KEY = 'expired-api-key'

jest.mock('aws-sdk', () => {
  const mLambda = {
    invoke: jest.fn((keyCondition: any, callBack) => new Promise((resolve) => {
        const apiKeyHeader = JSON.parse(keyCondition.Payload).apiKey as string

        const createApiKeyModel = (apiKey: string, keyExpiresAt: Date): string => {
          const model = new ApiKeyModel()
          model.apiKey = apiKey
          model.keyExpiresAt = keyExpiresAt.toISOString()

          return JSON.stringify(model)
        }

        const expires = new Date()
        if (apiKeyHeader === SUCCESS_API_KEY) {
          expires.setDate(expires.getDate() + 3)
          resolve(callBack(undefined, {
            Payload: createApiKeyModel(SUCCESS_API_KEY, expires),
          }))
          return
        } else if (apiKeyHeader === EXPIRED_API_KEY) {
          expires.setDate(expires.getDate() - 3)
          resolve(callBack(undefined, {
            Payload: createApiKeyModel(EXPIRED_API_KEY, expires),
          }))
          return
        }

        resolve(callBack(undefined, {
          Payload: undefined,
        }))
        return
    })),
  }
  return { Lambda: jest.fn(() => mLambda) }
})

describe('ApiKey', () => {

  describe('resolveApiKey', () => {
    
    it('Can get apiKey', async () => {
      const result = await resolveApiKey({ apiKey: SUCCESS_API_KEY, functionName: '' })

      expect(result?.apiKey).toBe(SUCCESS_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) > new Date()).toBeTruthy()
    })

    it('Can get expired apiKey', async () => {
      
      try {
        await resolveApiKey({ apiKey: EXPIRED_API_KEY, functionName: '' })
      } catch(e: any) {
        expect(e.message).toBe('Api Key expired')
      }
    })

    it('Returns undefined on no apiKey', async () => {
      try {
        await resolveApiKey({ apiKey: NOT_FOUND_API_KEY, functionName: '' })

        expect(true).toBeFalsy()
      } catch(e: any) {
        expect(e.message).toBe('Api Key not found')
      }
    })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
