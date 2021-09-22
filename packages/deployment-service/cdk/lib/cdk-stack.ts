import { AssetCode } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { createLambda } from './create-lambda'
import * as path from 'path'
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam'
import { Queue } from '@aws-cdk/aws-sqs'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues } from './create-sqs'
import { createAurora } from './create-aurora'
import { Vpc } from '@aws-cdk/aws-ec2'
import { createCodeBuildProject } from './create-code-build'

type FunctionSetup = {
  policies: PolicyStatement[],
  api?: {
    method: 'string',
    path: 'string',
  },
  queue?: Queue,
}
// TODO add authorizers here, api-key + cognito ^^^

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // TODO run webpack with exec

    // TODO create s3 buckets
    // TODO open s3 buckets for codebuild and cloudfront
    // TODO create codebuild
    // TODO create sns for codebuild
    // TODO make api gateway
    // TODO make sqs queues
    // TODO create lambda functions
    // TODO lambda policies
    // TODO create lambda triggers

    // TODO try to make components reusable

    const vpc = new Vpc(scope as any, `deployment-service-vpc`)

    const buckets = createS3Buckets(scope)
    const queues = createSqsQueues(scope)
    const [secretManager, aurora] = createAurora(scope, vpc)
    const codeBuild = createCodeBuildProject(scope)

    const S3BucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: Object.values(buckets).map(bucket => bucket.bucketArn),
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

    const sqsPolices = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: Object.values(queues).map(queue => queue.queueArn),
      actions: [
        'sqs:GetQueueAttributes',
        'sqs:SendMessage',
        'sqs:DeleteMessage',
      ],
    })

    const secretManagerPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        secretManager.secretArn,
      ],
      actions: [
        'secretsmanager:GetSecretValue',
      ],
    })

    const RDSPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        aurora.clusterArn,
      ],
      actions: [
        'rds-data:BeginTransaction',
        'rds-data:CommitTransaction',
        'rds-data:ExecuteStatement',
      ],
    })

    const dbPolicies = [RDSPolicy, secretManagerPolicy]

    const route53Policy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
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
      resources: [
        '*',
      ],
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
        // TODO get api-key-verify arn
        'arn:aws:lambda:${self:provider.region}:${self:custom.env.AWS_ACCOUNT_ID}:function:cloud-api-key-service-dev-getApiKeyViaInvoke',
      ],
      actions: [
        'lambda:InvokeFunction',
      ],
    })

    const codebuildExecPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        codeBuild.projectArn,
      ],
      actions: [
        'codebuild:StartBuild',
      ],
    })

    const commonBackendPolicies = [
      lambdaInvoke,
      ...dbPolicies,
      S3BucketPolicy,
      sqsPolices,
    ]

    const functionSetups: { [s: string]: FunctionSetup } = {
      'test': {
        policies: [
          ...commonBackendPolicies,
          route53Policy,
          cloudFrontPolicy,
          codebuildExecPolicy,
        ],
      },
    }

    for (const [handler, options] of Object.entries(functionSetups)) {
      const role = new Role(scope, 'Role', {
        assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      })

      options.policies.forEach(policy => role.addToPolicy(policy))
      const lambda = createLambda(scope, handler, AssetCode.fromAsset(path.resolve('..', '..', 'dist', handler)))
      // TODO add required triggers?

    }


    // add triggers to functions
  }
}


    // Policies

    /**
     * bucket policies for funcs
     * 
     * - s3:PutObject
        - s3:GetObject
        - s3:ListBucket
        - s3:PutObjectAcl
        - s3:GetBucketAcl
        - s3:GetObjectAcl
        - s3:GetBucketLocation
        - s3:GetObjectRetention
        - s3:GetObjectVersionAcl
        - s3:DeleteObject
        - s3:DeleteObjectVersion
     */

    /**
     * RDS
     * 
     * - rds-data:BeginTransaction
        - rds-data:CommitTransaction
        - rds-data:ExecuteStatement
     */

    /**
     * secret manager
     * 
     *  - secretsmanager:GetSecretValue
     */

    /**
     * SQS
     * 
     * - sqs:GetQueueAttributes
        - sqs:SendMessage
        - sqs:DeleteMessage
     */

    /**
     * lambdaInvoke
     * - lambda:InvokeFunction
     */

    /**
     * Route53
     * 
     * - route53:GetHostedZone
        - route53:ChangeResourceRecordSets
        - route53:GetChange
        - route53:ListResourceRecordSets
     */

    /**
     * codebuild 
     * 
     * - codebuild:StartBuild
     */

    /**
     * cloudfront
     * 
     * - cloudfront:CreateDistribution
        - cloudfront:CreateInvalidation
        - cloudfront:DeleteDistribution
        - cloudfront:GetDistribution
        - cloudfront:UpdateDistribution
     */
