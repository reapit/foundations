import 'source-map-support/register'

import { createApi } from '@reapit/ts-scripts/src/cdk/components/api-gateway-api'
import { createFunction } from '@reapit/ts-scripts/src/cdk/components/lambda-function'
import { createTable } from '@reapit/ts-scripts/src/cdk/components/ddb-table'
import { output } from '@reapit/ts-scripts/src/cdk/utils/output'
import { createBaseStack } from '@reapit/ts-scripts/src/cdk/components/stack'

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

  const handler = 'packages/app-builder-backend/src/lambda.handler'
  const lambdaFunction = createFunction(stack, 'graphql-backend', './bundle.zip', handler, {
    APPS_TABLE_NAME: appsTable.tableName,
    SUBDOMAIN_IDX_NAME,
  })
  appsTable.grantReadWriteData(lambdaFunction)
  const api = createApi(stack, 'api', lambdaFunction)
  output(stack, 'api-url', api.url)
}

createStack()
