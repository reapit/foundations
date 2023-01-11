import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'

@table(process.env.DYNAMO_DB_PAYMENTS_CONFIG_TABLE_NAME ?? 'Cloud_Payments_Config_Table')
export class ClientConfigModel {
  @hashKey()
  clientCode: string

  @attribute()
  vendorName: string

  @attribute()
  integrationKey: string

  @attribute()
  passKey: string

  @attribute()
  companyName: string

  @attribute()
  logoUri: string
}
