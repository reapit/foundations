import * as cdk from 'aws-cdk-lib'

const scope = new cdk.App()

export const createBaseStack = ({
  namespace,
  appName,
  component,
  accountId,
  region,
}: {
  namespace: string
  appName: string
  component: string
  accountId?: string
  region?: string
}): cdk.Stack => {
  const name = `${namespace}-${appName}-${component}`
  return new cdk.Stack(scope, name, { env: { account: accountId, region: region || 'eu-west-2' } })
}

export type Stack = cdk.Stack
