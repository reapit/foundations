import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { Controller, Get, Query } from '@nestjs/common'
import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
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

  protected isLive(configItem: MarketplaceAppModel, isLive: boolean | undefined = true): boolean {
    const now = new Date().getTime()

    if (typeof configItem.live.timeFrom !== 'undefined' && typeof configItem.live.timeTo !== 'undefined') {
      const timeFromInRange = new Date(configItem.live.timeFrom).getTime() <= now
      const timeToInRange = new Date(configItem.live.timeTo).getTime() >= now
      if (timeFromInRange && timeToInRange) {
        return isLive
      }

      return !isLive
    }

    return typeof isLive === 'boolean'
      ? isLive
        ? configItem.live.isLive
        : !configItem.live.isLive
      : configItem.live.isLive
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
    @Query('isLive') isLiveQuery: string,
    @Query('configType') configType?: string,
    @Query('id') configId?: string,
  ): Promise<Pagination<MarketplaceAppModel>> {
    const isLive = isLiveQuery === 'true' ? true : isLiveQuery === 'false' ? false : undefined

    // return singular config for testing on frontend
    if (configId) {
      const config = await this.cmsProvider.findOne({ id: configId })

      return {
        items: config ? [config] : [],
        meta: {
          nextCursor: '',
        },
      }
    }

    return this.resolvePaginationObject(await this.cmsProvider.findAll({}), isLive, configType as AppsBrowseConfigEnum)
  }
}
