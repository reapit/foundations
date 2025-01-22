import {
  PutPublicAccessBlockCommand,
  S3Client,
  BucketCannedACL,
  PutBucketAclCommand,
  PutBucketOwnershipControlsCommand,
  DeleteBucketPolicyCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

const bucketArn = (bucketName: string): string => `arn:aws:s3:::${bucketName}`

type BucketPolicyStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Condition?: string[]
  Resource: string
  Principal: {
    [s: string]: string
  }
}

const resolveBucket = async (client: S3Client, bucketName: string) => {
  await client.send(
    new DeleteBucketPolicyCommand({
      Bucket: bucketName,
    }),
  )

  // try {
  console.log('putBucketACL', bucketName)
  await client.send(
    new PutBucketAclCommand({
      Bucket: bucketName,
      ACL: BucketCannedACL.private,
    }),
  )
  // } catch (error) {
  //   console.error(error)
  //   console.log(`bucket [${bucketName}] failed to update ACL`)
  // }

  console.log('after ACL call')

  await client.send(
    new PutBucketOwnershipControlsCommand({
      Bucket: bucketName,
      OwnershipControls: {
        Rules: [
          {
            ObjectOwnership: 'BucketOwnerEnforced',
          },
        ],
      },
    }),
  )

  const statements: BucketPolicyStatement[] = [
    {
      Effect: 'Allow',
      Action: ['s3:Get*', 's3:List*', 's3:Put*'],
      Resource: `${bucketArn(bucketName)}/*`,
      Principal: {
        AWS: '*',
      },
      // Condition?? TODO for PaaS account
    },
    // {
    //   Effect: 'Allow',
    //   Action: ['s3:Get*'],
    //   Resource: `${bucketArn(bucketName)}/*`,
    //   Principal: {
    //     AWS: '*',
    //   },
    //   // Condition?? TODO
    // },
    {
      Effect: 'Allow',
      Action: ['s3:Get*'],
      Resource: `${bucketArn(bucketName)}/*`,
      Principal: {
        Service: 'cloudfront.amazonaws.com',
      },
      // Condition?? TODO for IaaS account
    },
    {
      Effect: 'Allow',
      Action: ['s3:Get*'],
      Resource: `${bucketArn(bucketName)}/*`,
      Principal: {
        Service: 'codebuild.amazonaws.com',
      },
      // Condition?? TODO for IaaS account
    },
  ]

  await client.send(
    new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: statements,
      }),
    }),
  )
  // try {
  console.log('putPublicAccessBlock', bucketName)
  await client.send(
    new PutPublicAccessBlockCommand({
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicPolicy: true,
        BlockPublicAcls: true,
        RestrictPublicBuckets: true,
        IgnorePublicAcls: true,
      },
    }),
  )
  // } catch (error) {
  //   console.error(error)
  //   console.log(`bucket [${bucketName}] failed to update public access block`)
  // }
}

export const resolveProductionS3BucketPermissions: OnEventHandler = async (event) => {
  console.log('event', event)
  if (event.RequestType === 'Delete')
    return {
      PhysicalResourceId: event.PhysicalResourceId,
      Data: {
        skipped: true,
      },
    }

  const client = new S3Client({})

  const bucketInputs = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  console.log('bucketInputs', bucketInputs)

  await Promise.all(bucketInputs.map(async (bucketName) => resolveBucket(client, bucketName)))

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {},
  }
}
