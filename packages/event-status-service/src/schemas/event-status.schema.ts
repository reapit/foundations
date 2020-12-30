import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'

const TABLE_NAME = 'Cloud_Event_Statuses' // TODO: this needs to be common across this and the serverless.yaml

@table(TABLE_NAME)
export class EventStatus {
  @hashKey()
  eventId: string

  @attribute()
  clientCode: string

  @attribute()
  status: string

  @attribute()
  eventCreatedAt: string

  @attribute()
  statusCreatedAt: string

  @attribute()
  statusUpdatedAt: string
}

export const generateStatusItem = (data: Partial<EventStatus>) => Object.assign(new EventStatus(), { ...data })
