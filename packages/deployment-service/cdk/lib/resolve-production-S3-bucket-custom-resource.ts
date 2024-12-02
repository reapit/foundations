import { Construct } from 'constructs'
import { aws_lambda, aws_logs, custom_resources, CustomResource, Duration, Stack } from 'aws-cdk-lib'

export class ResolveProductionS3BucketCustomResource extends Construct {
  constructor(scope: Stack, id: string) {
    super(scope, id)

    const resolveProductionS3Lambda = new aws_lambda.Function(scope, 'resolve-production-S3-custom-resource', {
      handler: 'resolve-production-s3-buckets.resolveProductionS3Buckets',
      code: aws_lambda.Code.fromAsset(''), // figure this out
      memorySize: 1024,
      timeout: Duration.seconds(60),
      runtime: aws_lambda.Runtime.NODEJS_18_X,
    })

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
