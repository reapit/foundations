import {
  aws_ec2,
  aws_iam,
  aws_lambda,
  aws_logs,
  aws_rds,
  aws_secretsmanager,
  custom_resources,
  CustomResource,
  Duration,
  Stack,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import config from '../../config.json'

export class ResolveProductionDatabaseCustomResource extends Construct {
  constructor(
    scope: Stack,
    id: string,
    { secretManager, vpc }: { secretManager: aws_secretsmanager.ISecret; vpc: aws_ec2.Vpc },
  ) {
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
        environment: {
          TEMPORARY_CLUSTER_SECRET_ARN: config.TEMPORARY_CLUSTER_SECRET_ARN,
          STACK_CLUSTER_SECRET_ARN: secretManager.secretArn,
        },
        vpc,
      },
    )
    resolveProductionDatabaseLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        resources: [secretManager.secretArn],
        actions: ['secretsmanager:GetSecretValue', 'secretsmanager:DescribeSecret'],
      }),
    )

    // tempt secret
    resolveProductionDatabaseLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: [],
        resources: [],
      }),
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
