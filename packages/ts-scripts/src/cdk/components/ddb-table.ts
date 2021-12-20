import * as cdk from 'aws-cdk-lib'
import { aws_dynamodb as ddb } from 'aws-cdk-lib'

export const createTable = (
  scope: cdk.Stack,
  tableName: string,
  keyName: string,
  globalSecondaryIndexes?: { indexName: string; partitionKeyName: string }[],
): ddb.Table => {
  const table = new ddb.Table(scope, tableName, {
    partitionKey: {
      name: keyName,
      type: ddb.AttributeType.STRING,
    },
    billingMode: ddb.BillingMode.PAY_PER_REQUEST,
  })
  if (globalSecondaryIndexes) {
    globalSecondaryIndexes.forEach(({ indexName, partitionKeyName }) => {
      table.addGlobalSecondaryIndex({
        indexName,
        projectionType: ddb.ProjectionType.ALL,
        partitionKey: {
          name: partitionKeyName,
          type: ddb.AttributeType.STRING,
        },
      })
    })
  }
  return table
}
