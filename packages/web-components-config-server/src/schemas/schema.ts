import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { tableName } from '@/constants/db'

@table(tableName)
export class WebComponentConfig {
  @hashKey()
  customerId: string

  @attribute()
  appointmentLength: number

  @attribute()
  appointmentTimeGap: number

  @attribute()
  appointmentTypes: ListItemModel[]

  @attribute()
  negotiatorIds: string[]
}

