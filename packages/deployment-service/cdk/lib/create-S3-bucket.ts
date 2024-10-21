import { Stack, Bucket, createBucket, BucketOptions } from '@reapit/ts-scripts/src/cdk'

export enum BucketNames {
  LIVE = 'v2-cloud-deployment-live',
  LOG = 'v2-cloud-deployment-log',
  VERSION = 'v2-cloud-deployment-version',
  REPO_CACHE = 'v2-cloud-deployment-repo-cache',
}

export const createS3Buckets = (stack: Stack, usercodeStack: Stack, envStage: string): Record<BucketNames, Bucket> => {
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

  return (Object.keys(bucketOptions) as Array<BucketNames>).reduce<{ [k in BucketNames]: Bucket }>(
    (buckets, bucketName) => {
      buckets[bucketName] = createBucket(
        bucketOptions[bucketName].stack || stack,
        `${bucketName}-${envStage}`,
        bucketOptions[bucketName],
      )
      return buckets
    },
    {} as any,
  )
}
