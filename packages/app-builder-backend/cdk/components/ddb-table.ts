import * as cdk from '@aws-cdk/core'
import * as ddb from '@aws-cdk/aws-dynamodb'

export const createTable = (
  scope: cdk.Stack,
  tableName: string,
  key: ddb.Attribute,
  globalSecondaryIndexes?: ddb.GlobalSecondaryIndexProps[],
) => {
  const table = new ddb.Table(scope, tableName, {
    partitionKey: key,
    billingMode: ddb.BillingMode.PAY_PER_REQUEST,
  })
  if (globalSecondaryIndexes) {
    globalSecondaryIndexes.forEach((globalSecondaryIndex) => {
      table.addGlobalSecondaryIndex(globalSecondaryIndex)
    })
  }
  return table
}
