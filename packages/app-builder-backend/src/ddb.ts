import {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  QueryCommand,
  PutItemCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb'

import { App } from './entities/app'
import { Page } from './entities/page'

const { APPS_TABLE_NAME = 'apps' } = process.env

export const ddb = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.AWS_REGION || 'eu-west-2',
})

const GSIname = 'userId-index'

const getCreateTableCommand = (tableName: string): CreateTableCommand => {
  return new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' },
    ],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    GlobalSecondaryIndexes: [
      {
        IndexName: GSIname,
        KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
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

const ddbItemToApp = (item: { [key: string]: AttributeValue }): App => {
  const { id, name, userId, createdAt, updatedAt, pages } = item

  return {
    id: id?.S as string,
    name: name?.S as string,
    userId: userId?.S as string,
    createdAt: new Date(parseInt(createdAt?.N as string)),
    updatedAt: new Date(parseInt(updatedAt?.N as string)),
    pages: (pages?.S && (JSON.parse(pages.S as string) as Array<Page>)) || [],
  }
}

export const getUserApps = async (userId: string): Promise<Array<App>> => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: { ':userId': { S: userId } },
    IndexName: GSIname,
  })
  const { Items } = await ddb.send(d)

  return Items?.map(ddbItemToApp) || []
}

export const getApp = async (appId: string): Promise<App | undefined> => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': { S: appId } },
  })
  const { Items } = await ddb.send(d)
  return Items && Items[0] && ddbItemToApp(Items[0])
}

export const createApp = async (id: string, userId: string, name: string, pages: Array<Page>): Promise<App> => {
  const date = new Date()
  const d = new PutItemCommand({
    TableName: APPS_TABLE_NAME,
    Item: {
      id: { S: id },
      userId: { S: userId },
      name: { S: name },
      createdAt: { N: date.getTime().toString() },
      updatedAt: { N: date.getTime().toString() },
      pages: { S: JSON.stringify(pages) },
    },
  })
  await ddb.send(d)

  return {
    id,
    userId,
    name,
    createdAt: date,
    updatedAt: date,
    pages: [],
  }
}

export const updateApp = async (app: App): Promise<App> => {
  const date = new Date()
  const d = new PutItemCommand({
    TableName: APPS_TABLE_NAME,
    Item: {
      id: { S: app.id },
      userId: { S: app.userId },
      name: { S: app.name },
      createdAt: { N: app.createdAt.getTime().toString() },
      updatedAt: { N: date.getTime().toString() },
      pages: { S: JSON.stringify(app.pages) },
    },
  })
  await ddb.send(d)

  return {
    ...app,
    updatedAt: date,
  }
}
