#!/usr/bin/env node
import 'source-map-support/register'

import path from 'path'
import { execSync } from 'child_process'

import { createApi, createFunction, createBaseStack, output, addLambdaToApi } from '@reapit/ts-scripts/src/cdk'

import config from './config.json'

const namespace = 'cloud'
const appName = 'foundations'
const component = 'graphql-server'

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

  const handler = 'packages/graphql-server/src/index.graphqlHandler'
  const entrypoint = path.resolve(__dirname, 'bundle.zip')

  const { ISSUERS, ...rest } = config

  const lambdaFunction = createFunction(stack, 'graphql', entrypoint, handler, rest)
  const api = createApi({scope: stack, name: 'api', })
  addLambdaToApi({
    scope: stack,
    api,
    lambdaFunction,
    routes: { path: '/{proxy+}', method: 'ANY' },
    authorizer: {
      ISSUERS,
      COGNITO_CLIENT_ID: config.COGNITO_CLIENT_ID,
      COGNITO_USER_POOL: config.COGNITO_CLIENT_ID,
    },
  })
  output(stack, 'api-url', api.url)
}

createStack()
