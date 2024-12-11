import {
  aws_ec2,
  aws_iam,
  aws_lambda,
  aws_logs,
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

    const tempSecret = aws_secretsmanager.Secret.fromSecretCompleteArn(
      scope,
      'lookup-temp-secret',
      config.TEMPORARY_CLUSTER_SECRET_ARN,
    )

    // TODO snapshot database

    // TODO look at creating snapshot of temp cluster -> not sure if I can?
    // TODO use snapshot of previous cluster to create new database?

    const resolveProductionDatabaseLambda = new aws_lambda.Function(
      scope,
      'resolve-production-database-custom-resource-lambda',
      {
        handler: 'dist/resolve-production-database.resolveProductionDatabase',
        code: aws_lambda.Code.fromAsset('bundle/resolve-production-database.zip'),
        memorySize: 2048,
        timeout: Duration.minutes(10),
        runtime: aws_lambda.Runtime.NODEJS_18_X,
        environment: {
          TEMPORARY_CLUSTER_SECRET_ARN: tempSecret.secretArn,
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
        actions: ['secretsmanager:GetSecretValue', 'secretsmanager:DescribeSecret'],
        resources: [config.TEMPORARY_CLUSTER_SECRET_ARN],
      }),
    )

    const resourceProvider = new custom_resources.Provider(scope, 'resolve-production-database-resource-provider', {
      onEventHandler: resolveProductionDatabaseLambda,
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    })

    new CustomResource(scope, 'resolve-production-database-custom-resource', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        fistonly: true,
      },
    })
  }
}
