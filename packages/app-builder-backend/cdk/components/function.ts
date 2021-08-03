import * as cdk from '@aws-cdk/core'
import {
  Runtime,
  Tracing,
  Function,
  DockerImageCode,
  DockerImageFunction,
  CfnParametersCode,
} from '@aws-cdk/aws-lambda'

type Code = CfnParametersCode | DockerImageCode

const isDockerCode = (code: Code): code is DockerImageCode => {
  if (typeof (code as CfnParametersCode).isInline !== undefined) {
    return false
  }
  return true
}

export const createFunction = (scope: cdk.Stack, functionName: string, code: Code, handler?: string) => {
  const functionConfiguration = {
    handler,
    runtime: Runtime.NODEJS_14_X,
    tracing: Tracing.ACTIVE,
    timeout: cdk.Duration.minutes(15),
  }

  if (isDockerCode(code)) {
    return new DockerImageFunction(scope, functionName, {
      code,
      ...functionConfiguration,
    })
  }

  return new Function(scope, `${scope.stackName}-${functionName}`, {
    code,
    ...functionConfiguration,
  })
}
