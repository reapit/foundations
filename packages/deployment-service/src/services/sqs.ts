import { SQS } from 'aws-sdk'

export const sqs = new SQS({ apiVersion: '2012-11-05', endpoint: 'http://localhost:9324' })
