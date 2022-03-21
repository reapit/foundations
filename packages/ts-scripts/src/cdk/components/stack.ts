import * as cdk from 'aws-cdk-lib'

export const createBaseStack = ({
  namespace,
  appName,
  component,
  accountId,
}: {
  namespace: string
  appName: string
  component: string
  accountId?: string
}): cdk.Stack => {
  const scope = new cdk.App()
  const name = `${namespace}-${appName}-${component}`
  const stack = new cdk.Stack(scope, name, accountId ? { env: { account: accountId } } : undefined)

  return stack
}

export type Stack = cdk.Stack
