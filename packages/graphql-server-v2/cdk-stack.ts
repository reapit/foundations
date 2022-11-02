#!/usr/bin/env node
import 'source-map-support/register'
import path from 'path'
import { execSync } from 'child_process'
import { createApi, createFunction, createBaseStack, output } from '@reapit/ts-scripts/src/cdk'
import config from './config.json'
import { aws_apigateway, aws_lambda } from 'aws-cdk-lib'

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

  const lambdaInt = new aws_apigateway.LambdaIntegration(lambdaFunction)
  const resource = api.root.resourceForPath('')
  const authorizerLambda = aws_lambda.Function.fromFunctionArn(stack, 'reapit-cloud-platform-lookup', 'arn:aws:lambda:eu-west-2:028446965111:function:reapit-lambdas-gateway-authorizer')

  const authorizer = new aws_apigateway.RequestAuthorizer(stack, 'reapit-cloud-platform-authorizer', {
    identitySources: [
      aws_apigateway.IdentitySource.header('Authorization'),
    ],
    handler: authorizerLambda,
  })

  resource.addProxy({
    defaultIntegration: lambdaInt,
    defaultMethodOptions: {
      authorizer,
    },
  })

  // addLambdaToApi(stack, api, lambdaFunction, { path: '/{proxy+}', method: 'ANY' }, config.COGNITO_USERPOOL_ID)
  output(stack, 'api-url', api.url)
}

createStack()
