#!/usr/bin/env node
import 'source-map-support/register'
import path from 'path'
import { execSync } from 'child_process'
import { createFunction, createBaseStack } from '@reapit/ts-scripts/src/cdk'
import config from './config.json'
import { aws_apigateway } from 'aws-cdk-lib'

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

  const api = aws_apigateway.RestApi.fromRestApiAttributes(stack, 'existing-api-gateway-lookup', {
    restApiId: config.REST_API_ID,
    rootResourceId: config.ROOT_RESOURCE_ID,
  })

  const lambdaInt = new aws_apigateway.LambdaIntegration(lambdaFunction)
  const resource = api.root.resourceForPath('graphql')

  resource.addMethod('ANY', lambdaInt, {
    authorizer: {
      authorizationType: aws_apigateway.AuthorizationType.CUSTOM,
      authorizerId: '2h4msu',
    },
  })

  resource.addMethod('OPTIONS', lambdaInt)
}

createStack()
