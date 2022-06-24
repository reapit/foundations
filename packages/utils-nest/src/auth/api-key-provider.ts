import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ApiKeyModel, resolveApiKey } from '@reapit/api-key-verify'
import { API_KEY_INVOKE_CONFIG_PROVIDE } from './api-key-invoke-config'

export type Credentials = {
  developerId: string
  clientId: string
}

@Injectable()
export class ApiKeyProvider {
  constructor(@Inject(API_KEY_INVOKE_CONFIG_PROVIDE) private readonly apiKeyInvokeArn: string) {}
  async resolve(apiKey: string): Promise<Credentials | never> {
    if (!apiKey) {
      throw new UnauthorizedException()
    }

    let creds: ApiKeyModel

    try {
      creds = await resolveApiKey({ apiKey, functionName: this.apiKeyInvokeArn })
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException()
    }

    return {
      developerId: creds?.developerId as string,
      clientId: creds?.clientCode as string,
    }
  }
}
