import * as cdk from 'aws-cdk-lib'

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
  const scope = new cdk.App()
  const name = `${namespace}-${appName}-${component}`
  const stack = new cdk.Stack(scope, name, { env: { account: accountId, region: region || 'eu-west-2' } })

  return stack
}

export type Stack = cdk.Stack
