import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'
import { ApiKeyModel } from './api-key-model'
import { ApiKeyExpiredException, ApiKeyNotFoundException } from './exceptions'

export type GetApiKeyFunction = (apiKeyHeader: string) => Promise<ApiKeyInterface | undefined>
export type ApiKeyResolveFunction = (dbConfig: DynamoDB.Types.ClientConfiguration) => GetApiKeyFunction

/**
 * use dynamoDB to resolve apiKey for given api-key header
 *
 * @param dbConfig
 * @returns GetApiKeyFunction
 */
export const getApiKey: ApiKeyResolveFunction = (
  dbConfig: DynamoDB.Types.ClientConfiguration,
): GetApiKeyFunction => async (apiKeyHeader: string): Promise<ApiKeyModel | undefined> => {
  const dynamoDBClient = new DynamoDB(dbConfig)

  const db = new DataMapper({
    client: dynamoDBClient,
  })

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

    apiKeys.sort((a, b) => new Date(a.keyExpiresAt as string).getDate() - new Date(b.keyExpiresAt as string).getDate())

    return apiKeys[0]
  } catch (e) {
    console.error(e)
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
export const resolveApiKey: ApiKeyResolveFunction = (
  dbConfig: DynamoDB.Types.ClientConfiguration,
): GetApiKeyFunction => async (apiKeyHeader: string): Promise<ApiKeyInterface | never> => {
  const apiKey = await getApiKey(dbConfig)(apiKeyHeader)

  if (!apiKey) {
    throw new ApiKeyNotFoundException()
  } else if (!apiKey.keyExpiresAt || (apiKey as ApiKeyModel).expired) {
    throw new ApiKeyExpiredException()
  }

  return apiKey
}
