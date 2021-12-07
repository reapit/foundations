import { Project } from '@aws-cdk/aws-codebuild'
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam'
import { DatabaseCluster } from '@aws-cdk/aws-rds'
import { Bucket } from '@aws-cdk/aws-s3'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { Queue } from '@aws-cdk/aws-sqs'
import config from '../../config.json'

export enum PolicyNames {
  // lambdaInvoke = 'lambdaInvoke',
  codebuildExecPolicy = 'codebuildExecPolicy',
  cloudFrontPolicy = 'cloudFrontPolicy',
  route53Policy = 'route53Policy',
  sqsPolices = 'sqsPolicies',
  secretManagerPolicy = 'secretManagerPolicy',
  S3BucketPolicy = 'S3BucketPolicy',
}

type namedPolicyType = {
  [k in PolicyNames]: PolicyStatement
}

type namedPolicyGroupType = {
  commonBackendPolicies: PolicyStatement[]
  dbPolicies: PolicyStatement[]
}

export const createPolicies = ({
  buckets,
  queues,
  secretManager,
  codeBuild,
  aurora,
}: {
  buckets: { [s: string]: Bucket }
  queues: { [s: string]: Queue }
  secretManager: ISecret
  codeBuild: Project
  aurora: DatabaseCluster
}): namedPolicyGroupType & namedPolicyType => {
  const S3BucketPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: Object.values(buckets).map((bucket) => bucket.bucketArn),
    actions: [
      's3:PutObject',
      's3:GetObject',
      's3:ListBucket',
      's3:PutObjectAcl',
      's3:GetBucketAcl',
      's3:GetObjectAcl',
      's3:GetBucketLocation',
      's3:GetObjectRetention',
      's3:GetObjectVersionAcl',
      's3:DeleteObject',
      's3:DeleteObjectVersion',
    ],
  })

  const sqsPolicies = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: Object.values(queues).map((queue) => queue.queueArn),
    actions: ['sqs:GetQueueAttributes', 'sqs:SendMessage', 'sqs:DeleteMessage'],
  })

  const secretManagerPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [secretManager.secretArn],
    actions: [
      'secretsmanager:GetSecretValue',
      'secretsmanager:DescribeSecret',
    ],
  })

  const dbPolicies = [secretManagerPolicy]

  const route53Policy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [
      // TODO: env
      'arn:aws:route53:::hostedzone/Z02367201ZA0CZPSM3N2H', // is this safe to put in without env?
    ],
    actions: [
      'route53:GetHostedZone',
      'route53:ChangeResourceRecordSets',
      'route53:GetChange',
      'route53:ListResourceRecordSets',
    ],
  })

  const cloudFrontPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: ['*'],
    actions: [
      'cloudfront:CreateDistribution',
      'cloudfront:CreateInvalidation',
      'cloudfront:DeleteDistribution',
      'cloudfront:GetDistribution',
      'cloudfront:UpdateDistribution',
    ],
  })

  const lambdaInvoke = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [
      // Temp solution for hiding arn
      config.API_KEY_INVOKE_ARN,
    ],
    actions: ['lambda:InvokeFunction'],
  })

  const codebuildExecPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [codeBuild.projectArn],
    actions: ['codebuild:StartBuild'],
  })

  const commonBackendPolicies = [lambdaInvoke, ...dbPolicies, S3BucketPolicy, sqsPolicies, secretManagerPolicy]

  return {
    commonBackendPolicies,
    dbPolicies,
    codebuildExecPolicy,
    cloudFrontPolicy,
    route53Policy,
    sqsPolicies,
    secretManagerPolicy,
    S3BucketPolicy,
    // lambdaInvoke,
  }
}
