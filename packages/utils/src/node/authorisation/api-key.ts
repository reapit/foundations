import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import { ApiKeyModel } from './api-key-model'

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
): GetApiKeyFunction => async (apiKeyHeader: string): Promise<ApiKeyInterface | undefined> => {
  const dynamoDBClient = new DynamoDB(dbConfig)

  const db = new DataMapper({
    client: dynamoDBClient,
  })

  try {
    const result = await db.query(Object.assign(new ApiKeyModel(), { apiKey: apiKeyHeader }), {
      indexName: 'apiKey',
    })

    const apiKeys: ApiKeyInterface[] = []

    for await (const key of result) {
      apiKeys.push(key)
    }

    apiKeys.sort((a, b) => new Date(a.keyExpiresAt as string).getDate() - new Date(b.keyExpiresAt as string).getDate())

    return apiKeys[0]
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
export const resolveApiKey: ApiKeyResolveFunction = (
  dbConfig: DynamoDB.Types.ClientConfiguration,
): GetApiKeyFunction => async (apiKeyHeader: string): Promise<ApiKeyInterface | never> => {
  const apiKey = await getApiKey(dbConfig)(apiKeyHeader)

  if (!apiKey) {
    throw new Error('ApiKey not found')
  } else if (!apiKey.keyExpiresAt || new Date(apiKey.keyExpiresAt) > new Date()) {
    throw new Error('ApiKey expired')
  }

  return apiKey
}
