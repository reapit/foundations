import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine } from "@aws-cdk/aws-rds"
import { ISecret } from "@aws-cdk/aws-secretsmanager"
import { Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from "./cdk-stack"

export const createAurora = (stack: CdkStack, vpc: Vpc): [ISecret, ServerlessCluster] => {
  const aurora = new ServerlessCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    vpc,
  })

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
