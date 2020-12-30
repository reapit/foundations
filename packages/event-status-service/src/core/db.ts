import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper, DataMapperConfiguration } from '@aws/dynamodb-data-mapper'

type paramsT = {
  region: string
  endpoint?: string
}

const params: paramsT = {
  region: process.env.DYNAMO_DB_REGION,
}

if (process.env.DYNAMO_DB_ENDPOINT) {
  params.endpoint = process.env.DYNAMO_DB_ENDPOINT
}

const dynamoDBClient = new DynamoDB(params)

export const db = new DataMapper({
  client: dynamoDBClient,
} as DataMapperConfiguration)
