import * as cdk from 'aws-cdk-lib'

const scope = new cdk.App()

export const createBaseStack = ({
  namespace,
  appName,
  component,
  accountId,
  region,
  crossRegionReferences,
}: {
  namespace: string
  appName: string
  component: string
  accountId?: string
  region?: string
  crossRegionReferences?: boolean
}): cdk.Stack => {
  const name = `${namespace}-${appName}-${component}`
  return new cdk.Stack(scope, name, {
    env: { account: accountId, region: region || 'eu-west-2' },
    crossRegionReferences,
  })
}

export type Stack = cdk.Stack
