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
    engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_05_2 }),
    defaultDatabaseName: databaseName,
    vpc,
    writer: rds.ClusterInstance.provisioned('writer', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
      isFromLegacyInstanceProps: true,
    }),
    readers: [
      rds.ClusterInstance.serverlessV2('reader1', {
        scaleWithWriter: true,
        isFromLegacyInstanceProps: true,
       }),
    ],
    cloudwatchLogsRetention: logs.RetentionDays.ONE_MONTH,
    deletionProtection: true,
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
