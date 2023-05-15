import { SecurityCDKLambdaValueEnums } from "./consts"
import * as cdk from 'aws-cdk-lib'

export type SecurityHeaderLambdaConfigurations = {
  edgeLambdaVersion: string
}

export const getSecurityLambdaOutputs = (): SecurityHeaderLambdaConfigurations => {
  const edgeLambdaVersion = cdk.Fn.importValue(SecurityCDKLambdaValueEnums.EDGE_LAMBDA_VERSION)

  return {
    edgeLambdaVersion,
  }
}
