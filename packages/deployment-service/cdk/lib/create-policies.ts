import { Project, ISecret, Effect, PolicyStatement, Stack, Topic } from '@reapit/ts-scripts/src/cdk'
import { AccountPrincipal, ArnPrincipal, CompositePrincipal, Policy, Role } from 'aws-cdk-lib/aws-iam'
import config from '../../config.json'
import { aws_sqs as sqs } from 'aws-cdk-lib'
import { BucketNames } from './create-S3-bucket'
import { IBucket } from 'aws-cdk-lib/aws-s3'

export enum PolicyNames {
  // lambdaInvoke = 'lambdaInvoke',
  codebuildExecPolicy = 'codebuildExecPolicy',
  cloudFrontPolicy = 'cloudFrontPolicy',
  route53Policy = 'route53Policy',
  sqsPolices = 'sqsPolicies',
  secretManagerPolicy = 'secretManagerPolicy',
  S3BucketPolicy = 'S3BucketPolicy',
  originAccessControlPolicy = 'originAccessControlPolicy',
  certificatePolicy = 'certificatePolicy',
}

type namedPolicyType = {
  [k in PolicyNames]: PolicyStatement
}

type namedPolicyGroupType = {
  commonBackendPolicies: PolicyStatement[]
  usercodeStackRoleArn: string
}

export const createPolicies = ({
  buckets,
  queues,
  secretManager,
  codeBuild,
  usercodeStack,
  codebuildSnsTopic,
  githubPemSecretArn,
}: {
  buckets: { [s: string]: IBucket }
  queues: { [s: string]: sqs.IQueue }
  secretManager: ISecret
  codeBuild: Project
  usercodeStack: Stack
  codebuildSnsTopic: Topic
  githubPemSecretArn: string
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

  const LiveS3BucketPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [
      buckets[BucketNames.LIVE].bucketArn,
      buckets[BucketNames.LOG].bucketArn,
      buckets[BucketNames.REPO_CACHE].bucketArn,
      buckets[BucketNames.VERSION].bucketArn,
      `${buckets[BucketNames.LIVE].bucketArn}/*`,
      `${buckets[BucketNames.LOG].bucketArn}/*`,
      `${buckets[BucketNames.REPO_CACHE].bucketArn}/*`,
      `${buckets[BucketNames.VERSION].bucketArn}/*`,
    ],
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

  const githubPemSecretPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [githubPemSecretArn],
    actions: ['secretsmanager:GetSecretValue'],
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

  const codebuildSnssubscriptionPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [codebuildSnsTopic.topicArn],
    actions: ['sns:Subscribe'],
  })

  codebuildSnsTopic.addToResourcePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['sns:Subscribe'],
      principals: [
        new ArnPrincipal(
          `arn:aws:iam::${config.AWS_ACCOUNT_ID}:role/cdk-hnb659fds-cfn-exec-role-${config.AWS_ACCOUNT_ID}-${usercodeStack.region}`, // is hnb659fds always the same?, is usercodeStack region always the same as primary stack?
        ),
      ],
      resources: [codebuildSnsTopic.topicArn],
    }),
  )

  const codebuildExecPolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [codeBuild.projectArn],
    actions: ['codebuild:StartBuild'],
  })

  const parameterStorePolicy = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: ['*'],
    actions: [
      'ssm:PutParameter',
      'ssm:GetParameter',
      'ssm:GetParameters',
      'ssm:DeleteParameter',
      'ssm:GetParameterHistory',
      'ssm:DeleteParameters',
      'ssm:GetParametersByPath',
    ],
  })

  const originAccessControlPolicy = new PolicyStatement({
    actions: ['cloudfront:ListOriginAccessControls'],
    effect: Effect.ALLOW,
    resources: ['*'],
  })

  const certificatePolicy = new PolicyStatement({
    actions: ['acm:RequestCertificate', 'acm:AddTagsToCertificate', 'acm:DescribeCertificate', 'acm:DeleteCertificate'],
    effect: Effect.ALLOW,
    resources: ['*'],
  })

  // create a policy that allows the lambda to do what it needs to do in the usercode stack
  const usercodePolicy = new Policy(usercodeStack, 'UsercodePolicy')
  usercodePolicy.addStatements(
    LiveS3BucketPolicy,
    route53Policy,
    cloudFrontPolicy,
    codebuildSnssubscriptionPolicy,
    codebuildExecPolicy,
    parameterStorePolicy,
    originAccessControlPolicy,
    certificatePolicy,
  )
  const usercodeStackRoleName = `${usercodeStack.stackName}-UsercodeStackRole`
  // create a role that lambdas can assume in the usercode stack, with the policy we just created
  const usercodeStackRole = new Role(usercodeStack, 'UsercodeStackRole', {
    assumedBy: new CompositePrincipal(
      new AccountPrincipal(config.AWS_ACCOUNT_ID),
      new AccountPrincipal(usercodeStack.account),
    ),
    roleName: usercodeStackRoleName,
  })
  usercodeStackRole.attachInlinePolicy(usercodePolicy)

  const usercodeStackRoleArn = `arn:aws:iam::${usercodeStack.account}:role/${usercodeStackRoleName}`

  // a policy statement which allows lambdas in the main stack to assume that 6role
  const lambdaAssumeUsercodeRole = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [usercodeStackRoleArn],
    actions: ['sts:AssumeRole'],
  })

  // TODO remove
  const lambdaInvoke = new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [
      // Temp solution for hiding arn
      config.API_KEY_INVOKE_ARN,
    ],
    actions: ['lambda:InvokeFunction'],
  })

  const commonBackendPolicies = [
    lambdaInvoke,
    secretManagerPolicy,
    S3BucketPolicy,
    sqsPolicies,
    lambdaAssumeUsercodeRole,
    githubPemSecretPolicy,
  ]

  return {
    commonBackendPolicies,
    codebuildExecPolicy,
    cloudFrontPolicy,
    originAccessControlPolicy,
    route53Policy,
    sqsPolicies,
    secretManagerPolicy,
    S3BucketPolicy,
    usercodeStackRoleArn,
    certificatePolicy,
  }
}
