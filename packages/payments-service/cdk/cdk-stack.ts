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
    appName: 'payments',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const api = createApi(
    stack,
    'api',
    undefined,
    true,
    ['*'],
    ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version', 'if-match', 'reapit-customer', 'reapit-session'],
  )

  const paymentsSessionTable = createTable(stack, config.DYNAMO_DB_PAYMENTS_SESSION_TABLE_NAME, 'id')

  const env = {
    ...config,
    DYNAMO_DB_PAYMENTS_SESSION_TABLE_NAME: paymentsSessionTable.tableName,
  }

  const httpLambda = createFunction(
    stack,
    'payments-service-private',
    path.resolve('bundle.zip'),
    'packages/payments-service/src/http.handler',
    env,
  )

  paymentsSessionTable.grantReadWriteData(httpLambda)

  addLambdaToApi(
    stack,
    api,
    httpLambda,
    [
      {
        path: '/session',
        method: 'POST',
      },
      {
        path: '/request/{paymentId}',
        method: 'POST',
      },
      {
        path: '/receipt/private/{paymentId}',
        method: 'POST',
      },
      {
        path: '/receipt/public/{paymentId}',
        method: 'POST',
        skipAuthorizer: true,
      },
      {
        path: '/payments/{paymentId}',
        method: 'GET',
        skipAuthorizer: true,
      },
      {
        path: '/payments/{paymentId}',
        method: 'PATCH',
        skipAuthorizer: true,
      },
    ],
    config.CONNECT_USER_POOL,
  )

  output(stack, 'api-url', api.url)
}
