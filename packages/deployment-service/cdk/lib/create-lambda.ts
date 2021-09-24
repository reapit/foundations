import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda'
import { Vpc } from "@aws-cdk/aws-ec2"
import { CdkStack } from "./cdk-stack"

export const createLambda = (stack: CdkStack, handler: string, code: AssetCode, vpc: Vpc): Function => {
  return new Function(stack as any, `deployment-service-${handler.replace('.', '-')}`, {
    code,
    handler,
    runtime: Runtime.NODEJS_14_X,
    vpc,
  })
}
