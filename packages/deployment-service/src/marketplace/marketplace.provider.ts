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

  private async getAppDetails(
    appId: string,
    token_type: string,
    access_token: string,
  ): Promise<Marketplace.AppDetailModel> {
    const result = await firstValueFrom(
      this.httpService.get<Marketplace.AppDetailModel>(`${this.config.url}/apps/${appId}`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
          ['api-version']: 1,
        },
      }),
    )

    return result.data
  }

  /**
   *
   * @param appId The App Id to make the revision for
   * @param domain The domain to be added to the app for login redirect/signout
   */
  async updateAppUrls(appId: string, domain: string): Promise<void> {
    const { access_token, token_type } = await this.authenticate()
    const appDetails = await this.getAppDetails(appId, token_type, access_token)

    if (!appDetails.description) delete appDetails.description
    if (!appDetails.supportEmail) delete appDetails.supportEmail
    if (!appDetails.homePage) delete appDetails.homePage
    if (!appDetails.summary) delete appDetails.summary
    if (!appDetails.telephone) delete appDetails.telephone
    if (!appDetails.launchUri) delete appDetails.launchUri

    await firstValueFrom(
      this.httpService.post<Marketplace.AppRevisionModel>(
        `${this.config.url}/apps/${appId}/revisions`,
        {
          ...appDetails,
          scopes: appDetails.scopes?.map(scope => scope.name),
          redirectUris: [...(appDetails.redirectUris || []), `https://${domain}/`],
          signoutUris: [...(appDetails.signoutUris || []), `https://${domain}/login`],
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
