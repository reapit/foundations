import { Stack, Lazy, aws_lambda as lambda, aws_apigateway as apigateway } from 'aws-cdk-lib'

import { getAuthorizer, AuthorizerEnv } from './auth0-authorizer'

type CreateApiProps = {
  scope: Stack
  name: string
  lambdaFunction?: lambda.Function
  allowCors?: boolean
  allowOrigins?: string[]
  allowHeaders?: string[]
}

/**
 * Create API gateway
 *
 * @returns RestApi or LambdaApi
 */
export const createApi = ({
  scope,
  name,
  lambdaFunction,
  allowCors = true,
  allowOrigins = ['*'],
  allowHeaders = [
    'Content-Type',
    'Authorization',
    'X-Api-Key',
    'api-version',
    'reapit-connect-token',
    'reapit-customer',
  ],
}: CreateApiProps): apigateway.RestApi | apigateway.LambdaRestApi => {
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

export type AddLambdaToApiProps = {
  scope: Stack
  api: apigateway.RestApi
  lambdaFunction: lambda.Function
  routes: LambdaRoute | LambdaRoute[]
  /**
   * Add a authorizer to the route.
   *
   * You can provide a route to your custom lambda or use the default which has no scope checking
   */
  authorizer?: false | AuthorizerEnv
}

/**
 * Add a Lambda route method to an API gateway
 *
 */
export const addLambdaToApi = ({
  scope,
  api,
  lambdaFunction,
  routes,
  authorizer: authorizerOption = false,
}: AddLambdaToApiProps) => {
  const routesToAdd = Array.isArray(routes) ? routes : [routes]

  const authorizer = authorizerOption ? getAuthorizer({ scope, name: 'test', env: authorizerOption }) : undefined

  routesToAdd.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambdaFunction), {
      authorizer: authorizer,
      authorizationType: authorizer ? apigateway.AuthorizationType.CUSTOM : undefined,
    })
  })
}
