import { ApiKeyModel } from '@reapit/utils'
import { db } from '@/core'
import { LoginIdentity } from '@reapit/connect-session'
import { QueryIterator } from '@aws/dynamodb-data-mapper'

export const createApiKey = (apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(Object.assign(new ApiKeyModel(), { ...apiKey }))
}

export const updateApiKey = (apiKey: ApiKeyModel, dto: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(
    Object.assign(new ApiKeyModel(), {
      ...apiKey,
      ...dto,
    }),
  )
}

export const getApiKey = (apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel | undefined> => {
  return db.get(Object.assign(new ApiKeyModel(), apiKey))
}

export const batchGetApiKeys = async (
  customer: LoginIdentity & { developerId: string },
  startKey?: Partial<ApiKeyModel>,
): Promise<[QueryIterator<ApiKeyModel>, { nextCursor: string }]> => {
  const dynamoResponse = await db.query(
    ApiKeyModel,
    {
      developerId: customer.developerId,
    },
    {
      indexName: 'developerIdOwnership',
      limit: 10,
      startKey,
    },
  )

  return [
    dynamoResponse,
    {
      nextCursor: '',
    },
  ]
}

export const removeApiKey = async (apiKey: ApiKeyModel): Promise<void> => {
  await db.delete(apiKey)
}
