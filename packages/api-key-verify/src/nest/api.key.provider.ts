import { Inject, UnauthorizedException } from '@nestjs/common'
import { AuthProviderInterface, CredAuthTokenProvider } from '@reapit/utils-nest'
import { ApiKeyModel, resolveApiKey } from '..'
import { API_KEY_INVOKE_CONFIG_PROVIDE, AuthModuleOptionsInterface } from './api.key.invoke.config'

@CredAuthTokenProvider(2)
export class ApiKeyProvider implements AuthProviderInterface<ApiKeyModel> {
  applies(request: any) {
    return Object.keys(request.headers).includes('x-api-key')
  }

  type() {
    return 'api-key'
  }

  constructor(@Inject(API_KEY_INVOKE_CONFIG_PROVIDE) private readonly authOptions: AuthModuleOptionsInterface) {}
  async resolve(request: any): Promise<ApiKeyModel | never> {
    const apiKey = request.headers['x-api-key'] as string

    if (!apiKey) {
      throw new UnauthorizedException()
    }

    let creds: ApiKeyModel

    if (!this.authOptions.apiKeyInvoke.enabled) {
      throw new Error('ApiKey invoke is not enabled in your auth options')
    }

    if (typeof this.authOptions.apiKeyInvoke.invokeArn === 'undefined') {
      throw new Error('ApiKey invokeArn not provided in your auth options')
    }

    try {
      creds = await resolveApiKey({ apiKey, functionName: this.authOptions.apiKeyInvoke.invokeArn })
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException()
    }

    return creds
  }
}
