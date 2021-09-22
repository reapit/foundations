import { Queue } from "@aws-cdk/aws-sqs";
import { Construct } from "@aws-cdk/core";

export const createSqsQueues = (app: Construct) => {
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

    queues[queueName] = new Queue(app, `cloud-deployment-${queueName}`, {
      queueName,
      visibilityTimeout: queueConfig[queueName].visibilityTimeout,
    })

    return queues
  }, {})
}
