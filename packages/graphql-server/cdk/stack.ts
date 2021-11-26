import * as cdk from '@aws-cdk/core'
import { createApi } from './components/api'
import { createFunction } from './components/function'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name: `${stack.stackName}-${name}`,
  })
}

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN is required')
  }

  const entrypoint = './src/index.ts'
  const handler = 'graphqlHandler'

  const lambdaFunction = createFunction(stack, 'graphql', entrypoint, handler)
  const api = createApi(stack, 'api', lambdaFunction)
  output(stack, 'api-url', api.url)
}
