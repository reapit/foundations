import { Construct } from 'constructs'
import { aws_iam, aws_lambda, aws_logs, aws_s3, custom_resources, CustomResource, Duration, Stack } from 'aws-cdk-lib'
import { BucketNames } from './create-S3-bucket'

export class ResolveProductionS3BucketPoliciesCustomResource extends Construct {
  constructor(
    scope: Stack,
    id: string,
    { buckets, iaasAccountId }: { buckets: Record<string, aws_s3.IBucket>; iaasAccountId: string },
  ) {
    super(scope, id)

    const envStage = process.env.APP_STAGE === 'production' ? 'prod' : 'dev'

    const liveBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-live-bucket', `${BucketNames.LIVE}-${envStage}`)
    const logBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-log-bucket', `${BucketNames.LOG}-${envStage}`)
    const repoBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-repo-bucket', `${BucketNames.REPO_CACHE}-${envStage}`)
    const versionBucket = aws_s3.Bucket.fromBucketName(
      this,
      'lookup-version-bucket',
      `${BucketNames.VERSION}-${envStage}`,
    )

    const resolveProductionS3Lambda = new aws_lambda.Function(scope, 'resolve-production-S3-policies-custom-resource', {
      handler: 'dist/resolve-production-s3-bucket-policies.resolveProductionS3BucketPolicies',
      code: aws_lambda.Code.fromAsset('bundle/resolve-production-s3-bucket-policies.zip'),
      memorySize: 1024,
      timeout: Duration.seconds(60),
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      environment: {
        PAAS_ACCOUNT_ID: scope.account,
        IAAS_ACCOUNT_ID: iaasAccountId,
        BUCKETS: [liveBucket.bucketName, logBucket.bucketName, repoBucket.bucketName, versionBucket.bucketName].join(
          ',',
        ),
      },
    })

    resolveProductionS3Lambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        resources: Object.values(buckets).map((bucket) => bucket.bucketArn),
        actions: [
          's3:ListBucket',
          's3:PutObjectAcl',
          's3:GetBucketAcl',
          's3:GetObjectAcl',
          's3:GetBucketLocation',
          's3:GetObjectRetention',
          's3:GetObjectVersionAcl',
          'S3:PutBucketPolicy',
          'S3:GetBucketPolicy',
          's3:DeleteBucketPolicy',
          's3:PutBucketPolicy',
          's3:PutBucketOwnershipControls',
          's3:PutBucketACL',
          's3:PutBucketPublicAccessBlock',
        ],
      }),
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-S3-policies', {
      onEventHandler: resolveProductionS3Lambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-s3-policies', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true,
      },
    })
  }
}
