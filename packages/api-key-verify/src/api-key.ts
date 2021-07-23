import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ApiKeyModel } from './api-key-model'
import { ApiKeyExpiredException, ApiKeyNotFoundException } from './exceptions'

export type GetApiKeyFunction = (apiKeyHeader: string) => Promise<ApiKeyModel | undefined>
export type ApiKeyResolveFunction = (dbConfig: DataMapper) => GetApiKeyFunction

/**
 * use dynamoDB to resolve apiKey for given api-key header
 *
 * @param dbConfig
 * @returns GetApiKeyFunction
 */
export const getApiKey: ApiKeyResolveFunction =
  (db: DataMapper): GetApiKeyFunction =>
  async (apiKeyHeader: string): Promise<ApiKeyModel | undefined> => {
    try {
      const result = await db.query(
        ApiKeyModel,
        {
          apiKey: apiKeyHeader,
        },
        {
          indexName: 'apiKey',
        },
      )

      const apiKeys: ApiKeyModel[] = []

      for await (const key of result) {
        apiKeys.push(key)
      }

      apiKeys
        .sort((a, b) => new Date(a.keyExpiresAt as string).getDate() - new Date(b.keyExpiresAt as string).getDate())
        .reverse()

      return apiKeys.filter((key) => typeof key !== 'undefined')[0]
    } catch (e) {
      // TODO only return undefined on not found response
      return undefined
    }
  }

/**
 * use dynamoDB to resolve apiKey and throw exceptions if key does not exist or is expired
 *
 * @param dbConfig
 * @returns GetApiKeyFunction
 */
export const resolveApiKey: ApiKeyResolveFunction =
  (db: DataMapper): GetApiKeyFunction =>
  async (apiKeyHeader: string): Promise<ApiKeyModel | never> => {
    const apiKey = await getApiKey(db)(apiKeyHeader)

    if (!apiKey) {
      throw new ApiKeyNotFoundException()
    } else if (!apiKey.keyExpiresAt || (apiKey as ApiKeyModel).expired) {
      throw new ApiKeyExpiredException()
    }

    return apiKey
  }
