import * as path from 'path'
import { addLambdaToApi, createApi, createBaseStack, createTable, createFunction } from '@reapit/ts-scripts/src/cdk'
import config from '../config.json'
import { aws_lambda, aws_apigateway, Duration } from 'aws-cdk-lib'

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
    path.resolve(__dirname, '..', 'dist', 'app'),
    'http.handler',
    env,
    undefined,
    undefined,
    undefined,
    aws_lambda.Runtime.NODEJS_20_X,
  )
  dynamodb.grantReadWriteData(httpLambda)

  const authorizerLambda = createFunction(
    stack,
    'app-marketplace-authorizer-lambda',
    path.resolve(__dirname, '..', 'dist', 'authorizer'),
    'authorizer/index.handler',
    {
      ISSUERS: config.ISSUERS,
      CONNECT_USER_POOL: config.CONNECT_USER_POOL,
    },
    undefined,
    undefined,
    512,
    aws_lambda.Runtime.NODEJS_20_X,
  )

  const authorizer = new aws_apigateway.RequestAuthorizer(stack, 'app-marketplace-authorizer', {
    handler: authorizerLambda,
    identitySources: [aws_apigateway.IdentitySource.header('authorization')],
    resultsCacheTtl: Duration.seconds(0),
  })

  addLambdaToApi(
    stack,
    api,
    httpLambda,
    {
      path: '/cms/{proxy+}',
      method: 'ANY',
    },
    undefined,
    authorizer,
  )
  addLambdaToApi(stack, api, httpLambda, {
    path: '/',
    method: 'ANY',
  })
}
