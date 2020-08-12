import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import AWS from 'aws-sdk'
import path from 'path'

// load AWS credentials into this lambda
// relative to src
AWS.config.loadFromPath(path.resolve(__dirname, './credentials.json'))

const dynamoDBClient = new DynamoDB({
  region: process.env.AWS_REGION,
})

const dynamoDBMapper = new DataMapper({
  client: dynamoDBClient,
})

export default dynamoDBMapper
