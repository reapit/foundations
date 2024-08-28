import cdk from 'aws-cdk-lib'
import { aws_lambda as lambda, aws_apigateway as apigateway } from 'aws-cdk-lib'

import { getAuthorizer } from './cognito-authorizer'

const resolveAuthorizer = (
  scope: cdk.Stack,
  {
    cognitoUserPoolId,
    authorizer,
  }: {
    cognitoUserPoolId?: string
    authorizer?: apigateway.RequestAuthorizer
  },
) => {
  if (cognitoUserPoolId) {
    return {
      authorizer: getAuthorizer(scope, cognitoUserPoolId),
      authorizationType: apigateway.AuthorizationType.COGNITO,
    }
  } else if (authorizer) {
    return {
      authorizer,
      authorizationType: apigateway.AuthorizationType.CUSTOM,
    }
  }

  return {}
}

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
      endpointTypes: [apigateway.EndpointType.REGIONAL],
    })
  }

  return new apigateway.LambdaRestApi(scope, `${scope.stackName}-${name}`, {
    handler: lambdaFunction,
    defaultCorsPreflightOptions,
    endpointTypes: [apigateway.EndpointType.REGIONAL],
  })
}

export type LambdaRoute = {
  path: string
  method: string
}

export const addLambdaToApi = (
  scope: cdk.Stack,
  api: apigateway.RestApi,
  lambdaFunction: lambda.Function,
  routes: LambdaRoute | LambdaRoute[],
  cognitoUserPoolId?: string,
  authorizer?: apigateway.RequestAuthorizer,
) => {
  const routesToAdd = Array.isArray(routes) ? routes : [routes]

  const authorizerConfig = resolveAuthorizer(scope, {
    authorizer,
    cognitoUserPoolId,
  })

  routesToAdd.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambdaFunction), {
      ...authorizerConfig,
    })
  })
}
