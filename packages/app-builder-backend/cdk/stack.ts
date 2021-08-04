import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import path from 'path'
import { createApi } from './components/api'
import { createFunction } from './components/function'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name,
  })
}

const repoRoot = path.join('..', '..')

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  const code = lambda.DockerImageCode.fromImageAsset(repoRoot, {
    buildArgs: {
      PACKAGE: 'app-builder-backend',
      HANDLER: 'index.graphqlHandler',
    },
  })
  const lambdaFunction = createFunction(stack, 'graphql', code)
  const api = createApi(stack, 'api', lambdaFunction)

  output(stack, 'api-url', api.url)
}
