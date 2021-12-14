import * as cdk from '@aws-cdk/core'
import { Queue } from '@aws-cdk/aws-sqs'

export const createSqsQueue = (stack: cdk.Stack, name: string, visibilityTimeout?: number) => {
  return new Queue(stack, name, {
    visibilityTimeout: cdk.Duration.seconds(visibilityTimeout || 30),
  })
}
