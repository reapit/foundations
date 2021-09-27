import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import path from 'path'
import { createApi } from './components/api'
import { createFunction } from './components/function'
import { createTable } from './components/ddb-table'
import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb'

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name: `${stack.stackName}-${name}`,
  })
}

const repoRoot = path.join('..', '..')

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN is required')
  }

  const PACKAGE = 'app-builder-backend'
  const HANDLER = `${PACKAGE}/src/lambda.handler`

  const code = lambda.DockerImageCode.fromImageAsset(repoRoot, {
    buildArgs: {
      PACKAGE,
      NPM_TOKEN: process.env.NPM_TOKEN,
    },
    cmd: [`packages/${PACKAGE}/dist/${HANDLER}`],
  })
  const GSI_NAME = 'gsi-userId'
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
        indexName: GSI_NAME,
        projectionType: ProjectionType.ALL,
        partitionKey: {
          name: 'userId',
          type: AttributeType.STRING,
        },
      },
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
  const lambdaFunction = createFunction(stack, 'graphql', code, {
    APPS_TABLE_NAME: appsTable.tableName,
    GSI_NAME,
    SUBDOMAIN_IDX_NAME,
  })
  appsTable.grantReadWriteData(lambdaFunction)
  const api = createApi(stack, 'api', lambdaFunction)
  lambdaFunction.addEnvironment('API_URL', api.url)

  output(stack, 'api-url', api.url)
}
