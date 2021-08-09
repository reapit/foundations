import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import path from 'path'
import { createApi } from './components/api'
import { createFunction } from './components/function'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name: `${stack.stackName}-${name}`,
  })
}

const repoRoot = path.join('..', '..')

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN is required')
  }

  const PACKAGE = 'app-builder-backend'
  const HANDLER = 'lambda.handler'

  const code = lambda.DockerImageCode.fromImageAsset(repoRoot, {
    buildArgs: {
      PACKAGE,
      NPM_TOKEN: process.env.NPM_TOKEN,
    },
    cmd: [`packages/${PACKAGE}/dist/${HANDLER}`],
  })
  const lambdaFunction = createFunction(stack, 'graphql', code)
  const api = createApi(stack, 'api', lambdaFunction)

  output(stack, 'api-url', api.url)
}
