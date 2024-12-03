import {
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from '@aws-sdk/client-s3'

type BucketPolicy = {
  effect: string
  actions: string[]
  conditions?: string[]
  resources: string[]
}

export const resolveProductionS3Buckets = async (event) => {
  const client = new S3Client({})

  const bucketInputs = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  // TODO need to resolve ACLs as well
  const bucketPolicies: ({ bucket: string; policy: BucketPolicy } | undefined)[] = await Promise.all(
    bucketInputs.map(async (bucket) => {
      const result = await client.send(
        new GetBucketPolicyCommand({
          Bucket: bucket,
        }),
      )

      if (!result.Policy) return undefined

      return {
        bucket,
        policy: JSON.parse(result.Policy),
      }
    }),
  )

  if (bucketPolicies.some((policy) => typeof policy === 'undefined')) {
    console.log('policies', bucketPolicies)
    throw new Error('A policy was undefined')
  }

  // TODO update bucket ACL options
  await Promise.all(
    bucketPolicies.map((config) => {
      if (typeof config === 'undefined') throw new Error('Policy was undefined')

      if (config.policy?.actions.includes('Put*')) {
        // PaaS account Policy
        return client.send(
          new PutBucketPolicyCommand({
            Bucket: config?.bucket,
            Policy: JSON.stringify({
              ...config?.policy,
              condition: {
                Like: process.env.PAAS_ACCOUNT_ID,
              },
            }),
          }),
        )
      } else {
        // IaaS account Policy

        return client.send(
          new PutBucketPolicyCommand({
            Bucket: config?.bucket,
            Policy: JSON.stringify({
              ...config?.policy,
              condition: {
                Like: process.env.IAAS_ACCOUNT_ID,
              },
            }),
          }),
        )
      }
    }),
  )

  await Promise.all(
    bucketPolicies.map((config) => {
      if (typeof config === 'undefined') return Promise.resolve()

      return client.send(
        new PutPublicAccessBlockCommand({
          Bucket: config.bucket,
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
}
