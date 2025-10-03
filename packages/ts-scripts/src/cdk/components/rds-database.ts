import * as cdk from 'aws-cdk-lib'
import { aws_ec2 as ec2, aws_rds as rds, aws_secretsmanager as secretsmanager, aws_logs as logs } from 'aws-cdk-lib'

export const createDatabase = (
  stack: cdk.Stack,
  name: string,
  databaseName: string,
  vpc: ec2.Vpc,
  secret?: cdk.aws_secretsmanager.ISecret,
  bastion: boolean = false,
  createConnections: boolean = true,
): rds.DatabaseCluster => {
  const db = new rds.DatabaseCluster(stack, name, {
    engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_08_2 }),
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
    credentials: secret ? rds.Credentials.fromSecret(secret) : undefined,
  })

  if (createConnections) db.connections.allowFromAnyIpv4(ec2.Port.MYSQL_AURORA)

  if (bastion) {
    new ec2.BastionHostLinux(stack, 'bastion', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.NANO),
      blockDevices: [
        {
          deviceName: '/dev/sdh',
          volume: ec2.BlockDeviceVolume.ebs(20, {
            volumeType: ec2.EbsDeviceVolumeType.GP3,
          }),
        },
      ],
    })
  }

  return db
}

export type DatabaseCluster = rds.DatabaseCluster
export type ISecret = secretsmanager.ISecret
