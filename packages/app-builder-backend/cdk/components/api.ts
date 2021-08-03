import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'

export const createApi = (scope: cdk.Construct, name: string, lambdaFunction: lambda.Function) => {
  return new apigateway.LambdaRestApi(scope, name, {
    handler: lambdaFunction,
  })
}