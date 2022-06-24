import { QueryIterator } from "@aws/dynamodb-data-mapper"
import { Controller, Get} from "@nestjs/common"
import { CmsProvider } from "./cms-provider"
import { MarketplaceAppModel } from "./marketplace-app-model"

type Pagination<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

@Controller('config')
export class PublicController {
  constructor(
    private readonly cmsProvider: CmsProvider,
  ) {}

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


  // TODO add filters for public 
  @Get()
  async fetch(): Promise<Pagination<MarketplaceAppModel>> {
    return this.resolvePaginationObject(await this.cmsProvider.findAll({
      indexName: 'id',
    }))
  }
}
