import { Construct } from "@aws-cdk/core"
import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda'
import { Vpc } from "@aws-cdk/aws-ec2"

export const createLambda = (app: Construct, handler: string, code: AssetCode, vpc: Vpc): Function => {
  return new Function(app as any, `deployment-service-${handler.replace('.', '-')}`, {
    code,
    handler,
    runtime: Runtime.NODEJS_14_X,
    vpc,
  })
}
