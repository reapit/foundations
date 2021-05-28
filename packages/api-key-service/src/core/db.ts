import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper, DataMapperConfiguration } from '@aws/dynamodb-data-mapper'
import { dbConfig } from './../config/db'

const dynamoDBClient = new DynamoDB({
  region: dbConfig.region,
})

export const db = new DataMapper({
  client: dynamoDBClient,
} as DataMapperConfiguration)
