import * as sns from '@aws-cdk/aws-sns'
import * as cdk from '@aws-cdk/core'

export const createSnsTopic = (stack: cdk.Stack, name: string): Topic => {
  return new sns.Topic(stack, name)
}

export type Topic = sns.Topic