import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { DYNAMO_DB } from '../core/constants'

@table(DYNAMO_DB.tableNames.eventStatuses)
export class EventStatus {
  @hashKey()
  eventId: string

  @attribute()
  clientCode: string

  @attribute({ defaultProvider: () => 'outstanding' })
  status: 'outstanding' | 'actioned' | 'dismissed' | string

  @attribute()
  eventCreatedAt: string

  @attribute()
  statusCreatedAt: string

  @attribute({ defaultProvider: () => new Date().toISOString() })
  statusUpdatedAt: string
}

export const generateStatusItem = (data: Partial<EventStatus>) => Object.assign(new EventStatus(), { ...data })
