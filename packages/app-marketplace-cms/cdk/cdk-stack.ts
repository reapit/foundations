import * as path from 'path'
import { addLambdaToApi, createApi, createBaseStack, createTable, createFunction } from '@reapit/ts-scripts/src/cdk'
import config from '../config.json'
import { aws_lambda } from 'aws-cdk-lib'

export const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'app-marketplace-cms',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const api = createApi({
    scope: stack,
    name: 'apigateway',
    allowCors: true,
    allowOrigins: ['*'],
    allowHeaders: ['Content-Type', 'Authorization', 'api-version', 'reapit-connect-token', 'reapit-customer', 'app-id'],
  })

  const dynamodb = createTable(stack, config.DYNAMO_MARKETPLACE_CMS_TABLE_NAME, 'id')
  const env = {
    ...config,
    DYNAMO_MARKETPLACE_CMS_TABLE_NAME: dynamodb.tableName,
  }

  const httpLambda = createFunction(
    stack,
    'marketplace-app-cms-http',
    path.resolve('bundle.zip'),
    'packages/app-marketplace-cms/src/http.handler',
    env,
    undefined,
    undefined,
    undefined,
    aws_lambda.Runtime.NODEJS_18_X,
  )
  dynamodb.grantReadWriteData(httpLambda)

  addLambdaToApi({
    scope: stack,
    api,
    lambdaFunction: httpLambda,
    routes: {
      path: '/cms/{proxy+}',
      method: 'ANY',
    },
    authorizer: true,
  })
  addLambdaToApi({
    scope: stack,
    api,
    lambdaFunction: httpLambda,
    routes: {
      path: '/',
      method: 'ANY',
    },
  })
}
