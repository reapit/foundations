import { Stack, Bucket, createBucket, BucketOptions } from '@reapit/ts-scripts/src/cdk'
import { aws_s3 } from 'aws-cdk-lib'

export enum BucketNames {
  LIVE = 'cloud-deployment-live',
  LOG = 'cloud-deployment-log',
  VERSION = 'cloud-deployment-version',
  REPO_CACHE = 'cloud-deployment-repo-cache',
}

export const createS3Buckets = (stack: Stack, usercodeStack: Stack, envStage: string): Record<BucketNames, aws_s3.IBucket> => {
  const bucketOptions: {
    [k in BucketNames]: BucketOptions
  } = {
    [BucketNames.LIVE]: {
      public: true,
      get: true,
      list: true,
      put: true,
      stack: usercodeStack,
    },
    [BucketNames.LOG]: {
      put: true,
      stack: usercodeStack,
    },
    [BucketNames.REPO_CACHE]: {
      put: true,
      get: true,
      stack: usercodeStack,
    },
    [BucketNames.VERSION]: {
      get: true,
      list: true,
      put: true,
      stack: usercodeStack,
    },
  }

  return (Object.keys(bucketOptions) as Array<BucketNames>).reduce<{ [k in BucketNames]: aws_s3.IBucket }>(
    (buckets, bucketName) => {
      const existingBucket = aws_s3.Bucket.fromBucketName(bucketOptions[bucketName].stack || stack, bucketName, bucketName)

      if (existingBucket) buckets[bucketName] = existingBucket || createBucket(
        bucketOptions[bucketName].stack || stack,
        `${bucketName}-${envStage}`,
        bucketOptions[bucketName],
      )
      return buckets
    },
    {} as any,
  )
}
