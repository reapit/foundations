import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminReadonlyGuard, IdTokenGuard } from '@reapit/utils-nest'
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
export class CmsController {
  constructor(private readonly cmsProvider: CmsProvider) {}

  protected async resolvePaginationObject(
    configItems: [QueryIterator<MarketplaceAppModel>, { nextCursor: string }],
  ): Promise<Pagination<MarketplaceAppModel>> {
    const pagination: Pagination<MarketplaceAppModel> = {
      items: [],
      meta: configItems[1],
    }

    for await (const configItem of configItems[0]) {
      pagination.items.push(configItem)
    }

    return pagination
  }

  @Get()
  @UseGuards(IdTokenGuard, AdminReadonlyGuard)
  async fetch(): Promise<Pagination<MarketplaceAppModel>> {
    return this.resolvePaginationObject(await this.cmsProvider.findAll({}))
  }

  @Post()
  @UseGuards(IdTokenGuard, AdminReadonlyGuard)
  async create(@Body() dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.cmsProvider.create(dto)
  }

  @Put(':id')
  @UseGuards(IdTokenGuard, AdminReadonlyGuard)
  async update(@Param('id') id: string, @Body() dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    const marketplaceApp = await this.cmsProvider.findOne({ id })

    if (!marketplaceApp) {
      throw new NotFoundException()
    }

    return this.cmsProvider.update(marketplaceApp, dto)
  }

  @Put('')
  @UseGuards(IdTokenGuard, AdminReadonlyGuard)
  async updateBatch(@Body() dtos: MarketplaceAppModelDto[]): Promise<MarketplaceAppModel[]> {
    return this.cmsProvider.updateBatch(dtos)
  }

  @Delete(':id')
  @UseGuards(IdTokenGuard, AdminReadonlyGuard)
  async delete(@Param('id') id: string): Promise<any> {
    const marketplaceApp = await this.cmsProvider.findOne({ id })

    if (!marketplaceApp) {
      throw new NotFoundException()
    }

    return this.cmsProvider.delete(marketplaceApp)
  }
}
