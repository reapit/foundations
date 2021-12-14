import { Topic } from '@aws-cdk/aws-sns'
import * as cdk from '@aws-cdk/core'

export const createSnsTopic = (stack: cdk.Stack, name: string): Topic => {
  return new Topic(stack, name)
}