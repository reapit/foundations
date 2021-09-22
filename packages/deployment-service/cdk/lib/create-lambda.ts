import { Construct } from "@aws-cdk/core"
import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda'

export const createLambda = (app: Construct, handler: string, code: AssetCode): Function => {
  return new Function(app, `deployment-service-${handler.replace('.', '-')}`, {
    code,
    handler,
    runtime: Runtime.NODEJS_14_X,
  })
}
