import * as cdk from '@aws-cdk/core'
import { AssetCode, Function, Runtime } from '@aws-cdk/aws-lambda'

export const createFunction = (
  scope: cdk.Stack,
  functionName: string,
  code: AssetCode,
  handler?: string,
  environment?: Record<string, string>,
) => {
  return new Function(scope, functionName, {
    code,
    timeout: cdk.Duration.minutes(15),
    environment,
    memorySize: 1024,
    handler,
    runtime: Runtime.NODEJS_14_X,
  })
}
