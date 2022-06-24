import { registerAs } from '@nestjs/config'

export default registerAs('apiKeyInvokeArn', () => ({
  invokeArn: process.env.API_KEY_INVOKE_ARN as string,
}))
