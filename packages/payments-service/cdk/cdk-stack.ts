import * as path from 'path'
import { createApi, createBaseStack, createTable, createFunction, output } from '@reapit/ts-scripts/src/cdk'
import { aws_apigateway as apigateway, aws_iam as iam } from 'aws-cdk-lib'
import config from '../config.json'

export const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'payments',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const allowedOrigins = [
    'https://payments.dev.paas.reapit.cloud',
    'https://payments.prod.paas.reapit.cloud',
    'https://payments-portal.dev.paas.reapit.cloud',
    'https://payments-portal.prod.paas.reapit.cloud',
  ]

  if (config.APP_ENV !== 'production') {
    allowedOrigins.push('http://localhost:8080')
  }

  const api = createApi(stack, 'api', undefined, true, allowedOrigins, [
    'Content-Type',
    'Authorization',
    'X-Api-Key',
    'api-version',
    'if-match',
    'reapit-customer',
    'reapit-session',
  ])

  const paymentsSessionTable = createTable(stack, config.DYNAMO_DB_PAYMENTS_SESSION_TABLE_NAME, 'id')

  const env = {
    ...config,
    DYNAMO_DB_PAYMENTS_SESSION_TABLE_NAME: paymentsSessionTable.tableName,
  }

  const lambda = createFunction(
    stack,
    'payments-service-private',
    path.resolve('bundle.zip'),
    'packages/payments-service/src/core/server.handler',
    env,
  )

  paymentsSessionTable.grantReadWriteData(lambda)

  lambda.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ses:SendEmail'],
      resources: [`arn:aws:ses:${config.DYNAMO_DB_REGION}:${config.AWS_ACCOUNT_ID}:*`],
    }),
  )

  const routes = [
    {
      path: '/session',
      method: 'POST',
      protected: true,
    },
    {
      path: '/session',
      method: 'OPTIONS',
    },
    {
      path: '/request/{paymentId}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/request/{paymentId}',
      method: 'OPTIONS',
    },
    {
      path: '/receipt/private/{paymentId}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/receipt/private/{paymentId}',
      method: 'OPTIONS',
    },
    {
      path: '/receipt/public/{paymentId}',
      method: 'POST',
    },
    {
      path: '/receipt/public/{paymentId}',
      method: 'OPTIONS',
    },
    {
      path: '/payments/{paymentId}',
      method: 'GET',
    },
    {
      path: '/payments/{paymentId}',
      method: 'PATCH',
    },
    {
      path: '/payments/{paymentId}',
      method: 'OPTIONS',
    },
  ]

  routes.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambda), {
      authorizer: route.protected
        ? {
            authorizerId: config.AUTHORIZER_ID,
            authorizationType: apigateway.AuthorizationType.CUSTOM,
          }
        : undefined,
    })
  })

  output(stack, 'api-url', api.url)
}
