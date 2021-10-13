import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine } from "@aws-cdk/aws-rds"
import { ISecret } from "@aws-cdk/aws-secretsmanager"
import { ISubnet, SecurityGroup, Subnet, Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from "./cdk-stack"

export const createAurora = (stack: CdkStack, vpc: Vpc, subnets: ISubnet[]): [ISecret, ServerlessCluster] => {
  const aurora = new ServerlessCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    vpc,
    vpcSubnets: {
      subnets,
    },
  })

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
