import { PutPublicAccessBlockCommand, S3Client, BucketCannedACL, PutBucketAclCommand } from '@aws-sdk/client-s3'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

const resolveBucket = async (client: S3Client, bucketName: string) => {
  try {
    await client.send(
      new PutBucketAclCommand({
        Bucket: bucketName,
        ACL: BucketCannedACL.private,
      }),
    )
  } catch (error) {
    console.log(`bucket [${bucketName}] failed to update ACL`)
  }

  try {
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
  } catch (error) {
    console.log(`bucket [${bucketName}] failed to update public access block`)
  }

  // await Promise.all(
  //   bucketInputs.map((bucket) => {
  //     return client.send(
  //       new PutBucketOwnershipControlsCommand({
  //         Bucket: bucket,
  //         OwnershipControls: {
  //           Rules: [
  //             {
  //               ObjectOwnership: 'BucketOwnerEnforced',
  //             },
  //           ],
  //         },
  //       }),
  //     )
  //   }),
  // )
}

export const resolveProductionS3BucketPermissions: OnEventHandler = async (event) => {
  if (event.RequestType === 'Delete')
    return {
      PhysicalResourceId: event.PhysicalResourceId,
      Data: {
        skipped: true,
      },
    }

  const client = new S3Client({})

  const bucketInputs = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  bucketInputs.forEach((bucketName) => {
    resolveBucket(client, bucketName)
  })

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {},
  }
}
