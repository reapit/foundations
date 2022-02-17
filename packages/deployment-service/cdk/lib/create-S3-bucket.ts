import { Stack, Bucket, createBucket } from '@reapit/ts-scripts/src/cdk'

export enum BucketNames {
  LIVE = 'cloud-deployment-live-dev',
  LOG = 'cloud-deployment-log-dev',
  VERSION = 'cloud-deployment-version-dev',
  REPO_CACHE = 'cloud-deployment-repo-cache-dev',
}

export const createS3Buckets = (stack: Stack): Record<BucketNames, Bucket> => {
  const bucketOptions: {
    [k in BucketNames]: {
      public?: boolean
      get?: boolean
      list?: boolean
      put?: boolean
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
    [BucketNames.REPO_CACHE]: {
      put: true,
      get: true,
    },
    [BucketNames.VERSION]: {
      get: true,
      list: true,
      put: true,
    },
  }

  return (Object.keys(bucketOptions) as Array<BucketNames>).reduce<{ [k in BucketNames]: Bucket }>(
    (buckets, bucketName) => {
      buckets[bucketName] = createBucket(stack, bucketName, bucketOptions[bucketName])
      return buckets
    },
    {} as any,
  )
}
