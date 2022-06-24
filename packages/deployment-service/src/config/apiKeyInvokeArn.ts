import { registerAs } from '@nestjs/config'
import { AuthModuleOptionsInterface } from '@reapit/utils-nest'

export default registerAs(
  'apiKeyInvokeArn',
  (): AuthModuleOptionsInterface => ({
    apiKeyInvoke: {
      invokeArn: process.env.API_KEY_INVOKE_ARN as string,
      enabled: true,
    },
  }),
)
