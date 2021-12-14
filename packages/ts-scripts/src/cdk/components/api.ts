import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import * as cognito from '@aws-cdk/aws-cognito'

export const createApi = (
  scope: cdk.Stack,
  name: string,
  lambdaFunction: lambda.Function,
  cognitoUserPoolId?: string,
) => {
  let defaultMethodOptions: apigateway.MethodOptions | undefined = undefined
  if (cognitoUserPoolId) {
    const userPool = cognito.UserPool.fromUserPoolId(scope, `${scope.stackName}-${name}-usrpool`, cognitoUserPoolId)
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(scope, `${scope.stackName}-${name}-authorizer`, {
      cognitoUserPools: [userPool],
    })
    defaultMethodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer,
    }
  }

  return new apigateway.LambdaRestApi(scope, `${scope.stackName}-${name}`, {
    handler: lambdaFunction,
    defaultMethodOptions,
  })
}
