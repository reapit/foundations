import * as cdk from '@aws-cdk/core'
import { Provider, ProviderProps } from '@aws-cdk/custom-resources'
import { RetentionDays } from '@aws-cdk/aws-logs'

export const createStackEventHandler = (scope: cdk.Stack, name: string, handler: ProviderProps['onEventHandler']): cdk.CustomResource => {
  const resourceProvider = new Provider(scope, `${name}-rp`, {
    onEventHandler: handler,
    logRetention: RetentionDays.ONE_DAY,
  })

  return new cdk.CustomResource(scope, name, {
    serviceToken: resourceProvider.serviceToken,
  })
}
