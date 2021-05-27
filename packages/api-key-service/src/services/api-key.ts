import { ApiKeyModel } from '@/models'
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
  customer: LoginIdentity,
  startKey?: { [s: string]: string },
): Promise<[QueryIterator<ApiKeyModel>, { count: number; nextCursor: string }]> => {
  const dynamoResponse = await db.query(
    ApiKeyModel,
    {
      organisationId: customer.orgId ? customer.orgId : undefined,
      developerId: customer.orgId ? undefined : customer.developerId,
    },
    {
      limit: 10,
      startKey,
    },
  )

  return [
    dynamoResponse,
    {
      count: dynamoResponse.count,
      nextCursor: '',
    },
  ]
}
