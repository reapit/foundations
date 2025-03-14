import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import marketplace from '../config/marketplace'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class MarketplaceProvider {
  constructor(
    private readonly httpService: HttpService,
    @Inject(marketplace.KEY)
    private readonly config: ConfigType<typeof marketplace>,
  ) {}

  async getAppDetails(appId: string): Promise<Marketplace.AppDetailModel> {
    const result = await firstValueFrom(
      this.httpService.get<Marketplace.AppDetailModel>(`https://${this.config.url}/apps/${appId}`, {
        headers: {
          ['fnd-sec-key']: this.config.apiKey,
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
            ['fnd-sec-key']: this.config.apiKey,
            ['api-version']: 1,
          },
        },
      ),
    )
  }
}
