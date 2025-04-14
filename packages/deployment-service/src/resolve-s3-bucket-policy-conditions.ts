import {
  DeletePublicAccessBlockCommand,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

enum BucketPolicyConditions {
  StringEquals = 'StringEquals',
}

enum BucketPolicyConditionKey {
  'aws:SourceAccount' = 'aws:SourceAccount',
  'aws:PrincipalAccount' = 'aws:PrincipalAccount',
}

type BucketPolicyCondition = {
  [key in BucketPolicyConditions]: {
    [key in BucketPolicyConditionKey]?: string | string[]
  }
}

type BucketPolicyStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Condition?: BucketPolicyCondition
  Resource: string
  Principal: {
    [s: string]: string
  }
}

const resolveBucketPolicyConditions =
  (client: S3Client) =>
  async (
    bucketName: string,
    modifyPolicyStatement: (policyStatement: BucketPolicyStatement) => BucketPolicyStatement,
  ) => {
    const policyResult = await client.send(
      new GetBucketPolicyCommand({
        Bucket: bucketName,
      }),
    )

    if (!policyResult.Policy) throw new Error('Policy was not provided')

    const policy: {
      Version: string
      Statement: BucketPolicyStatement[]
    } = JSON.parse(policyResult?.Policy)

    await client.send(
      new PutBucketPolicyCommand({
        Bucket: bucketName,
        Policy: JSON.stringify({
          ...policy,
          Statement: policy.Statement.map((statement) => modifyPolicyStatement(statement)),
        }),
      }),
    )
  }

const migrateS3BucketPolicyConditions = async ({
  bucketNames,
  iaasAccountId,
  paasAccountId,
}: {
  iaasAccountId: string
  paasAccountId: string
  bucketNames: string[]
}) => {
  const client = new S3Client()

  await Promise.all(
    bucketNames.map((bucketName) =>
      client.send(
        new DeletePublicAccessBlockCommand({
          Bucket: bucketName,
        }),
      ),
    ),
  )

  await Promise.all(
    bucketNames.map((bucketName) =>
      resolveBucketPolicyConditions(client)(bucketName, (statement) => ({
        ...statement,
        Condition: statement?.Principal?.Service?.includes('cloudfront')
          ? undefined
          : {
              [BucketPolicyConditions.StringEquals]: {
                [BucketPolicyConditionKey['aws:PrincipalAccount']]: [paasAccountId, iaasAccountId],
              },
            },
      })),
    ),
  )

  await Promise.all(
    bucketNames.map((bucketName) =>
      client.send(
        new PutPublicAccessBlockCommand({
          Bucket: bucketName,
          PublicAccessBlockConfiguration: {
            BlockPublicPolicy: true,
            BlockPublicAcls: true,
            RestrictPublicBuckets: true,
            IgnorePublicAcls: true,
          },
        }),
      ),
    ),
  )
}

const rollbackS3BucketPolicyConditions = async (bucketNames: string[]) => {
  const client = new S3Client()

  await Promise.all(
    bucketNames.map((bucketName) =>
      client.send(
        new DeletePublicAccessBlockCommand({
          Bucket: bucketName,
        }),
      ),
    ),
  )

  await Promise.all(
    bucketNames.map((bucketName) =>
      resolveBucketPolicyConditions(client)(bucketName, (statement) => {
        delete statement.Condition

        return statement
      }),
    ),
  )

  await Promise.all(
    bucketNames.map((bucketName) =>
      client.send(
        new PutPublicAccessBlockCommand({
          Bucket: bucketName,
          PublicAccessBlockConfiguration: {
            BlockPublicPolicy: true,
            BlockPublicAcls: true,
            RestrictPublicBuckets: true,
            IgnorePublicAcls: true,
          },
        }),
      ),
    ),
  )
}

export const resolveS3BucketPolicyConditions: OnEventHandler = async (event) => {
  const bucketNames = process.env.BUCKETS ? process.env.BUCKETS?.split(',') : []

  const iaasAccountId = process.env.IAAS_ACCOUNT_ID
  const paasAccountId = process.env.PAAS_ACCOUNT_ID

  if (typeof iaasAccountId !== 'string' || typeof paasAccountId !== 'string')
    throw new Error('envs for IAAS_ACCOUNT_ID or PAAS_ACCOUNT_ID was not found')

  if (event.RequestType === 'Create') {
    await migrateS3BucketPolicyConditions({
      bucketNames,
      iaasAccountId,
      paasAccountId,
    })
  } else if (event.RequestType === 'Delete') {
    await rollbackS3BucketPolicyConditions(bucketNames)
  }

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {},
  }
}
