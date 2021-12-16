import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as ec2 from '@aws-cdk/aws-ec2'

import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { LambdaSubscription } from '@aws-cdk/aws-sns-subscriptions'

import { Queue } from './sqs-queue'
import { Topic } from './sns-topic'

export const createFunction = (
  scope: cdk.Stack,
  functionName: string,
  entry: string | lambda.AssetCode,
  handler: string,
  environment?: Record<string, string>,
  vpc?: ec2.Vpc,
): lambda.Function => {
  return new lambda.Function(scope, functionName, {
    timeout: cdk.Duration.seconds(30),
    environment,
    memorySize: 1024,
    handler,
    vpc,
    code: typeof entry === 'string' ? lambda.Code.fromAsset(entry) : entry,
    runtime: lambda.Runtime.NODEJS_14_X,
  })
}

export const addLambdaSQSTrigger = (fn: lambda.Function, queue: Queue) => {
  return fn.addEventSource(new SqsEventSource(queue))
}

export const addLambdaSNSTrigger = (fn: lambda.Function, topic: Topic) => {
  return topic.addSubscription(new LambdaSubscription(fn))
}

export type AssetCode = lambda.AssetCode
export type Function = lambda.Function
