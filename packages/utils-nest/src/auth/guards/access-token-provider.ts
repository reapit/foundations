import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginIdentity } from '@reapit/connect-session-server'
import { ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE } from '../consts'

export interface AccessTokenProviderConfigInterface {
  env: 'dev' | 'prod'
}

interface UserInfoModel {
  agencyCloudNegotiatorId: string
  agencyCloudOfficeId: string
  userEmail: string
  organisationId: string
  organisationName: string
  userGroups: string[]
  officeGroupName: string | null
  customerId: string
  timeZoneId: string
  defaultLanguage: string
  defaultCurrency: string
}

@Injectable()
export class AccessTokenProvider {
  constructor(
    @Inject(ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE)
    private readonly config: AccessTokenProviderConfigInterface,
  ) {}

  async fetchIdentity(accessToken: string): Promise<Partial<LoginIdentity>> {
    const result = await fetch(
      this.config.env === 'dev'
        ? `https://platform.${this.config.env}.paas.reapit.cloud/userInfo`
        : 'https://platform.reapit.cloud/userInfo',
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'api-version': 'latest',
        },
      },
    )

    if (result.status !== 200) throw new UnauthorizedException()

    const userInfo: UserInfoModel = (await result.json()) as UserInfoModel

    return {
      ...userInfo,
      email: userInfo.userEmail,
      clientId: '', // not provided from userInfo?
      userCode: userInfo.customerId,
      orgId: userInfo.organisationId,
      groups: userInfo.userGroups,
      orgName: userInfo.organisationName,
      offGroupIds: '', // not provided from userInfo?
      agencyCloudId: userInfo.agencyCloudOfficeId,
    }
  }
}
