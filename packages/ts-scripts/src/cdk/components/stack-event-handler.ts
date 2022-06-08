import * as cdk from 'aws-cdk-lib'
import { custom_resources as customResources, aws_logs as logs } from 'aws-cdk-lib'

export const createStackEventHandler = (
  scope: cdk.Stack,
  name: string,
  handler: customResources.ProviderProps['onEventHandler'],
  changeThisStringToTriggerFunction: string,
): cdk.CustomResource => {
  const resourceProvider = new customResources.Provider(scope, `${name}-rp`, {
    onEventHandler: handler,
    logRetention: logs.RetentionDays.ONE_DAY,
  })

  return new cdk.CustomResource(scope, name, {
    serviceToken: resourceProvider.serviceToken,
    properties: {
      changeThisStringToTriggerFunction,
    },
  })
}

export {
  OnEventHandler,
  OnEventRequest,
  OnEventResponse,
} from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'
