import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import marketplace from '../config/marketplace'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { firstValueFrom } from 'rxjs'

type Auth0TokenResponse = {
  access_token: string
  token_type: 'Bearer'
}
@Injectable()
export class MarketplaceProvider {
  constructor(
    private readonly httpService: HttpService,
    @Inject(marketplace.KEY)
    private readonly config: ConfigType<typeof marketplace>,
  ) {}

  private async authenticate(): Promise<Auth0TokenResponse | never> {
    const result = await firstValueFrom(
      this.httpService.post<Auth0TokenResponse>(
        this.config.connectUrl,
        {
          client_id: this.config.connectClientId,
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${this.config.connectClientId}:${this.config.connectClientSecret}`).toString('base64')}`,
          },
        },
      ),
    )

    const { access_token, token_type } = result.data

    if (!access_token) throw new Error('Unauthorized')

    return { access_token, token_type }
  }

  /**
   * Find the app's latest revision for patch update
   *
   * @param appId
   * @param token_type
   * @param access_token
   * @returns Revision or undefined
   */
  private async findLatestRevision(
    appId: string,
    token_type: string,
    access_token: string,
  ): Promise<Marketplace.AppRevisionModel | undefined> {
    const result = await firstValueFrom(
      this.httpService.get<Marketplace.AppRevisionModelPagedResult>(`${this.config.url}/apps/${appId}/revisions`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
          ['api-version']: 1,
        },
      }),
    )

    return result?.data?.data ? result.data.data[0] : undefined
  }

  /**
   *
   * @param appId The App Id to make the revision for
   * @param domain The domain to be added to the app for login redirect/signout
   */
  async updateAppUrls(appId: string, domain: string): Promise<void> {
    const { access_token, token_type } = await this.authenticate()
    const revision = await this.findLatestRevision(appId, token_type, access_token)

    if (!revision) throw new Error(`Latest revision not found for app [${appId}]`)

    await firstValueFrom(
      this.httpService.patch<Marketplace.AppRevisionModel>(
        `${this.config.url}/apps/${appId}/revisions/${revision.id}`,
        {
          redirectUris: [...(revision.redirectUris || []), `https://${domain}/`],
          signoutUris: [...(revision.signoutUris || []), `https://${domain}/login`],
        },
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
            ['api-version']: 1,
          },
        },
      ),
    )
  }
}
