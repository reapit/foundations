import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper"
import { Injectable } from "@nestjs/common"
import { MarketplaceAppModelDto } from "./marketplace-app-dto"
import { MarketplaceAppModel } from "./marketplace-app-model"

@Injectable()
export class CmsProvider {
  constructor(
    private readonly dataMapper: DataMapper,
  ) {}

  async findAll(props: {
    keys?: Partial<MarketplaceAppModel>
    indexName: string
    startKey?: Partial<MarketplaceAppModel>
  }): Promise<[QueryIterator<MarketplaceAppModel>, { nextCursor: string }]> {
    const { keys, startKey, indexName = 'developerIdOwnership' } = props

    const dynamoResponse = await this.dataMapper.query(MarketplaceAppModel, keys || {}, {
      indexName,
      limit: 100,
      startKey,
    })

    return [
      dynamoResponse,
      {
        nextCursor: '',
      },
    ]
  }

  async findOne(model: Partial<MarketplaceAppModel>): Promise<MarketplaceAppModel | undefined> {
    return this.dataMapper.get(Object.assign(new MarketplaceAppModel(), model))
  }

  async create(dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.dataMapper.put(Object.assign(new MarketplaceAppModel(), { ...dto }))
  }

  async update(marketplaceApp: MarketplaceAppModel, dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.dataMapper.put(Object.assign(new MarketplaceAppModel, {
      ...marketplaceApp,
      ...dto,
    }))
  }

  async delete(marketplaceApp: MarketplaceAppModel): Promise<MarketplaceAppModel | undefined> {
    return this.dataMapper.delete(marketplaceApp)
  }
}
