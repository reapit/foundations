import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { DYNAMO_DB } from '../core/constants'

@table(DYNAMO_DB.tableNames.conversations)
export class Conversation {
  @hashKey()
  eventId: string

  @attribute()
  twilioConversationId: string

  @attribute()
  createdAt: string

  @attribute({ defaultProvider: () => new Date().toISOString() })
  updatedAt: string
}

export const generateConversationItem = (data: Partial<Conversation>) => Object.assign(new Conversation(), { ...data })
