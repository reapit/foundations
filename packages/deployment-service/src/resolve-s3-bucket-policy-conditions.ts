import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'
import {
  S3Client,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3'

type BucketPolicyStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Condition?: {
    StringLike?: { 'aws:SourceAccount': string[] }
    StringEquals?: { 'aws:SourceAccount': string[] }
  }
  Resource: string
  Principal: {
    [s: string]: string
  }
}

const appendConditionPolicy = (policyJSON: string): string => {
  const policies: BucketPolicyStatement[] = JSON.parse(policyJSON)

  return JSON.stringify(policies.map<BucketPolicyStatement>(policy => ({
    ...policy,
    Condition: {
      StringEquals: {
        'aws:SourceAccount': [
          process.env.IAAS_ACCOUNT_ID as string,
          process.env.PAAS_ACCOUNT_ID as string,
        ],
      },
    },
  })))
}

const removeConditionPolicy = (policyJSON: string): string => {
  const policies: BucketPolicyStatement[] = JSON.parse(policyJSON)

  return JSON.stringify(policies.map<BucketPolicyStatement>((policy) => {
    delete policy.Condition

    return {
    ...policy,
  }}))
}

export const handler: OnEventHandler = async (event) => {
  const client = new S3Client({})

  const buckets = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  const bucketPolcies = await Promise.all(buckets.map(async (bucket) => {
    const result = await client.send(new GetBucketPolicyCommand({
      Bucket: bucket,
    }))

    return {
      policy: result.Policy || '{}',
      bucket,
    }
  }))

  if (event.RequestType === 'Create') {
    bucketPolcies.map(({ policy, bucket }) => ({
      bucket,
      policy: appendConditionPolicy(policy),
    }))
  } else if (event.RequestType === 'Delete') {
    bucketPolcies.map(({ policy, bucket }) => ({
      bucket,
      policy: removeConditionPolicy(policy),
    }))
  }

  await Promise.all(bucketPolcies.map(({bucket, policy}) => client.send(new PutBucketPolicyCommand({
    Bucket: bucket,
      Policy: policy,
  }))))

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
