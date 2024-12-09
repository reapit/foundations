import {
  BucketCannedACL,
  DeleteBucketPolicyCommand,
  PutBucketAclCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from '@aws-sdk/client-s3'

export const handler = async (event) => {
  const bucketNames = process.env.BUCKET_NAMES?.split(',') || []

  const client = new S3Client({})

  const bucket = (bucketName: string, region: string = 'us-east-1'): string =>
    `https://s3express-control.${region}.amazonaws.com/${bucketName}`
  const bucketArn = (bucketName: string): string => `arn:aws:s3:::${bucketName}`

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new DeleteBucketPolicyCommand({
          Bucket: bucket(bucketName),
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutBucketPolicyCommand({
          Bucket: bucket(bucketName),
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
                Resource: `${bucketArn}/*`,
              },
              {
                Effect: 'Allow',
                Principal: {
                  AWS: '*',
                },
                Action: ['s3:Get*', 's3:List*', 's3:Put*'],
                // Resource: `arn:aws:s3:::v2-cloud-deployment-live-prod/*`,
                Resource: `${bucketArn}/*`,
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
        new PutBucketAclCommand({
          Bucket: bucket(bucketName),
          ACL: BucketCannedACL.public_read,
          GrantRead: 'public',
          GrantFullControl: 'read',
        }),
      )
    }),
  )

  await Promise.all(
    bucketNames.map((bucketName) => {
      return client.send(
        new PutPublicAccessBlockCommand({
          Bucket: bucket(bucketName),
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
