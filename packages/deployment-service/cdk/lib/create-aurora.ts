import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine, DatabaseSecret } from "@aws-cdk/aws-rds"
import { Secret } from "@aws-cdk/aws-secretsmanager"
import { Construct } from "@aws-cdk/core"
import { Vpc } from '@aws-cdk/aws-ec2'

export const createAurora = (app: Construct, vpc: Vpc): [Secret, ServerlessCluster] => {
  const secretManager = new DatabaseSecret(app, 'cloud-deployment-aurora-secret', {
    username: 'cloud-deployment', // TODO add to config somewhere
    secretName: 'cloud-deployment-aurora-secret',
  })

  // TODO need ec2 + vpc

  const aurora = new ServerlessCluster(app, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    credentials: secretManager,
    vpc,
  })

  return [secretManager, aurora]
}
