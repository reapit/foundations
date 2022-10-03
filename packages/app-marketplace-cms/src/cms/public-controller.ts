import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { Controller, Get, Query } from '@nestjs/common'
import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions/marketplace-cms'
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

  protected isLive(configItem: MarketplaceAppModel, isLive: boolean = true): boolean {
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
        return isLive
      }

      return !isLive
    }

    return isLive ? configItem.live.isLive : !configItem.live.isLive
  }

  protected async resolvePaginationObject(
    configItems: [QueryIterator<MarketplaceAppModel>, { nextCursor: string }],
    isLive?: boolean,
    configType?: AppsBrowseConfigEnum,
  ): Promise<Pagination<MarketplaceAppModel>> {
    const pagination: Pagination<MarketplaceAppModel> = {
      items: [],
      meta: configItems[1],
    }

    for await (const configItem of configItems[0]) {
      if (this.isLive(configItem, isLive)) {
        if (configType) {
          if (configType === configItem.configType) pagination.items.push(configItem)
        } else {
          pagination.items.push(configItem)
        }
      }
    }

    return pagination
  }

  @Get()
  async fetch(
    @Query('isLive') isLive: string,
    @Query('configType') configType?: AppsBrowseConfigEnum,
  ): Promise<Pagination<MarketplaceAppModel>> {
    return this.resolvePaginationObject(await this.cmsProvider.findAll({}), isLive === 'true', configType)
  }
}
