import { Project, ISecret, Effect, PolicyStatement, Bucket, Queue, Stack } from '@reapit/ts-scripts/src/cdk'
import { AccountPrincipal, CompositePrincipal, Policy, Role } from 'aws-cdk-lib/aws-iam'
import { PhysicalName } from 'aws-cdk-lib'
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
  usercodeStackRole: Role
}

export const createPolicies = ({
  buckets,
  queues,
  secretManager,
  codeBuild,
  usercodeStack,
}: {
  buckets: { [s: string]: Bucket }
  queues: { [s: string]: Queue }
  secretManager: ISecret
  codeBuild: Project
  usercodeStack: Stack
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
    actions: ['secretsmanager:GetSecretValue', 'secretsmanager:DescribeSecret'],
  })
  const route53Policy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [`arn:aws:route53:::hostedzone/${config.HOSTED_ZONE_ID}`],
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
      'cloudfront:DeleteDistribution',
      'cloudfront:GetDistribution',
      'cloudfront:UpdateDistribution',
      'cloudfront:CreateInvalidation',
    ],
  })

  // create a policy that allows the lambda to do what it needs to do in the usercode stack
  const usercodePolicy = new Policy(usercodeStack, 'UsercodePolicy')
  usercodePolicy.addStatements(S3BucketPolicy, route53Policy, cloudFrontPolicy)
  // create a role that lambdas can assume in the usercode stack, with the policy we just created
  const usercodeStackRole = new Role(usercodeStack, 'UsercodeStackRole', {
    assumedBy: new CompositePrincipal(
      new AccountPrincipal(config.AWS_ACCOUNT_ID),
      new AccountPrincipal(usercodeStack.account),
    ),
    roleName: PhysicalName.GENERATE_IF_NEEDED,
  })
  usercodeStackRole.attachInlinePolicy(usercodePolicy)

  // a policy statement which allows lambdas in the main stack to assume that role
  const lambdaAssumeUsercodeRole = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [usercodeStackRole.roleArn],
    actions: ['sts:AssumeRole'],
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

  const commonBackendPolicies = [
    lambdaInvoke,
    secretManagerPolicy,
    S3BucketPolicy,
    sqsPolicies,
    lambdaAssumeUsercodeRole,
  ]

  return {
    commonBackendPolicies,
    codebuildExecPolicy,
    cloudFrontPolicy,
    route53Policy,
    sqsPolicies,
    secretManagerPolicy,
    S3BucketPolicy,
    usercodeStackRole,
  }
}
