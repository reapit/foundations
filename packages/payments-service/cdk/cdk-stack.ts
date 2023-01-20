import * as path from 'path'
import {
  createApi,
  createBaseStack,
  createTable,
  createFunction,
  output,
  getAuthorizer,
} from '@reapit/ts-scripts/src/cdk'
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
      path: '/config/public/{paymentId}',
      method: 'GET',
    },
    {
      path: '/config/private/{clientCode}',
      method: 'GET',
      protected: true,
    },
    {
      path: '/config/private/{clientCode}',
      method: 'POST',
      protected: true,
    },
    {
      path: '/config/private/{clientCode}',
      method: 'PUT',
      protected: true,
    },
    {
      path: '/config/private/{clientCode}',
      method: 'DELETE',
      protected: true,
    },
  ]

  routes.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambda), {
      authorizer: route.protected ? getAuthorizer(stack, config.CONNECT_USER_POOL) : undefined,
      authorizationType: route.protected ? apigateway.AuthorizationType.COGNITO : undefined,
      requestParameters: {
        'method.request.header.Content-Type': false,
        'method.request.header.Authorization': route.protected ? true : false,
        'method.request.header.X-Api-Key': false,
        'method.request.header.api-version': false,
        'method.request.header.if-match': false,
        'method.request.header.reapit-customer': false,
        'method.request.header.reapit-session': false,
      },
    })
  })

  // const lambdaAuthorizerFuncArn = new CfnJson(stack, 'lambdaAuthorizerFuncArn', {
  //   value: {
  //     [lambdaAuthorizerFunc.functionArn]: true,
  //   },
  // }).toString()

  // const lambdaAuthorizerArn = new CfnJson(stack, 'lambdaAuthorizerArn', {
  //   value: {
  //     [lambdaAuthorizerFunc.functionArn]: true,
  //   },
  // }).toString()

  // if (api.latestDeployment) {
  //   api.latestDeployment.addToLogicalId({
  //     [lambdaAuthorizerFuncArn]: lambdaAuthorizerArn,
  //   })
  // }
  output(stack, 'api-url', api.url)
}
