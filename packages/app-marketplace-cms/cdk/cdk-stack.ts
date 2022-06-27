import * as path from 'path'
import { addLambdaToApi, createApi, createBaseStack, createTable, createFunction } from '@reapit/ts-scripts/src/cdk'
import config from '../config.json'

export const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'app-marketplace-cms',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const api = createApi(
    stack,
    'apigateway',
    undefined,
    true,
    ['*'],
    ['Content-Type', 'Authorization', 'api-version', 'reapit-connect-token', 'reapit-customer', 'app-id'],
  )

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
  )
  dynamodb.grantReadWriteData(httpLambda)

  addLambdaToApi(
    stack,
    api,
    httpLambda,
    {
      path: '/{proxy+}',
      method: 'ANY',
    },
    // @ts-ignore
    config.AUTHORIZER_ID as string,
  )
}
