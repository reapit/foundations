import { ArnPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam'
import { Bucket } from '@aws-cdk/aws-s3'
import { CdkStack } from './cdk-stack'

export enum BucketNames {
  LIVE = 'cloud-deployment-live-dev',
  LOG = 'cloud-deployment-log-dev',
  VERSION = 'cloud-deployment-version-dev',
}

export const createS3Buckets = (stack: CdkStack) => {
  const bucketOptions: {
    [k in BucketNames]: {
      public?: boolean,
      get?: boolean,
      list?: boolean,
      put?: boolean,
    }
  } = {
    [BucketNames.LIVE]: {
      public: true,
      get: true,
      list: true,
      put: true,
    },
    [BucketNames.LOG]: {
      put: true,
    },
    [BucketNames.VERSION]: {
      get: true,
      list: true,
      put: true,
    },
  }

  return (Object.keys(bucketOptions) as Array<BucketNames>).reduce<{[k in BucketNames]: Bucket}>((buckets, bucketName) => {

    buckets[bucketName] = new Bucket(stack as any, bucketName, {
      bucketName,
      publicReadAccess: bucketOptions[bucketName]?.public,
      websiteIndexDocument: bucketOptions[bucketName]?.public ? 'index.html' : undefined,
    })

    if (bucketOptions[bucketName].get || bucketOptions[bucketName].list || bucketOptions[bucketName].put) {
      const actions = []

      if (bucketOptions[bucketName].get) {
        actions.push('s3:Get*')
      }
      if (bucketOptions[bucketName].list) {
        actions.push('s3:List*')
      }
      if (bucketOptions[bucketName].put) {
        actions.push('s3:Put*')
      }

      buckets[bucketName].addToResourcePolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions,
        resources: [buckets[bucketName].arnForObjects('*')],
        principals: [
          new ArnPrincipal('*'),
        ],
      }))
    }

    return buckets
  }, {} as any)
}
