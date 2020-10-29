import AWS from 'aws-sdk'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper, DataMapperConfiguration } from '@aws/dynamodb-data-mapper'

AWS.config.update({
  region: 'eu-west-2',
})

if (process.env.APP_ENV === 'local') {
  AWS.config.update({
    profile: 'dev',
  } as unknown)
}

const dynamoDBClient = new DynamoDB({
  region: process.env.AWS_REGION,
})

export const db = new DataMapper({
  client: dynamoDBClient,
} as DataMapperConfiguration)
