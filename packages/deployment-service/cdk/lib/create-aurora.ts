import { AuroraMysqlEngineVersion, DatabaseCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from './cdk-stack'

export const databaseName = 'deployment_service'

export const createAurora = (stack: CdkStack, vpc: Vpc): [ISecret, DatabaseCluster] => {
  const aurora = new DatabaseCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    defaultDatabaseName: databaseName,
    instanceProps: {
      vpc,
    },
  })

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
