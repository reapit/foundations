import { SecurityCDKLambdaValueEnums } from "./consts"
import * as cdk from 'aws-cdk-lib'

export type SecurityHeaderLambdaConfigurations = {
  edgeLambdaArn: string
  edgeVersion: string
  edgeLambdaVersion: string
}

export const getSecurityLambdaOutputs = (): SecurityHeaderLambdaConfigurations => {
  const edgeLambdaArn = cdk.Fn.importValue(SecurityCDKLambdaValueEnums.EDGE_LAMBDA_ARN)
  const edgeVersion = cdk.Fn.importValue(SecurityCDKLambdaValueEnums.EDGE_VERSION)
  const edgeLambdaVersion = cdk.Fn.importValue(SecurityCDKLambdaValueEnums.EDGE_LAMBDA_VERSION)

  return {
    edgeLambdaArn,
    edgeVersion,
    edgeLambdaVersion,
  }
}
