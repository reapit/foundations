import { ApiKeyModel } from '../api-key-model'
import { DataMapper, QueryIterator, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'

const SUCCESS_API_KEY = 'success-api-key'
const NOT_FOUND_API_KEY = 'not-found-api-key'
const EXPIRED_API_KEY = 'expired-api-key'
const MIXED_API_KEY = 'mixed-api-key'

describe('ApiKey', () => {
  let db: DataMapper
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
          const expires1 = new Date()
          const expires2 = new Date()
          const expires3 = new Date()

          expires1.setDate(expires1.getDate() - 3)
          expires2.setDate(expires2.getDate() - 5)
          expires3.setDate(expires3.getDate() + 10)
          return mockAsyncIterator([
            createApiKeyModel(MIXED_API_KEY, expires3),
            createApiKeyModel(MIXED_API_KEY, expires1),
            createApiKeyModel(MIXED_API_KEY, expires2),
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
})
