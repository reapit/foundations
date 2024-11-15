import { aws_s3, PhysicalName, aws_iam, Stack } from 'aws-cdk-lib'
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam'

export enum BucketNames {
  LIVE = 'v2-cloud-deployment-live',
  LOG = 'v2-cloud-deployment-log',
  VERSION = 'v2-cloud-deployment-version',
  REPO_CACHE = 'v2-cloud-deployment-repo-cache',
}

type BucketOptions = {
  public?: boolean
  get?: boolean
  list?: boolean
  put?: boolean
  stack?: Stack
}

export const createBucket = ({
  stack,
  bucketName,
  options,
}: {
  stack: Stack
  bucketName: string
  options?: BucketOptions
}): aws_s3.Bucket => {
  const bucket = new aws_s3.Bucket(options?.stack || stack, bucketName, {
    websiteIndexDocument: options?.public ? 'index.html' : undefined,
    bucketName: bucketName || PhysicalName.GENERATE_IF_NEEDED,
    blockPublicAccess: {
      blockPublicPolicy: false,
      blockPublicAcls: false,
      restrictPublicBuckets: false,
      ignorePublicAcls: false,
    },
    publicReadAccess: false,
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
    new aws_iam.PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      actions,
      resources: [bucket.arnForObjects('*')],
      principals: [new aws_iam.ArnPrincipal('*')],
    }),
  )

  // allows cloudfront to access this bucket
  bucket.addToResourcePolicy(
    new aws_iam.PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      actions: ['s3:Get*'],
      resources: [bucket.arnForObjects('*')],
      principals: [new ServicePrincipal('cloudfront.amazonaws.com')],
    }),
  )

  bucket.addToResourcePolicy(
    new aws_iam.PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      actions: ['s3:Get*'],
      resources: [bucket.arnForObjects('*')],
      principals: [new ServicePrincipal('codebuild.amazonaws.com')],
    }),
  )

  return bucket
}

export const createS3Buckets = (usercodeStack: Stack, envStage: string): Record<BucketNames, aws_s3.IBucket> => {
  const bucketOptions: {
    [k in BucketNames]: BucketOptions
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

  return (Object.keys(bucketOptions) as Array<BucketNames>).reduce<{ [k in BucketNames]: aws_s3.IBucket }>(
    (buckets, bucketName) => {
      // const existingBucket =
      // Bucket.fromBucketName(usercodeStack, `lookup-${bucketName}`, `${bucketName}-${envStage}`)

      // buckets[bucketName] = existingBucket ?? createBucket({
      buckets[bucketName] = createBucket({
        stack: usercodeStack,
        bucketName: `${bucketName}-${envStage}`,
        options: bucketOptions[bucketName],
      })
      return buckets
    },
    {} as any,
  )
}
