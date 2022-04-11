import { createSqsQueue, Stack } from '@reapit/ts-scripts/src/cdk'
import { aws_sqs as sqs } from 'aws-cdk-lib'

export enum QueueNames {
  CODEBUILD_EXECUTOR = 'CODEBUILD_EXECUTOR',
  CODEBUILD_VERSION_DEPLOY = 'CODEBUILD_VERSION_DEPLOY',
  PIPELINE_SETUP = 'PIPELINE_SETUP',
  PIPELINE_TEAR_DOWN_START = 'PIPELINE_TEAR_DOWN_START',
  PIPELINE_TEAR_DOWN = 'PIPELINE_TEAR_DOWN',
  APP_EVENTS = 'APP_EVENTS',
}

export const createSqsQueues = (stack: Stack): Record<QueueNames, sqs.IQueue> => {
  const queueConfig: {
    [k in QueueNames]: {
      visibilityTimeout?: number
    }
  } = {
    [QueueNames.CODEBUILD_EXECUTOR]: {},
    [QueueNames.CODEBUILD_VERSION_DEPLOY]: {
      visibilityTimeout: 300,
    },
    [QueueNames.PIPELINE_SETUP]: {
      visibilityTimeout: 900,
    },
    [QueueNames.PIPELINE_TEAR_DOWN_START]: {
      visibilityTimeout: 300,
    },
    [QueueNames.PIPELINE_TEAR_DOWN]: {
      visibilityTimeout: 600,
    },
    [QueueNames.APP_EVENTS]: {},
  }

  const queues = (Object.keys(queueConfig) as Array<QueueNames>).reduce<{ [k in QueueNames]: sqs.IQueue }>(
    (queues, queueName) => {
      queues[queueName] = createSqsQueue(stack, queueName, queueConfig[queueName].visibilityTimeout)

      return queues
    },
    {} as any,
  )

  queues[QueueNames.APP_EVENTS] = sqs.Queue.fromQueueArn(
    stack,
    'app_events',
    `arn:aws:sqs:${stack.region}:${stack.account}:Platform_Marketplace_AppModifications`,
  )

  return queues
}
