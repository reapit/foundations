import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations'
import { TABLE_NAME } from './constants'

@table(TABLE_NAME)
export class PaymentsAccount {
  @hashKey()
  customerCode: string

  @hashKey()
  accountId: string

  @attribute()
  userName: string
}

export const generatePaymentsItem = (data: Partial<PaymentsAccount>) =>
  Object.assign(new PaymentsAccount(), { ...data })
