import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import { createApi } from './components/api'
import { createFunction } from './components/function'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name,
  })
}

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  const code = lambda.Code.fromCfnParameters()
  const lambdaFunction = createFunction(stack, 'function', code, 'index.graphqlHandler')
  const api = createApi(stack, 'api', lambdaFunction)

  output(stack, 'api-url', api.url)
}
