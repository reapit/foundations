import { createSqsQueue, Queue, Stack } from '@reapit/ts-scripts/src/cdk'

export enum QueueNames {
  CODEBUILD_EXECUTOR = 'CODEBUILD_EXECUTOR',
  CODEBUILD_VERSION_DEPLOY = 'CODEBUILD_VERSION_DEPLOY',
  PIPELINE_SETUP = 'PIPELINE_SETUP',
  PIPELINE_TEAR_DOWN_START = 'PIPELINE_TEAR_DOWN_START',
  PIPELINE_TEAR_DOWN = 'PIPELINE_TEAR_DOWN',
}

export const createSqsQueues = (stack: Stack): Record<QueueNames, Queue> => {
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
  }

  return (Object.keys(queueConfig) as Array<QueueNames>).reduce<{ [k in QueueNames]: Queue }>((queues, queueName) => {
    queues[queueName] = createSqsQueue(stack, queueName, queueConfig[queueName].visibilityTimeout)

    return queues
  }, {} as any)
}
