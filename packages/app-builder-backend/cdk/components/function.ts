import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'

export const createFunction = (
  scope: cdk.Construct,
  functionName: string,
  code: lambda.CfnParametersCode,
  handler: string,
) => {
  const lambdaFunction = new lambda.Function(scope, functionName, {
    code,
    handler,
    runtime: lambda.Runtime.NODEJS_14_X,
    tracing: lambda.Tracing.ACTIVE,
    timeout: cdk.Duration.minutes(15),
  })

  return lambdaFunction
}
