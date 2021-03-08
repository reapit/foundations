import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper, DataMapperConfiguration } from '@aws/dynamodb-data-mapper'
import { DYNAMO_DB } from '../core/constants'

type Params = {
  region: string
  endpoint?: string
}

const params: Params = {
  region: DYNAMO_DB.region,
}

if (DYNAMO_DB.endpoint) {
  params.endpoint = DYNAMO_DB.endpoint
}

const dynamoDBClient = new DynamoDB(params)

export const db = new DataMapper({
  client: dynamoDBClient,
} as DataMapperConfiguration)
