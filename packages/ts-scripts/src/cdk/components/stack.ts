import * as cdk from 'aws-cdk-lib'

export const createBaseStack = ({
  namespace,
  appName,
  component,
}: {
  namespace: string
  appName: string
  component: string
}): cdk.Stack => {
  const scope = new cdk.App()
  const name = `${namespace}-${appName}-${component}`
  const stack = new cdk.Stack(scope, name)

  return stack
}

export type Stack = cdk.Stack
