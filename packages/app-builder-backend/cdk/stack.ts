import * as cdk from '@aws-cdk/core'
import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb'

import { createApi } from './components/api'
import { createFunction } from './components/function'
import { createTable } from './components/ddb-table'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name: `${stack.stackName}-${name}`,
  })
}

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN is required')
  }

  const SUBDOMAIN_IDX_NAME = 'gsi-subdomain'
  const appsTable = createTable(
    stack,
    'apps',
    {
      name: 'id',
      type: AttributeType.STRING,
    },
    [
      {
        indexName: SUBDOMAIN_IDX_NAME,
        projectionType: ProjectionType.ALL,
        partitionKey: {
          name: 'subdomain',
          type: AttributeType.STRING,
        },
      },
    ],
  )

  const handler = 'packages/app-builder-backend/src/lambda.handler'
  const lambdaFunction = createFunction(stack, 'graphql-backend', './bundle.zip', handler, {
    APPS_TABLE_NAME: appsTable.tableName,
    SUBDOMAIN_IDX_NAME,
  })
  appsTable.grantReadWriteData(lambdaFunction)
  const api = createApi(stack, 'api', lambdaFunction)
  output(stack, 'api-url', api.url)
}
