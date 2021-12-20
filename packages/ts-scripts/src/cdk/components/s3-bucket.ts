import * as cdk from 'aws-cdk-lib'
import { aws_s3 as s3, aws_iam as iam } from 'aws-cdk-lib'

const { ArnPrincipal, Effect, PolicyStatement } = iam

type BucketOptions = {
  public?: boolean
  get?: boolean
  list?: boolean
  put?: boolean
}

export const createBucket = (stack: cdk.Stack, bucketName: string, options?: BucketOptions): s3.Bucket => {
  const bucket = new s3.Bucket(stack, bucketName, {
    publicReadAccess: options?.public,
    websiteIndexDocument: options?.public ? 'index.html' : undefined,
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
      effect: Effect.ALLOW,
      actions,
      resources: [bucket.arnForObjects('*')],
      principals: [new ArnPrincipal('*')],
    }),
  )
  return bucket
}

export type Bucket = s3.Bucket
