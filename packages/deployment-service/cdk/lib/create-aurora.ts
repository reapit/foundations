import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from './cdk-stack'
import { Duration } from '@aws-cdk/core'

export const databaseName = 'deployment_service'

export const createAurora = (stack: CdkStack, vpc: Vpc): [ISecret, ServerlessCluster] => {
  const aurora = new ServerlessCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    vpc,
    defaultDatabaseName: databaseName,
    scaling: {
      autoPause: Duration.minutes(5),
    },
  })

  aurora.connections.allowDefaultPortFromAnyIpv4()

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
