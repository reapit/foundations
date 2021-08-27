import {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  QueryCommand,
  PutItemCommand,
  AttributeValue,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb'
import * as uuid from 'uuid'

import { App } from './entities/app'
import { Page } from './entities/page'

const { APPS_TABLE_NAME = 'apps' } = process.env

export const ddb = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.AWS_REGION || 'eu-west-2',
})

const getCreateTableCommand = (tableName: string): CreateTableCommand => {
  return new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
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

  await Promise.all(tables.map(ensureTable))
}

const ddbItemToApp = (item: { [key: string]: AttributeValue }): App => {
  const { id, name, userId, createdAt, updatedAt, pages } = item
  return {
    id: id.S as string,
    name: name.S as string,
    userId: userId.S as string,
    createdAt: new Date(createdAt.N as string),
    updatedAt: new Date(updatedAt.N as string),
    pages: JSON.parse(pages.S as string) as Array<Page>,
  }
}

export const getUserApps = async (userId: string): Promise<Array<App>> => {
  const d = new QueryCommand({
    TableName: APPS_TABLE_NAME,
    KeyConditionExpression: 'begins_with(id, :userId)',
    ExpressionAttributeValues: { ':userId': { S: userId } },
  })
  const { Items } = await ddb.send(d)

  return Items?.map(ddbItemToApp) || []
}

export const getApp = async (appId: string): Promise<App | undefined> => {
  const d = new GetItemCommand({
    TableName: APPS_TABLE_NAME,
    Key: { id: { S: appId } },
  })
  const { Item } = await ddb.send(d)
  return Item && ddbItemToApp(Item)
}

export const createApp = async (userId: string, name: string): Promise<App> => {
  const uid = uuid.v4()
  const id = `${userId}-${uid}`
  const date = new Date()
  const d = new PutItemCommand({
    TableName: APPS_TABLE_NAME,
    Item: {
      id: { S: id },
      userId: { S: userId },
      name: { S: name },
      createdAt: { N: date.getTime().toString() },
      updatedAt: { N: date.getTime().toString() },
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
    id: app.id,
    userId: app.userId,
    name: app.name,
    createdAt: app.createdAt,
    updatedAt: date,
    pages: app.pages,
  }
}
