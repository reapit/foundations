import * as cdk from '@aws-cdk/core'
import * as sqs from '@aws-cdk/aws-sqs'

export const createSqsQueue = (stack: cdk.Stack, name: string, visibilityTimeout?: number): sqs.Queue => {
  return new sqs.Queue(stack, name, {
    visibilityTimeout: cdk.Duration.seconds(visibilityTimeout || 30),
  })
}

export {
  Queue
} from '@aws-cdk/aws-sqs'