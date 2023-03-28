import { registerAs } from '@nestjs/config'
import { ApiKeyVerifyModuleOptionsInterface } from '@reapit/api-key-verify'

export default registerAs(
  'apiKeyInvokeArn',
  (): ApiKeyVerifyModuleOptionsInterface => ({
    apiKeyInvoke: {
      invokeArn: process.env.API_KEY_INVOKE_ARN as string,
      enabled: true,
    },
  }),
)
