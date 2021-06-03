import { ApiKeyModel } from '../api-key-model'
import { getApiKey, resolveApiKey } from '../api-key'
import { DataMapper, QueryIterator, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper'
import { ApiKeyExpiredException, ApiKeyNotFoundException } from '@/exceptions'
import { DynamoDB } from 'aws-sdk'

const SUCCESS_API_KEY = 'success-api-key'
const NOT_FOUND_API_KEY = 'not-found-api-key'
const EXPIRED_API_KEY = 'expired-api-key'
const MIXED_API_KEY = 'mixed-api-key'

describe('ApiKey', () => {
  let db: DataMapper;
  beforeAll(() => {
    // @ts-ignore
    jest
      .spyOn(DataMapper.prototype, 'query')
        // @ts-ignore
      .mockImplementation((valueConstructor: any, keyCondition: any) => {
        const apiKeyHeader = (keyCondition as { [s: string]: any }).apiKey as string

        const createApiKeyModel = (apiKey: string, keyExpiresAt: Date): ApiKeyModel => {
          const model = new ApiKeyModel()
          model.apiKey = apiKey
          model.keyExpiresAt = keyExpiresAt.toISOString()

          return model
        }

        const mockAsyncIterator = ([first, second, third]:
          | [any, any, any]
          | [any]): QueryIterator<StringToAnyObjectMap> => {
          const asyncIteratorMock = new Object()

          asyncIteratorMock[Symbol.asyncIterator] = async function* () {
            yield first
            yield second
            yield third
          }

          return asyncIteratorMock as QueryIterator<any>
        }

        const expires = new Date()
        if (apiKeyHeader === SUCCESS_API_KEY) {
          expires.setDate(expires.getDate() + 3)
          return mockAsyncIterator([createApiKeyModel(SUCCESS_API_KEY, expires)])
        } else if (apiKeyHeader === EXPIRED_API_KEY) {
          expires.setDate(expires.getDate() - 3)
          return mockAsyncIterator([createApiKeyModel(EXPIRED_API_KEY, expires)])
        } else if (apiKeyHeader === MIXED_API_KEY) {
          return mockAsyncIterator([
            createApiKeyModel(MIXED_API_KEY, expires),
            createApiKeyModel(MIXED_API_KEY, expires),
            createApiKeyModel(MIXED_API_KEY, expires),
          ])
        }

        return {
          [Symbol.asyncIterator]: async function* () {} as any,
        } as QueryIterator<any>
      })

    db = new DataMapper({
      client: new DynamoDB({ region: 'eu-west-2' }),
    })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('getApiKey', () => {
    it('Can get apiKey', async () => {
      const result = await getApiKey(db)(SUCCESS_API_KEY)

      expect(result?.apiKey).toBe(SUCCESS_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) > new Date()).toBeTruthy()
    })

    it('Can get expired apiKey', async () => {
      const result = await getApiKey(db)(EXPIRED_API_KEY)

      expect(result?.apiKey).toBe(EXPIRED_API_KEY)
      expect(new Date(result?.keyExpiresAt as string) < new Date()).toBeTruthy()
    })

    it('Returns undefined on no apiKey', async () => {
      const result = await getApiKey(db)(NOT_FOUND_API_KEY)

      expect(typeof result).toBe('undefined')
    })

    it('Can get latest apiKey', async () => {
      const result = await getApiKey(db)(MIXED_API_KEY)

      expect(result?.apiKey).toBe(MIXED_API_KEY)
      // TODO add expect for the most recent
    })
  })

  describe('resolveApiKey', () => {
    it('Throws not found exception on no apiKey', async () => {
      try {
        await resolveApiKey(db)(NOT_FOUND_API_KEY)
        expect(true).toBeFalsy()
      } catch (e) {
        expect(e).toBeInstanceOf(ApiKeyNotFoundException)
      }
    })

    it('Throws expired exception on expired apiKey', async () => {
      try {
        await resolveApiKey(db)(EXPIRED_API_KEY)
        expect(true).toBeFalsy()
      } catch (e) {
        expect(e).toBeInstanceOf(ApiKeyExpiredException)
      }
    })
  })
})
