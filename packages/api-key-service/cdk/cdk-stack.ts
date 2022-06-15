import * as path from 'path'
import {
  Topic,
  addLambdaToApi,
  createApi,
  createBaseStack,
  createVpc,
  createCodeBuildProject,
  getCodebuildSnsTopic,
  PolicyStatement,
  createStackEventHandler,
  LambdaRoute,
  Queue,
  createSecret,
  createTable,
  createFunction,
} from '@reapit/ts-scripts/src/cdk'
import config from '../config.json'


export const createStack = async () => {
  const envStage = process.env.APP_STAGE === 'production' ? 'prod' : 'dev'
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'deployment',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })

  const api = createApi(stack, 'apigateway', undefined)
  const vpc = createVpc(stack, 'vpc')

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

  // TODO create permissions

  const env = {

  }

  const httpLambda = createFunction(stack, 'api-key-http', path.resolve('bundle.zip'), 'src/http.handler', env, vpc)
  const invokeLambda = createFunction(stack, 'api-key-invoke', path.resolve('bundle.zip'), 'src/invoke.invokeAPiKeyVerify', env, vpc)
  
  "arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.env.DYNAMO_DB_API_KEY_TABLE_NAME}/index/*"

  const dynamodbPolicy = new PolicyStatement({
    resources: [dynamodb.tableArn],
    actions: [
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ],
  })

  const tablePolicy = new PolicyStatement({
    resources: [`${dynamodb.tableArn}/index/*`],
    actions: [
      "dynamodb:Query",
      "dynamodb:Scan",
    ],
  });

  [tablePolicy, dynamodbPolicy].forEach(policy => {
    httpLambda.addToRolePolicy(policy)
    invokeLambda.addToRolePolicy(policy)
  })

  addLambdaToApi(
    stack,
    api,
    httpLambda,
    {
      path: '{proxy+}',
      method: 'ANY',
    },
    // @ts-ignore
    config.AUTHORIZER_ID as string,
  )
}
