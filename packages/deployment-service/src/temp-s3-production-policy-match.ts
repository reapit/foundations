import {
  BucketCannedACL,
  DeleteBucketPolicyCommand,
  PutBucketAclCommand,
  PutBucketOwnershipControlsCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from '@aws-sdk/client-s3'

export const handler = async (event) => {
  const bucketNames = process.env.BUCKETS?.split(',') || []

  const client = new S3Client({
    region: 'eu-west-2',
  })

  const bucketArn = (bucketName: string): string => `arn:aws:s3:::${bucketName}`

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new DeleteBucketPolicyCommand({
          Bucket: bucketName,
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutBucketPolicyCommand({
          Bucket: bucketName,
          Policy: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  AWS: '*',
                },
                Action: 's3:GetObject',
                // Resource: `arn:aws:s3:::v2-cloud-deployment-live-prod/*`,
                Resource: `${bucketArn(bucketName)}/*`,
              },
              {
                Effect: 'Allow',
                Principal: {
                  AWS: '*',
                },
                Action: ['s3:Get*', 's3:List*', 's3:Put*'],
                // Resource: `arn:aws:s3:::v2-cloud-deployment-live-prod/*`,
                Resource: `${bucketArn(bucketName)}/*`,
              },
            ],
          }),
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutBucketOwnershipControlsCommand({
          Bucket: bucketName,
          OwnershipControls: {
            Rules: [
              {
                ObjectOwnership: 'BucketOwnerPreferred',
              },
            ],
          },
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutBucketAclCommand({
          Bucket: bucketName,
          ACL: BucketCannedACL.public_read,
          // GrantRead: 'public',
          // GrantFullControl: 'read',
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutPublicAccessBlockCommand({
          Bucket: bucketName,
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: false,
            IgnorePublicAcls: false,
            BlockPublicPolicy: false,
            RestrictPublicBuckets: false,
          },
        }),
      )
    }),
  )
}
