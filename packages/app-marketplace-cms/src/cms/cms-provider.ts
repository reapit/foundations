import { DataMapper, ItemNotFoundException, QueryIterator } from '@aws/dynamodb-data-mapper'
import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { MarketplaceAppModelDto } from './marketplace-app-dto'
import { MarketplaceAppModel } from './marketplace-app-model'

@Injectable()
export class CmsProvider {
  constructor(private readonly dataMapper: DataMapper) {}

  async findAll(props: {
    indexName?: string
    startKey?: Partial<MarketplaceAppModel>
  }): Promise<[QueryIterator<MarketplaceAppModel>, { nextCursor: string }]> {
    const { startKey, indexName } = props

    const dynamoResponse = await this.dataMapper.scan(MarketplaceAppModel, {
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
    try {
      return this.dataMapper.get(Object.assign(new MarketplaceAppModel(), model))
    } catch (e: any) {
      console.log(e, typeof e, e instanceof ItemNotFoundException, e.constructor, e.constructor.prototype)
      if (e instanceof ItemNotFoundException) {
        return undefined
      }
      throw e
    }
  }

  async create(dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.dataMapper.put(Object.assign(new MarketplaceAppModel(), { ...dto }))
  }

  async update(marketplaceApp: MarketplaceAppModel, dto: MarketplaceAppModelDto): Promise<MarketplaceAppModel> {
    return this.dataMapper.put(
      plainToInstance(MarketplaceAppModel, {
        ...marketplaceApp,
        ...dto,
      }),
    )
  }

  async updateBatch(dtos: MarketplaceAppModelDto[]): Promise<MarketplaceAppModel[]> {
    const result: MarketplaceAppModel[] = []
    for await (const persisted of this.dataMapper.batchPut(plainToInstance(MarketplaceAppModel, dtos))) {
      result.push(persisted)
    }

    return result
  }

  async delete(marketplaceApp: MarketplaceAppModel): Promise<MarketplaceAppModel | undefined> {
    return this.dataMapper.delete(marketplaceApp)
  }
}
