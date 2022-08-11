import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { Controller, Get } from '@nestjs/common'
import { CmsProvider } from './cms-provider'
import { MarketplaceAppModel } from './marketplace-app-model'

type Pagination<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

@Controller()
export class PublicController {
  constructor(private readonly cmsProvider: CmsProvider) {}

  protected isLive(configItem: MarketplaceAppModel): boolean {
    const now = new Date().getTime()

    if (typeof configItem.live.timeFrom !== 'undefined' || typeof configItem.live.timeTo !== 'undefined') {
      if (
        (typeof configItem.live.timeTo !== 'undefined' &&
          new Date(configItem.live.timeTo).getTime() >= now &&
          typeof configItem.live.timeFrom !== 'undefined' &&
          new Date(configItem.live.timeFrom).getTime() <= now) ||
        (typeof configItem.live.timeFrom !== 'undefined' && new Date(configItem.live.timeFrom).getTime() <= now) ||
        (typeof configItem.live.timeTo !== 'undefined' && new Date(configItem.live.timeTo).getTime() >= now)
      ) {
        return true
      }

      return false
    }

    return configItem.live.isLive
  }

  protected async resolvePaginationObject(
    configItems: [QueryIterator<MarketplaceAppModel>, { nextCursor: string }],
  ): Promise<Pagination<MarketplaceAppModel>> {
    const pagination: Pagination<MarketplaceAppModel> = {
      items: [],
      meta: configItems[1],
    }

    for await (const configItem of configItems[0]) {
      if (this.isLive(configItem)) pagination.items.push(configItem)
    }

    return pagination
  }

  @Get()
  async fetch(): Promise<Pagination<MarketplaceAppModel>> {
    return this.resolvePaginationObject(await this.cmsProvider.findAll({}))
  }
}
