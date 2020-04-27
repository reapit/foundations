import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper } from '@aws/dynamodb-data-mapper'

const dynamoDBClient = new DynamoDB({
  region: process.env.AWS_REGION,
})

const dynamoDBMapper = new DataMapper({
  client: dynamoDBClient,
})

export default dynamoDBMapper
