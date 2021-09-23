import { Construct } from "@aws-cdk/core"
import { Topic } from '@aws-cdk/aws-sns'


export const createSnsTopic = (app: Construct): Topic => {
  return new Topic(app as any, 'cloud-deployment-service-codebuild-topic', {
    contentBasedDeduplication: true,
    displayName: 'codebuild topic sns for deployment-service',
    fifo: true,
    topicName: 'cloud-deployment-service-codebuild-topic',
  })
}
