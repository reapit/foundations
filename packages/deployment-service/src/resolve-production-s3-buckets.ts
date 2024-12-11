import {
  DeleteBucketPolicyCommand,
  PutBucketOwnershipControlsCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
  BucketCannedACL,
  PutBucketAclCommand,
} from '@aws-sdk/client-s3'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

type BucketPolicyStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Condition?: string[]
  Resource: string
  Principal: {
    [s: string]: string
  }
}

const bucketArn = (bucketName: string): string => `arn:aws:s3:::${bucketName}`

const resolveBucketPolicies = (client: S3Client) => async (bucketInputs: string[]) => {
  await Promise.all(
    bucketInputs.map((bucketName) => {
      return client.send(
        new DeleteBucketPolicyCommand({
          Bucket: bucketName,
        }),
      )
    }),
  )

  await Promise.all(
    bucketInputs.map((bucketName) => {
      const statements: BucketPolicyStatement[] = [
        {
          Effect: 'Allow',
          Action: ['s3:Get*', 's3:List*', 's3:Put*'],
          Resource: `${bucketArn(bucketName)}/*`,
          Principal: {
            AWS: '*',
          },
          // Condition?? TODO
        },
        {
          Effect: 'Allow',
          Action: ['s3:Get*'],
          Resource: `${bucketArn(bucketName)}/*`,
          Principal: {
            AWS: '*',
          },
          // Condition?? TODO
        },
        {
          Effect: 'Allow',
          Action: ['s3:Get*'],
          Resource: `${bucketArn(bucketName)}/*`,
          Principal: {
            Service: 'cloudfront.amazonaws.com',
          },
          // Condition?? TODO
        },
        {
          Effect: 'Allow',
          Action: ['s3:Get*'],
          Resource: `${bucketArn(bucketName)}/*`,
          Principal: {
            Service: 'codebuild.amazonaws.com',
          },
          // Condition?? TODO
        },
      ]

      return client.send(
        new PutBucketPolicyCommand({
          Bucket: bucketName,
          Policy: JSON.stringify({
            Version: '2012-10-17',
            Statement: statements,
          }),
        }),
      )
    }),
  )
}

export const resolveProductionS3Buckets: OnEventHandler = async (event) => {
  const client = new S3Client({})

  const bucketInputs = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  await resolveBucketPolicies(client)(bucketInputs)

  // TODO need to work out ACL policies
  // don't need ACL?
  await Promise.all(
    bucketInputs.map((bucketName) => {
      return client.send(
        new PutBucketAclCommand({
          Bucket: bucketName,
          ACL: BucketCannedACL.private,
        }),
      )
    }),
  )

  await Promise.all(
    bucketInputs.map((bucket) => {
      return client.send(
        new PutBucketOwnershipControlsCommand({
          Bucket: bucket,
          OwnershipControls: {
            Rules: [
              {
                ObjectOwnership: 'BucketOwnerEnforced',
              },
            ],
          },
        }),
      )
    }),
  )

  await Promise.all(
    bucketInputs.map((bucket) => {
      if (typeof bucket === 'undefined') return Promise.resolve()

      return client.send(
        new PutPublicAccessBlockCommand({
          Bucket: bucket,
          PublicAccessBlockConfiguration: {
            BlockPublicPolicy: false,
            BlockPublicAcls: false,
            RestrictPublicBuckets: false,
            IgnorePublicAcls: false,
          },
          // PublicReadAccess: false,
        }),
      )
    }),
  )

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {
      skipped: true,
    },
  }
}
