import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'

export const createApi = (
  scope: cdk.Stack,
  name: string,
  lambdaFunction: lambda.Function,
  defaultMethodOptions?: apigateway.MethodOptions,
) => {
  return new apigateway.LambdaRestApi(scope, `${scope.stackName}-${name}`, {
    handler: lambdaFunction,
    defaultMethodOptions,
  })
}
