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
      this.httpService.post<Auth0TokenResponse>(`${this.config.auth0Url}/oauth/token`, {
        client_id: this.config.auth0ClientId,
        client_secret: this.config.auth0ClientSecret,
        grant_type: 'client_credentials',
        audience: `https://${this.config.url}`,
      }),
    )

    console.log('result', result)

    return result.data
  }

  async getAppDetails(appId: string): Promise<Marketplace.AppDetailModel> {
    const { access_token, token_type } = await this.authenticate()

    console.log('aceess', access_token, token_type)

    const result = await firstValueFrom(
      this.httpService.get<Marketplace.AppDetailModel>(`https://${this.config.url}/apps/${appId}`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
          // ['fnd-sec-key']: this.config.apiKey,
          ['api-key']: 1,
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
  async updateAppUrls(appId: string, domain: string, developerId: string, name: string): Promise<void> {
    const { access_token, token_type } = await this.authenticate()

    console.log('aceess', access_token, token_type)

    await firstValueFrom(
      this.httpService.post<Marketplace.AppRevisionModel>(
        `https://${this.config.url}/apps/${appId}/revisions`,
        {
          redirectUris: [`https://${domain}/login`],
          signoutUris: [`https://${domain}/login`],
          developerId,
          name,
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
