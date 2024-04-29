import * as cdk from 'aws-cdk-lib'
import { aws_ec2 as ec2, aws_rds as rds, aws_secretsmanager as secretsmanager, aws_logs as logs } from 'aws-cdk-lib'

let bastion: ec2.BastionHostLinux | undefined

export const createDatabase = (
  stack: cdk.Stack,
  name: string,
  databaseName: string,
  vpc: ec2.Vpc,
): rds.DatabaseCluster => {
  const db = new rds.DatabaseCluster(stack, name, {
    engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_2_08_1 }),
    // engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_03_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
      instanceType: cdk.aws_ec2.InstanceType.of(cdk.aws_ec2.InstanceClass.T3, cdk.aws_ec2.InstanceSize.MEDIUM),
    },
    cloudwatchLogsRetention: logs.RetentionDays.ONE_MONTH,
  })

  db.connections.allowFromAnyIpv4(ec2.Port.allTcp())

  if (!bastion) {
    bastion = new ec2.BastionHostLinux(stack, 'bastion', {
      vpc,
    })
  }

  return db
}

export type DatabaseCluster = rds.DatabaseCluster
export type ISecret = secretsmanager.ISecret
