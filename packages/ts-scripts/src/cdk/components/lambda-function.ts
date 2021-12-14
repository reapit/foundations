import * as cdk from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'

export const createFunction = (
  scope: cdk.Stack,
  functionName: string,
  entry: string,
  handler: string,
  environment?: Record<string, string>,
) => {
  return new Function(scope, functionName, {
    timeout: cdk.Duration.minutes(15),
    environment,
    memorySize: 1024,
    handler,
    code: Code.fromAsset(entry),
    runtime: Runtime.NODEJS_14_X,
  })
}
