import { Construct } from "@aws-cdk/core"
import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'


export const createSns = (app: Construct) => {
  const topic = new sns.Topic(app, 'cloud-deployment-service-codebuild-topic', {
    contentBasedDeduplication: true,
    displayName: 'codebuild topic sns for deployment-service',
    fifo: true,
    topicName: 'cloud-deployment-service-codebuild-topic',
  })

  // TODO lambda trigger/endpoint?
  topic.addSubscription(new subs.UrlSubscription(''));
}
