import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine } from "@aws-cdk/aws-rds"
import { ISecret } from "@aws-cdk/aws-secretsmanager"
import { Construct } from "@aws-cdk/core"
import { Vpc } from '@aws-cdk/aws-ec2'

export const createAurora = (app: Construct, vpc: Vpc): [ISecret, ServerlessCluster] => {
  const aurora = new ServerlessCluster(app as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    vpc,
  })

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
