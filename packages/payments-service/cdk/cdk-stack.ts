import * as path from 'path'
import { createApi, createBaseStack, createTable, createFunction, output } from '@reapit/ts-scripts/src/cdk'
import { aws_apigateway as apigateway, aws_iam as iam, aws_lambda } from 'aws-cdk-lib'
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
  const paymentsConfigTable = createTable(stack, config.DYNAMO_DB_PAYMENTS_CONFIG_TABLE_NAME, 'clientCode')

  const env = {
    ...config,
    DYNAMO_DB_PAYMENTS_SESSION_TABLE_NAME: paymentsSessionTable.tableName,
    DYNAMO_DB_PAYMENTS_CONFIG_TABLE_NAME: paymentsConfigTable.tableName,
  }

  const lambda = createFunction(
    stack,
    'payments-service-private',
    path.resolve(__dirname, '..', 'dist'),
    'packages/payments-service/src/core/server.handler',
    env,
  )

  paymentsSessionTable.grantReadWriteData(lambda)
  paymentsConfigTable.grantReadWriteData(lambda)

  lambda.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ses:SendEmail'],
      resources: [`arn:aws:ses:${config.DYNAMO_DB_REGION}:${config.AWS_ACCOUNT_ID}:*`],
    }),
  )

  const lambdaAuthorizerFunc = aws_lambda.Function.fromFunctionName(
    stack,
    'cloud-payments-custom-authorizer-func',
    'reapit-lambdas-gateway-authorizer',
  )

  const lambdaAuthorizer = new apigateway.TokenAuthorizer(stack, 'cloud-payments-custom-authorizer', {
    handler: lambdaAuthorizerFunc,
  })

  const routes = [
    {
      path: '/session',
      method: 'POST',
      protected: true,
    },
    {
      path: '/request/{paymentId}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/receipt/private/{paymentId}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/receipt/public/{paymentId}',
      method: 'POST',
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
      path: '/config/public/{clientCode}',
      method: 'GET',
    },
    {
      path: '/config/{clientCode}',
      method: 'GET',
      protected: true,
    },
    {
      path: '/config/{clientCode}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/config/{clientCode}',
      method: 'PUT',
      protected: true,
    },
    {
      path: '/config/{clientCode}',
      method: 'DELETE',
      protected: true,
    },
  ]

  routes.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambda), {
      authorizer: route.protected ? lambdaAuthorizer : undefined,
    })
  })

  output(stack, 'api-url', api.url)
}
