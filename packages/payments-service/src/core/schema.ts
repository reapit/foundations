import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { DYNAMO_DB } from './constants'

@table(DYNAMO_DB.tableName)
export class ApiKey {
  @hashKey()
  apiKey: string

  @attribute()
  clientCode: string

  @attribute()
  paymentId: string

  @attribute()
  keyCreatedAt: string

  @attribute()
  keyExpiresAt: string
}

export const generateApiKey = (data: Partial<ApiKey>) => Object.assign(new ApiKey(), { ...data })
