import { Construct } from 'constructs'
import { aws_iam, aws_lambda, aws_logs, aws_s3, custom_resources, CustomResource, Duration, Stack } from 'aws-cdk-lib'

export class ResolveProductionS3BucketCustomResource extends Construct {
  constructor(
    scope: Stack,
    id: string,
    { buckets, iaasAccountId }: { buckets: Record<string, aws_s3.IBucket>; iaasAccountId: string },
  ) {
    super(scope, id)

    const resolveProductionS3Lambda = new aws_lambda.Function(scope, 'resolve-production-S3-custom-resource', {
      handler: 'resolve-production-s3-buckets.resolveProductionS3Buckets',
      code: aws_lambda.Code.fromAsset(''), // figure this out
      memorySize: 1024,
      timeout: Duration.seconds(60),
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      environment: {
        PAAS_ACCOUNT_ID: scope.account,
        IAAS_ACCOUNT_ID: iaasAccountId,
      },
    })

    resolveProductionS3Lambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
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
          'S3:PutBucketPolicy',
          'S3:GetBucketPolicy',
        ],
      }),
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-S3', {
      onEventHandler: resolveProductionS3Lambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-s3', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true, // TODO needs to only run once
      },
    })
  }
}
