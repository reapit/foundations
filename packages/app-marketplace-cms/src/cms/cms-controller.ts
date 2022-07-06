import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from '@reapit/utils-nest'
import { CmsProvider } from './cms-provider'
import { MarketplaceAppModelDto } from './marketplace-app-dto'
import { MarketplaceAppModel } from './marketplace-app-model'

type Pagination<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

@Controller('cms/config')
@UseGuards(AdminGuard)
export class CmsController {
  constructor(private readonly cmsProvider: CmsProvider) {}

  protected async resolvePaginationObject(
    apiKeys: [QueryIterator<MarketplaceAppModel>, { nextCursor: string }],
  ): Promise<Pagination<MarketplaceAppModel>> {
    const pagination: Pagination<MarketplaceAppModel> = {
      items: [],
      meta: apiKeys[1],
    }

    for await (const apiKey of apiKeys[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  }

  @Get()
  async fetch(): Promise<Pagination<MarketplaceAppModel>> {
    return this.resolvePaginationObject(await this.cmsProvider.findAll({}))
  }

  @Post()
  async create(@Body() dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.cmsProvider.create(dto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    // @Creds() creds: CredsType,
    @Body() dto: MarketplaceAppModelDto,
  ): Promise<MarketplaceAppModel> {
    const marketplaceApp = await this.cmsProvider.findOne({ id })

    if (!marketplaceApp) {
      throw new NotFoundException()
    }

    return this.cmsProvider.update(marketplaceApp, dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    const marketplaceApp = await this.cmsProvider.findOne({ id })

    if (!marketplaceApp) {
      throw new NotFoundException()
    }

    return this.cmsProvider.delete(marketplaceApp)
  }
}
