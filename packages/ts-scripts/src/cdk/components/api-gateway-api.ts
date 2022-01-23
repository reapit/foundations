import cdk from 'aws-cdk-lib'
import { aws_lambda as lambda, aws_apigateway as apigateway } from 'aws-cdk-lib'

import { getAuthorizer } from './cognito-authorizer'

export const createApi = (
  scope: cdk.Stack,
  name: string,
  lambdaFunction?: lambda.Function,
  allowCors: boolean = true,
  allowOrigins: string[] = ['*'],
  allowHeaders: string[] = [
    'Content-Type',
    'Authorization',
    'X-Api-Key',
    'api-version',
    'reapit-connect-token',
    'reapit-customer',
  ],
): apigateway.RestApi | apigateway.LambdaRestApi => {
  const defaultCorsPreflightOptions = allowCors
    ? {
        allowOrigins,
        allowHeaders,
      }
    : undefined

  if (!lambdaFunction) {
    return new apigateway.RestApi(scope, `${scope.stackName}-${name}`, {
      defaultCorsPreflightOptions,
    })
  }

  return new apigateway.LambdaRestApi(scope, `${scope.stackName}-${name}`, {
    handler: lambdaFunction,
    defaultCorsPreflightOptions,
  })
}

export const addLambdaToApi = (
  scope: cdk.Stack,
  api: apigateway.RestApi,
  lambdaFunction: lambda.Function,
  path: string,
  method: string,
  cognitoUserPoolId?: string,
) => {
  api.root.resourceForPath(path).addMethod(method, new apigateway.LambdaIntegration(lambdaFunction), {
    authorizer: cognitoUserPoolId ? getAuthorizer(scope, cognitoUserPoolId) : undefined,
    authorizationType: cognitoUserPoolId ? apigateway.AuthorizationType.COGNITO : undefined,
  })
}
