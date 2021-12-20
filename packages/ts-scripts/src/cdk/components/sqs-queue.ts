import * as cdk from 'aws-cdk-lib'
import { aws_sqs as sqs } from 'aws-cdk-lib'

export const createSqsQueue = (stack: cdk.Stack, name: string, visibilityTimeout?: number): sqs.Queue => {
  return new sqs.Queue(stack, name, {
    visibilityTimeout: cdk.Duration.seconds(visibilityTimeout || 30),
  })
}
export type Queue = sqs.Queue
