import { aws_lambda, aws_logs, custom_resources, CustomResource, Duration, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class ResolveProductionDatabaseCustomResource extends Construct {
  constructor(scope: Stack, id: string) {
    super(scope, id)

    const resolveProductionDatabaseLambda = new aws_lambda.Function(
      scope,
      'resolve-production-database-custom-resource',
      {
        handler: 'resolve-production-database.resolveProductionDatabase',
        code: aws_lambda.Code.fromAsset(''), // figure this out
        memorySize: 1024,
        timeout: Duration.minutes(5),
        runtime: aws_lambda.Runtime.NODEJS_18_X,
      },
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-database', {
      onEventHandler: resolveProductionDatabaseLambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-database', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true, // TODO needs to only run once
      },
    })
  }
}
