import * as cdk from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'

export const createFunction = (
  scope: cdk.Stack,
  functionName: string,
  entry: string,
  handler?: string,
  environment?: Record<string, string>,
) => {
  return new NodejsFunction(scope, functionName, {
    entry,
    timeout: cdk.Duration.minutes(15),
    environment,
    memorySize: 1024,
    handler,
    bundling: {
      preCompilation: true,
    },
  })
}
