import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda'
import { Vpc } from "@aws-cdk/aws-ec2"
import { CdkStack } from "./cdk-stack"
import environment from '../../config.json'

export const createLambda =
({
  stack,
  name,
  code,
  vpc,
  handler,
}: {
  stack: CdkStack,
  name: string,
  code: AssetCode,
  vpc: Vpc,
  handler: string,
}): Function => {
  return new Function(stack as any, name, {
    code,
    handler,
    runtime: Runtime.NODEJS_14_X,
    vpc,
    // environment,
  })
}
