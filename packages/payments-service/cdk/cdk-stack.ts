import * as path from 'path'
import { createApi, createBaseStack, createTable, createFunction, output } from '@reapit/ts-scripts/src/cdk'
import { aws_apigateway as apigateway, aws_iam as iam, aws_lambda, Duration } from 'aws-cdk-lib'
import config from '../config.json'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

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
    'reapit-app-id',
    'reapit-session',
    'reapit-id-token',
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
    undefined,
    undefined,
    undefined,
    aws_lambda.Runtime.NODEJS_20_X,
  )

  const lambdaAuthorizer = createFunction(
    stack,
    'payments-service-authorizer-lambda',
    path.resolve(__dirname, '..', 'dist'),
    'packages/payments-service/src/core/authorizer.handler',
    env,
    undefined,
    undefined,
    undefined,
    aws_lambda.Runtime.NODEJS_20_X,
  )

  const authorizer = new apigateway.RequestAuthorizer(stack, 'payments-service-authorizer', {
    handler: lambdaAuthorizer,
    identitySources: [apigateway.IdentitySource.header('authorization')],
    resultsCacheTtl: Duration.seconds(0),
  })

  paymentsSessionTable.grantReadWriteData(lambda)
  paymentsConfigTable.grantReadWriteData(lambda)

  lambda.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ses:SendEmail'],
      resources: [`arn:aws:ses:${config.DYNAMO_DB_REGION}:${config.AWS_ACCOUNT_ID}:*`],
    }),
  )

  const pattern = 'Cloud/OpayoKey/*'

  lambda.addToRolePolicy(
    new PolicyStatement({
      actions: [
        'secretsmanager:GetSecretValue',
        'secretsmanager:DeleteSecret',
        'secretsmanager:CreateSecret',
        'secretsmanager:PutSecretValue',
        'secretsmanager:UpdateSecret',
        'secretsmanager:TagResource',
      ],
      resources: [`arn:${stack.partition}:secretsmanager:${stack.region}:${stack.account}:secret:${pattern}`],
    }),
  )

  lambda.addToRolePolicy(
    new PolicyStatement({
      actions: ['sqs:SendMessage'],
      resources: [`arn:aws:sqs:${config.DYNAMO_DB_REGION}:${stack.account}:Platform_Billing_HttpTrafficEvents`],
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
      method: 'PATCH',
      protected: true,
    },
    {
      path: '/config/private/{clientCode}',
      method: 'DELETE',
      protected: true,
    },
    {
      path: '/opayo/private/merchant-session-keys',
      method: 'POST',
      protected: true,
    },
    {
      path: '/opayo/private/transactions',
      method: 'POST',
      protected: true,
    },
    {
      path: '/opayo/public/merchant-session-keys/{paymentId}',
      method: 'POST',
    },
    {
      path: '/opayo/public/transactions/{paymentId}',
      method: 'POST',
    },
  ]

  api.root.resourceForPath('/opayo/private/notification').addMethod('POST', new apigateway.LambdaIntegration(lambda))

  routes.forEach((route) => {
    api.root.resourceForPath(route.path).addMethod(route.method, new apigateway.LambdaIntegration(lambda), {
      authorizer: route.protected ? authorizer : undefined,
      authorizationType: route.protected ? apigateway.AuthorizationType.CUSTOM : undefined,
      apiKeyRequired: !route.protected ? true : undefined,
      requestParameters: {
        'method.request.header.Content-Type': false,
        'method.request.header.Authorization': route.protected ? true : false,
        'method.request.header.X-Api-Key': !route.protected ? true : false,
        'method.request.header.reapit-id-token': route.protected ? true : false,
        'method.request.header.api-version': false,
        'method.request.header.if-match': false,
        'method.request.header.reapit-customer': true,
        'method.request.header.reapit-app-id': true,
        'method.request.header.reapit-session': false,
      },
    })
  })

  output(stack, 'api-url', api.url)
}
