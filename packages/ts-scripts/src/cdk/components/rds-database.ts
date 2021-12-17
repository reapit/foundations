import * as rds from '@aws-cdk/aws-rds'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'
import * as secretsmanager from '@aws-cdk/aws-secretsmanager'
import { RetentionDays } from '@aws-cdk/aws-logs'

export const createDatabase = (stack: cdk.Stack, name: string, databaseName: string, vpc: ec2.Vpc): rds.DatabaseCluster => {
  const db = new rds.DatabaseCluster(stack, name, {
    engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_2_08_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
    },
    cloudwatchLogsRetention: RetentionDays.ONE_MONTH,
  })

  db.connections.allowFromAnyIpv4(ec2.Port.allTcp())

  return db
}

export type DatabaseCluster = rds.DatabaseCluster
export type ISecret = secretsmanager.ISecret