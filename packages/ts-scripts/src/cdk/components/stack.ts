import * as cdk from '@aws-cdk/core'

export const createBaseStack = ({
  namespace,
  appName,
  component
}: {
  namespace: string
  appName: string
  component: string
}) => {
  const scope = new cdk.App()
  const name = `${namespace}-${appName}-${component}`
  const stack = new cdk.Stack(scope, name)

  return stack
}
