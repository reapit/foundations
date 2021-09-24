import { Queue } from "@aws-cdk/aws-sqs";
import { Duration } from "@aws-cdk/core";
import { CdkStack } from "./cdk-stack";

export const createSqsQueues = (stack: CdkStack) => {
  const queueConfig: {[s: string]: {
    visibilityTimeout?: number,
  }} = {
    ['CodebuildExecutor']: {},
    ['CodebuildDeploy']: {
      visibilityTimeout: 300,
    },
    ['PipelineSetup']: {
      visibilityTimeout: 300,
    },
    ['PipelineTearDownStart']: {
      visibilityTimeout: 300,
    },
    ['PipelineTearDown']: {
      visibilityTimeout: 300, // Determine if this needs a delay?
    },
  }

  return Object.keys(queueConfig).reduce<{[s: string]: Queue}>((queues, queueName) => {

    const duration = typeof queueConfig[queueName].visibilityTimeout !== 'undefined' ? Duration.seconds(queueConfig[queueName].visibilityTimeout as number) : undefined

    queues[queueName] = new Queue(stack as any, `cloud-deployment-${queueName}`, {
      queueName,
      visibilityTimeout: duration as any,
    })

    return queues
  }, {})
}
