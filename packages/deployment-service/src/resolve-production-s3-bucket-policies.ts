import { DeleteBucketPolicyCommand, PutBucketPolicyCommand, S3Client } from '@aws-sdk/client-s3'

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

export const resolveProductionS3BucketPolicies = async () => {
  const client = new S3Client({})

  const bucketInputs = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

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
