import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginIdentity } from '@reapit/connect-session'
import { ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE } from '../consts'

export interface AccessTokenProviderConfigInterface {
  env: 'dev' | 'prod'
}

@Injectable()
export class AccessTokenProvider {
  constructor(
    @Inject(ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE)
    private readonly config: AccessTokenProviderConfigInterface,
  ) {}

  async fetchIdentity(accessToken: string): Promise<LoginIdentity> {
    const result = await fetch(`https://platform.${this.config.env}.paas.reapit.cloud/userInfo`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    if (result.status !== 200) throw new UnauthorizedException()

    return result.json() // TODO if axios, result is typed
  }
}
