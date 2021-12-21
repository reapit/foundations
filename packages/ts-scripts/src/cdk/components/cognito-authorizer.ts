import * as cdk from 'aws-cdk-lib'
import { aws_apigateway as apigateway, aws_cognito as cognito } from 'aws-cdk-lib'

const authorizers = new Map<string, apigateway.CognitoUserPoolsAuthorizer>()

export const getAuthorizer = (scope: cdk.Stack, userpoolId: string): apigateway.CognitoUserPoolsAuthorizer => {
  if (!authorizers.has(userpoolId)) {
    authorizers.set(
      userpoolId,
      new apigateway.CognitoUserPoolsAuthorizer(scope, 'authorizer', {
        cognitoUserPools: [cognito.UserPool.fromUserPoolId(scope, 'user-pool-authorizer', userpoolId)],
      }),
    )
  }
  const authorizer = authorizers.get(userpoolId)
  if (!authorizer) {
    throw new Error('Authorizer not found')
  }
  return authorizer
}
