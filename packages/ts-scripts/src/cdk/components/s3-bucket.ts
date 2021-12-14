import { ArnPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam'
import { Bucket } from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/core'

type BucketOptions = {
  public?: boolean
  get?: boolean
  list?: boolean
  put?: boolean
}

export const createBucket = (stack: cdk.Stack, bucketName: string, options?: BucketOptions) => {
  const bucket = new Bucket(stack, bucketName, {
    publicReadAccess: options?.public,
    websiteIndexDocument: options?.public ? 'index.html' : undefined,
  })
  const actions = []
  if (options.get) {
    actions.push('s3:Get*')
  }
  if (options.list) {
    actions.push('s3:List*')
  }
  if (options.put) {
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