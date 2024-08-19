import * as path from 'path'
import {
  addLambdaToApi,
  createApi,
  createBaseStack,
  createTable,
  createFunction,
  output,
} from '@reapit/ts-scripts/src/cdk'
import config from '../config.json'

export const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'api-key',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const api = createApi({ scope: stack, name: 'apigateway', })

  const dynamodb = createTable(stack, config.DYNAMO_DB_API_KEY_TABLE_NAME, 'id', [
    {
      indexName: 'developerIdOwnership',
      partitionKeyName: 'developerId',
    },
    {
      indexName: 'apiKey',
      partitionKeyName: 'apiKey',
    },
    {
      indexName: 'email',
      partitionKeyName: 'email',
    },
  ])
  const env = {
    ...config,
    DYNAMO_DB_API_KEY_TABLE_NAME: dynamodb.tableName,
  }

  const httpLambda = createFunction(
    stack,
    'api-key-http',
    path.resolve('bundle.zip'),
    'packages/api-key-service/dist/http.handler',
    env,
  )
  const invokeLambda = createFunction(
    stack,
    'api-key-invoke',
    path.resolve('bundle.zip'),
    'packages/api-key-service/dist/invoke.invokeAPiKeyVerify',
    env,
  )
  dynamodb.grantReadWriteData(httpLambda)
  dynamodb.grantReadWriteData(invokeLambda)

  addLambdaToApi({
    scope: stack,
    api,
    lambdaFunction: httpLambda,
    routes: {
      path: '{proxy+}',
      method: 'ANY',
    },
    authorizer: true,
  })
  output(stack, 'invoke-arn', invokeLambda.functionArn)
}
