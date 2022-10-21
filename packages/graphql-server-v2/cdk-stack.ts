#!/usr/bin/env node
import 'source-map-support/register'

import path from 'path'
import { execSync } from 'child_process'

import { createApi, createFunction, createBaseStack, output, addLambdaToApi } from '@reapit/ts-scripts/src/cdk'

import config from './config.json'

const namespace = 'cloud'
const appName = 'foundations'
const component = 'graphql-server-v2'

const createStack = () => {
  console.log('building...')
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  console.log('built')

  console.log('bundling...')
  execSync('yarn bundle', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  console.log('bundled')

  console.log('processing stack...')

  const stack = createBaseStack({
    namespace,
    appName,
    component,
  })

  const handler = 'packages/graphql-server-v2/src/index.handler'
  const entrypoint = path.resolve(__dirname, 'bundle.zip')

  const lambdaFunction = createFunction(stack, 'graphql', entrypoint, handler, config)
  const api = createApi(stack, 'api')
  addLambdaToApi(stack, api, lambdaFunction, { path: '/{proxy+}', method: 'ANY' }, config.COGNITO_USERPOOL_ID)
  output(stack, 'api-url', api.url)
}

createStack()
