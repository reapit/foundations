import * as cdk from 'aws-cdk-lib'
import {
  aws_lambda as lambda,
  aws_ec2 as ec2,
  aws_lambda_event_sources as lambda_event_sources,
  aws_sns_subscriptions as sns_subscriptions,
  aws_logs as logs,
} from 'aws-cdk-lib'

const { SqsEventSource } = lambda_event_sources
const { LambdaSubscription } = sns_subscriptions

import { Queue } from './sqs-queue'
import { Topic } from './sns-topic'

export const createFunction = (
  scope: cdk.Stack,
  functionName: string,
  entry: string | lambda.AssetCode,
  handler: string,
  environment?: Record<string, string>,
  vpc?: ec2.Vpc,
  duration?: number,
  ram?: number,
  runtime?: lambda.Runtime,
): lambda.Function => {
  return new lambda.Function(scope, functionName, {
    timeout: cdk.Duration.seconds(duration || 30),
    environment,
    memorySize: ram || 1024,
    handler,
    vpc,
    code: typeof entry === 'string' ? lambda.Code.fromAsset(entry) : entry,
    runtime: runtime || lambda.Runtime.NODEJS_20_X,
    logRetention: logs.RetentionDays.ONE_MONTH,
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
