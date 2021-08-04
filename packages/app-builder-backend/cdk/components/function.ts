import * as cdk from '@aws-cdk/core'
import { Tracing, DockerImageCode, DockerImageFunction } from '@aws-cdk/aws-lambda'

export const createFunction = (scope: cdk.Stack, functionName: string, code: DockerImageCode) => {
  return new DockerImageFunction(scope, functionName, {
    code,
    tracing: Tracing.ACTIVE,
    timeout: cdk.Duration.minutes(15),
  })
}
