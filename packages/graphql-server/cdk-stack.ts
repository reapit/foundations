#!/usr/bin/env node
import 'source-map-support/register'

import path from 'path'
import { execSync } from 'child_process'

import { createApi, createFunction, createBaseStack, output, addLambdaToApi } from '@reapit/ts-scripts/src/cdk'
import { Duration, aws_lambda, aws_apigateway } from 'aws-cdk-lib'

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

  const { ISSUERS, ...env } = config

  const lambdaFunction = createFunction(stack, 'graphql', entrypoint, handler, env)
  const api = createApi(stack, 'api')

  // const authorizerLambda = createFunction(
  //   stack,
  //   'graphql-server-authorizer-lambda',
  //   path.resolve(__dirname, 'dist', 'authorizer'),
  //   'authorizer/index.handler',
  //   {
  //     ISSUERS: ISSUERS,
  //     CLIENT_ID: config.COGNITO_CLIENT_ID,
  //     CONNECT_USER_POOL: config.COGNITO_USERPOOL_ID,
  //   },
  //   undefined,
  //   undefined,
  //   undefined,
  //   aws_lambda.Runtime.NODEJS_18_X,
  // )

  // const authorizer = new aws_apigateway.RequestAuthorizer(stack, 'graphql-server-authorizer', {
  //   handler: authorizerLambda,
  //   identitySources: [aws_apigateway.IdentitySource.header('authorization')],
  //   resultsCacheTtl: Duration.seconds(0),
  // })

  addLambdaToApi(stack, api, lambdaFunction, { path: '/{proxy+}', method: 'ANY' }, config.COGNITO_USERPOOL_ID)
  output(stack, 'api-url', api.url)
}

createStack()
