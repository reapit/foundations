import * as cdk from 'aws-cdk-lib'
import {
  aws_ec2 as ec2,
  aws_rds as rds,
  aws_secretsmanager as secretsmanager,
  aws_logs as logs,
} from 'aws-cdk-lib'

export const createDatabase = (stack: cdk.Stack, name: string, databaseName: string, vpc: ec2.Vpc): rds.DatabaseCluster => {
  const db = new rds.DatabaseCluster(stack, name, {
    engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_2_08_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
    },
    cloudwatchLogsRetention: logs.RetentionDays.ONE_MONTH,
  })

  db.connections.allowFromAnyIpv4(ec2.Port.allTcp())

  return db
}

export type DatabaseCluster = rds.DatabaseCluster
export type ISecret = secretsmanager.ISecret