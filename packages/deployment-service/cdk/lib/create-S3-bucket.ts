import { ArnPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam'
import { Bucket } from '@aws-cdk/aws-s3'
import { CdkStack } from './cdk-stack'

export const createS3Buckets = (stack: CdkStack) => {
  const bucketOptions: {
    [s: string]: {
      public?: boolean,
      get?: boolean,
      list?: boolean,
      put?: boolean,
    }
  } = {
    [process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string]: {
      public: true,
      get: true,
      list: true,
      put: true,
    },
    [process.env.DEPLOYMENT_LOG_BUCKET_NAME as string]: {
      put: true,
    },
    [process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string]: {
      get: true,
      list: true,
      put: true,
    },
  }

  return Object.keys(bucketOptions).reduce<{[s: string]: Bucket}>((buckets, bucketName) => {

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
  }, {})
}
