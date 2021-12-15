import { createSqsQueue, Queue } from '@reapit/ts-scripts/src/cdk/components/sqs-queue'
import { Stack } from '@reapit/ts-scripts/src/cdk/components/stack'

export enum QueueNames {
  CODEBUILD_EXECUTOR = 'CodebuildExecutor',
  CODEBUILD_DEPLOY = 'CodebuildDeploy',
  PIPELINE_SETUP = 'PipelineSetup',
  PIPELINE_TEAR_DOWN_START = 'PipelineTearDownStart',
  PIPELINE_TEAR_DOWN = 'PipelineTearDown',
}

export const createSqsQueues = (stack: Stack): Record<QueueNames, Queue> => {
  const queueConfig: {
    [k in QueueNames]: {
      visibilityTimeout?: number
    }
  } = {
    [QueueNames.CODEBUILD_EXECUTOR]: {},
    [QueueNames.CODEBUILD_DEPLOY]: {
      visibilityTimeout: 300,
    },
    [QueueNames.PIPELINE_SETUP]: {
      visibilityTimeout: 300,
    },
    [QueueNames.PIPELINE_TEAR_DOWN_START]: {
      visibilityTimeout: 300,
    },
    [QueueNames.PIPELINE_TEAR_DOWN]: {
      visibilityTimeout: 300, // Determine if this needs a delay?
    },
  }

  return (Object.keys(queueConfig) as Array<QueueNames>).reduce<{ [k in QueueNames]: Queue }>((queues, queueName) => {
    queues[queueName] = createSqsQueue(stack, queueName, queueConfig[queueName].visibilityTimeout)

    return queues
  }, {} as any)
}

export type SQSQueue = Queue
