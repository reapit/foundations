import { Stack, Bucket, BucketOptions, PolicyStatement } from '@reapit/ts-scripts/src/cdk'
import { aws_s3, PhysicalName, aws_iam } from 'aws-cdk-lib'

export enum BucketNames {
  LIVE = 'v2-cloud-deployment-live',
  LOG = 'v2-cloud-deployment-log',
  VERSION = 'v2-cloud-deployment-version',
  REPO_CACHE = 'v2-cloud-deployment-repo-cache',
}

export const createBucket = (stack: Stack, bucketName: string, options?: BucketOptions): aws_s3.Bucket => {
  const bucket = new aws_s3.Bucket(options?.stack || stack, bucketName, {
    publicReadAccess: false,
    websiteIndexDocument: options?.public ? 'index.html' : undefined,
    bucketName: bucketName || PhysicalName.GENERATE_IF_NEEDED,
    // blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
    accessControl: aws_s3.BucketAccessControl.PRIVATE,
    objectOwnership: aws_s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
  })
  const actions: string[] = []
  if (options?.get) {
    actions.push('s3:Get*')
  }
  if (options?.list) {
    actions.push('s3:List*')
  }
  if (options?.put) {
    actions.push('s3:Put*')
  }

  bucket.addToResourcePolicy(
    new PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      actions,
      resources: [bucket.arnForObjects('*')],
      principals: [new aws_iam.ArnPrincipal('*')],
    }),
  )
  return bucket
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
