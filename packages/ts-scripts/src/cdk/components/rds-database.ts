import { AuroraMysqlEngineVersion, DatabaseCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds'
import { Port, Vpc } from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export const createAurora = (stack: cdk.Stack, name: string, databaseName: string, vpc: Vpc) => {
  const rds = new DatabaseCluster(stack, name, {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
    },
  })

  rds.connections.allowFromAnyIpv4(Port.allTcp())

  return rds
}