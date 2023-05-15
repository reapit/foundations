import { createBaseStack, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import * as cdk from 'aws-cdk-lib'
import { execSync } from 'child_process'

export const createSecurityHeaderLambdaStack = async () => {
  execSync('yarn build', {
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
    handler: 'main.securityHeaderLambda',
    code: cdk.aws_lambda.Code.fromAsset(join(__dirname, 'dist/index.js')),
  })

  return { edgeLambda }
}
