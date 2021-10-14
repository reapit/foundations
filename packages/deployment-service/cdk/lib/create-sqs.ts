import { Queue } from '@aws-cdk/aws-sqs'
import { Duration } from '@aws-cdk/core'
import { CdkStack } from './cdk-stack'

export enum QueueNames {
  CODEBUILD_EXECUTOR = 'CodebuildExecutor',
  CODEBUILD_DEPLOY = 'CodebuildDeploy',
  PIPELINE_SETUP = 'PipelineSetup',
  PIPELINE_TEAR_DOWN_START = 'PipelineTearDownStart',
  PIPELINE_TEAR_DOWN = 'PipelineTearDown',
}

export const createSqsQueues = (stack: CdkStack) => {
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
    const duration =
      typeof queueConfig[queueName].visibilityTimeout !== 'undefined'
        ? Duration.seconds(queueConfig[queueName].visibilityTimeout as number)
        : undefined

    queues[queueName] = new Queue(stack as any, `cloud-deployment-${queueName}`, {
      queueName,
      visibilityTimeout: duration as any,
    })

    return queues
  }, {} as any)
}
