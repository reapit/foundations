import { SQS } from 'aws-sdk'

export const sqs = new SQS({ apiVersion: '2012-11-05', endpoint: process.env.SQS_ENDPOINT })
