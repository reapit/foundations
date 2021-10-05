import { Topic } from '@aws-cdk/aws-sns'
import { CdkStack } from "./cdk-stack"


export const createSnsTopic = (stack: CdkStack): Topic => {
  return new Topic(stack as any, 'cloud-deployment-service-codebuild-topic', {
    contentBasedDeduplication: true,
    displayName: 'codebuild topic sns for deployment-service',
    fifo: false,
    topicName: 'cloud-deployment-service-codebuild-topic',
  })
}
