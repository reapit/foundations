import { GetBucketPolicyCommand, PutBucketPolicyCommand, S3Client } from '@aws-sdk/client-s3'

type BucketPolicy = {
  effect: string
  actions: string[]
  conditions?: string[]
  resources: string[]
}

export const resolveProductionS3Buckets = async (event) => {
  const client = new S3Client({})

  const bucketPolicies: ({ bucket: string; policy: BucketPolicy } | undefined)[] = await Promise.all(
    [
      // TODO arns of buckets from env
    ].map(async (bucket) => {
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
              conditions: '', // Condition to lock to PaaS account actions
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
              conditions: '', // Confition to lock to IaaS account distros
            }),
          }),
        )
      }
    }),
  )
}
