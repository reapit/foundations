import { AuroraMysqlEngineVersion, DatabaseCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { Port, Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from './cdk-stack'
import { RetentionDays } from '@aws-cdk/aws-logs'

export const databaseName = 'deployment_service'

export const createAurora = (stack: CdkStack, vpc: Vpc): [ISecret, DatabaseCluster] => {
  const aurora = new DatabaseCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
    },
    cloudwatchLogsRetention: RetentionDays.ONE_MONTH,
  })

  aurora.connections.allowFromAnyIpv4(Port.allTcp())

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
