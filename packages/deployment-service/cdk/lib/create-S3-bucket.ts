import { Bucket, BucketPolicy } from '@aws-cdk/aws-s3'
import { Construct } from '@aws-cdk/core'

export const createS3Buckets = (app: Construct) => {
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
    },
    [process.env.DEPLOYMENT_LOG_BUCKET_NAME as string]: {
    },
    [process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string]: {
      get: true,
      list: true,
      put: true,
    },
  }

  return Object.keys(bucketOptions).reduce<{[s: string]: Bucket}>((buckets, bucketName) => {

    buckets[bucketName] = new Bucket(app as any, bucketName, {
      bucketName,
      publicReadAccess: bucketOptions[bucketName]?.public,
      websiteIndexDocument: bucketOptions[bucketName]?.public ? 'index.html' : undefined,
      
    })

    if (bucketOptions[bucketName].get || bucketOptions[bucketName].list || bucketOptions[bucketName].put) {
      // TODO work out how to enable get and put requests in policy for code build
      const policy = new BucketPolicy(app as any, `${bucketName}-policy`, {
        bucket: buckets[bucketName],
      })
    }

    return buckets
  }, {})
}
