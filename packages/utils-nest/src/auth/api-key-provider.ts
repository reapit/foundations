import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ApiKeyModel, resolveApiKey } from '@reapit/api-key-verify'
import { API_KEY_INVOKE_CONFIG_PROVIDE, AuthModuleOptionsInterface } from './api-key-invoke-config'

@Injectable()
export class ApiKeyProvider {
  constructor(@Inject(API_KEY_INVOKE_CONFIG_PROVIDE) private readonly authOptions: AuthModuleOptionsInterface) {}
  async resolve(apiKey: string): Promise<ApiKeyModel | never> {
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
