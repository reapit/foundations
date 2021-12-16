import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { AuthorizationType, LambdaIntegration, LambdaRestApi, RestApi } from '@aws-cdk/aws-apigateway'

import { getAuthorizer } from './cognito-authorizer'

export const createApi = (
  scope: cdk.Stack,
  name: string,
  lambdaFunction?: lambda.Function,
  cognitoUserPoolId?: string,
  allowCors?: boolean
): RestApi | LambdaRestApi => {
  let defaultMethodOptions: apigateway.MethodOptions | undefined = undefined
  if (cognitoUserPoolId) {
    const authorizer = getAuthorizer(scope, cognitoUserPoolId)
    defaultMethodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer,
    }
  }

  const defaultCorsPreflightOptions = allowCors ? {
    allowOrigins: ['*'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
  } : undefined

  if (!lambdaFunction) {
    return new apigateway.RestApi(scope, `${scope.stackName}-${name}`, {
      defaultMethodOptions,
      defaultCorsPreflightOptions,
    })
  }

  return new apigateway.LambdaRestApi(scope, `${scope.stackName}-${name}`, {
    handler: lambdaFunction,
    defaultMethodOptions,
    defaultCorsPreflightOptions,
  })
}

export const addLambdaToApi = (
  scope: cdk.Stack,
  api: apigateway.RestApi,
  lambdaFunction: lambda.Function,
  path: string,
  method: string,
  cognitoUserPoolId?: string
) => {
  api.root.resourceForPath(path).addMethod(method, new LambdaIntegration(lambdaFunction), {
    authorizer: cognitoUserPoolId ? getAuthorizer(scope, cognitoUserPoolId) : undefined,
    authorizationType: cognitoUserPoolId ? AuthorizationType.COGNITO : undefined,
  })
}
