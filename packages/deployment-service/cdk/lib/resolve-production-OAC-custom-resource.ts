import { CustomResource, Duration, Stack, aws_iam, aws_lambda, aws_logs, custom_resources } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class ResolveProductionOACCustomResource extends Construct {
  constructor(scope: Stack, id: string) {
    super(scope, id)

    const resolveProductionApplyOACToAllDistrosLambda = new aws_lambda.Function(
      scope,
      'resolve-production-oac-custom-resource-lambda',
      {
        handler: 'dist/resolve-production-apply-OAC-to-all-distros.resolveProductionApplyOACToAllDistros',
        code: aws_lambda.Code.fromAsset('bundle/resolve-production-apply-OAC-to-all-distros.zip'),
        memorySize: 512,
        timeout: Duration.minutes(15),
        runtime: aws_lambda.Runtime.NODEJS_20_X,
      },
    )

    resolveProductionApplyOACToAllDistrosLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: [
          'cloudfront:ListDistributions',
          'cloudfront:GetDistribution',
          'cloudfront:ListOriginAccessControls',
          'cloudfront:UpdateDistribution',
        ],
        resources: ['*'], // all within this account?
      }),
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-OAC-resource-provider', {
      onEventHandler: resolveProductionApplyOACToAllDistrosLambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-OAC-custom-resource', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true,
      },
    })
  }
}
