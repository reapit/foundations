import * as cdk from 'aws-cdk-lib'
import { aws_sns as sns } from 'aws-cdk-lib'

export const createSnsTopic = (stack: cdk.Stack, name: string): Topic => {
  return new sns.Topic(stack, name)
}

export type Topic = sns.Topic
