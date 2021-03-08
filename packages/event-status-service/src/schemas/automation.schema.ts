import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { DYNAMO_DB } from '../core/constants'

export class AutomationRequiredFields {
  @attribute()
  clientCode: string

  @attribute()
  triggerOnEventType: string // TODO: use an enum here when we know what the event types are

  @attribute({ defaultProvider: () => 'sms' })
  messageChannel: 'sms'

  @attribute()
  messageBody: string
}

@table(DYNAMO_DB.tableNames.automations)
export class Automation extends AutomationRequiredFields {
  @hashKey()
  id: string

  @attribute()
  createdAt: string

  @attribute({ defaultProvider: () => new Date().toISOString() })
  updatedAt: string
}

export const generateAutomationItem = (data: Partial<Automation>) => Object.assign(new Automation(), { ...data })
