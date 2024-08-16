import 'source-map-support/register'

import { execSync } from 'child_process'

import { createApi, createFunction, createTable, output, createBaseStack } from '@reapit/ts-scripts/src/cdk'

export const createStack = () => {
  const namespace = 'cloud'
  const appName = 'foundations'
  const component = 'app-builder-backend'

  const stack = createBaseStack({
    namespace,
    appName,
    component,
  })
  const SUBDOMAIN_IDX_NAME = 'gsi-subdomain'
  const appsTable = createTable(stack, 'apps', 'id', [
    {
      indexName: SUBDOMAIN_IDX_NAME,
      partitionKeyName: 'subdomain',
    },
  ])
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  execSync('yarn bundle --incremental', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  const handler = 'packages/app-builder-backend/src/lambda.handler'
  const lambdaFunction = createFunction(stack, 'graphql-backend', './bundle.zip', handler, {
    APPS_TABLE_NAME: appsTable.tableName,
    SUBDOMAIN_IDX_NAME,
  })
  appsTable.grantReadWriteData(lambdaFunction)
  const api = createApi({
    scope: stack,
    name: 'api',
    lambdaFunction,
    allowCors: true,
    allowOrigins: ['*'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version', 'reapit-connect-token', 'reapit-customer', 'app-id'],
  })
  output(stack, 'api-url', api.url)
}

createStack()
