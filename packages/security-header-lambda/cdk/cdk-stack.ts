import { createBaseStack, getAccountId, output } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import * as cdk from 'aws-cdk-lib'
import { execSync } from 'child_process'
import { SecurityCDKLambdaValueEnums } from './consts'

export const bootstrap = async () => {
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })

  execSync('yarn bundle', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  
  const accountId = await getAccountId()
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'security-header-lambda',
    component: 'site',
    accountId,
    region: 'us-east-1',
  })

  const edgeLambda = new cdk.aws_cloudfront.experimental.EdgeFunction(stack, 'securityHeaderLambda', {
    runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
    handler: 'index.securityHeaderLambda',
    code: cdk.aws_lambda.Code.fromAsset(join(__dirname, 'bundle.zip')),
  })

  output(stack, SecurityCDKLambdaValueEnums.EDGE_LAMBDA_ARN, edgeLambda.functionArn)
  output(stack, SecurityCDKLambdaValueEnums.EDGE_LAMBDA_VERSION, edgeLambda.currentVersion.version)
  output(stack, SecurityCDKLambdaValueEnums.EDGE_VERSION, edgeLambda.edgeArn)
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
