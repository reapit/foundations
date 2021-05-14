import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { TABLE_NAMES } from '../constants'

@table(TABLE_NAMES.DEPLOYMENT)
export class DeploymentModel {
  @hashKey()
  apiKey: string

  @attribute()
  name: string
}
