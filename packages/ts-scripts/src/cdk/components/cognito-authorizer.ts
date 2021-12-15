import { CognitoUserPoolsAuthorizer } from '@aws-cdk/aws-apigateway'
import { UserPool } from '@aws-cdk/aws-cognito'
import * as cdk from '@aws-cdk/core'

let authorizers = new Map<string, CognitoUserPoolsAuthorizer>()

export const getAuthorizer = (scope: cdk.Stack, userpoolId: string): CognitoUserPoolsAuthorizer => {
  if (!authorizers.has(userpoolId)) {
    authorizers[userpoolId] = new CognitoUserPoolsAuthorizer(scope, 'authorizer', {
      cognitoUserPools: [UserPool.fromUserPoolId(scope, 'user-pool-authorizer', userpoolId)],
    })
  }
  return authorizers[userpoolId]
}