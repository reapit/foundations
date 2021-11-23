import {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  QueryCommand,
  PutItemCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb'
import generateDomain from 'project-name-generator'

import { App } from './entities/app'
import { Page } from './entities/page'

const {
  APPS_TABLE_NAME = 'apps',
  SUBDOMAIN_IDX_NAME = 'domain-index',
  DYNAMODB_ENDPOINT,
  AWS_REGION = 'eu-west-2',
} = process.env

export const ddb = new DynamoDBClient({
  endpoint: DYNAMODB_ENDPOINT,
  region: AWS_REGION,
})

const getCreateTableCommand = (tableName: string): CreateTableCommand => {
  return new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'subdomain', AttributeType: 'S' },
    ],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    GlobalSecondaryIndexes: [
      {
        IndexName: SUBDOMAIN_IDX_NAME,
        KeySchema: [{ AttributeName: 'subdomain', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  })
}

const ensureTable = async (tableName: string) => {
  const d = new DescribeTableCommand({
    TableName: tableName,
  })
  try {
    return await ddb.send(d)
  } catch (e) {
    const c = getCreateTableCommand(tableName)
    return await ddb.send(c)
  }
}

export const ensureTables = async () => {
  const tables = [APPS_TABLE_NAME]

  return Promise.all(tables.map(ensureTable))
}

export type DDBApp = Omit<Omit<App, 'clientId'>, 'name'>

const ddbItemToApp = (item: { [key: string]: AttributeValue }): DDBApp => {
  const { id, createdAt, updatedAt, pages, subdomain } = item

  return {
    id: id?.S as string,
    createdAt: new Date(parseInt(createdAt?.N as string)),
    updatedAt: new Date(parseInt(updatedAt?.N as string)),
    subdomain: subdomain?.S as string,
    pages: (pages?.S && (JSON.parse(pages.S as string) as Array<Page>)) || [],
  }
}

export const getDomainApps = async (subdomain: string) => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'subdomain = :subdomain',
    ExpressionAttributeValues: { ':subdomain': { S: subdomain } },
    IndexName: SUBDOMAIN_IDX_NAME,
  })
  const { Items } = await ddb.send(d)

  return Items?.map(ddbItemToApp) || []
}

export const getApp = async (appId: string): Promise<DDBApp | undefined> => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': { S: appId } },
  })
  const { Items } = await ddb.send(d)
  return Items && Items[0] && ddbItemToApp(Items[0])
}

const isDomainUnq = async (subdomain: string) => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'subdomain = :subdomain',
    ExpressionAttributeValues: { ':subdomain': { S: subdomain } },
    IndexName: SUBDOMAIN_IDX_NAME,
  })
  const { Items } = await ddb.send(d)
  return !Items || !Items.length
}

export const getUnqDomain = async () => {
  const domain = generateDomain().dashed
  const isUnq = await isDomainUnq(domain)
  if (isUnq) {
    return domain
  }
  return getUnqDomain()
}

export const createApp = async (id: string, name: string, subdomain: string, pages: Array<Page>): Promise<DDBApp> => {
  const date = new Date()
  const d = new PutItemCommand({
    TableName: APPS_TABLE_NAME,
    Item: {
      id: { S: id },
      name: { S: name },
      createdAt: { N: date.getTime().toString() },
      updatedAt: { N: date.getTime().toString() },
      pages: { S: JSON.stringify(pages) },
      subdomain: { S: subdomain },
    },
  })
  await ddb.send(d)

  return {
    id,
    subdomain,
    createdAt: date,
    updatedAt: date,
    pages: [],
  }
}

export const updateApp = async (app: DDBApp): Promise<DDBApp> => {
  const date = new Date()
  const d = new PutItemCommand({
    TableName: APPS_TABLE_NAME,
    Item: {
      id: { S: app.id },
      createdAt: { N: app.createdAt.getTime().toString() },
      updatedAt: { N: date.getTime().toString() },
      pages: { S: JSON.stringify(app.pages) },
      subdomain: { S: app.subdomain },
    },
  })
  await ddb.send(d)

  return {
    ...app,
    updatedAt: date,
  }
}
