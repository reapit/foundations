import { CustomResource, Duration, Stack, aws_cloudfront, aws_lambda, aws_logs, custom_resources } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class ResolveProductionOACCustomResource extends Construct {
  constructor(scope: Stack, id: string) {
    super(scope, id)
    // TODO needs to be applied to IaaS stack

    const resolveProductionApplyOACToAllDistrosLambda = new aws_lambda.Function(
      scope,
      'resolve-production-oac-custom-resource',
      {
        handler: 'resolve-production-apply-OAC-to-all-distros.resolveProductionApplyOACToAllDistros',
        code: aws_lambda.Code.fromAsset(''), // figure this out
        memorySize: 512,
        timeout: Duration.minutes(5),
        runtime: aws_lambda.Runtime.NODEJS_18_X,
      },
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-OAC', {
      onEventHandler: resolveProductionApplyOACToAllDistrosLambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-OAC', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true, // TODO needs to only run once
      },
    })
  }
}
