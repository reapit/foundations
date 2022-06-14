import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper"
import { Injectable } from "@nestjs/common"
import { ApiKeyModel } from '@reapit/api-key-verify'

@Injectable()
export class ApiKeyProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async batchGet(props: {
    keys: { email: string } | { developerId: string }
    indexName: string
    startKey?: Partial<ApiKeyModel>
  }): Promise<[QueryIterator<ApiKeyModel>, { nextCursor: string }]> {
    const { keys, startKey, indexName = 'developerIdOwnership'} = props

    const dynamoResponse = await this.datamapper.query(ApiKeyModel, keys, {
      indexName,
      limit: 10,
      startKey,
    })

    return [
      dynamoResponse,
      {
        nextCursor: '',
      }
    ]
  }

  async create(apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel> {
    return this.datamapper.put(Object.assign(new ApiKeyModel, { ...apiKey }))
  }

  async update(apiKey: ApiKeyModel, dto: Partial<ApiKeyModel>): Promise<ApiKeyModel> {
    return this.datamapper.put(Object.assign(new ApiKeyModel, { 
      ...apiKey,
      ...dto,
    }))
  }

  async findOne(apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel | undefined> {
    return this.datamapper.get(Object.assign(new ApiKeyModel, apiKey))
  }

  async getApiKeyByKey (apiKey: string): Promise<ApiKeyModel | undefined> {
    const result = await this.datamapper.query<ApiKeyModel>(ApiKeyModel, { apiKey }, {
      indexName: 'apiKey',
    })

    const apiKeys: ApiKeyModel[] = []

    for await (const key of result) {
      apiKeys.push(key)
    }

    apiKeys
      .sort((a, b) => new Date(a.keyExpiresAt as string).getDate() - new Date(b.keyExpiresAt as string).getDate())
      .reverse()

    return apiKeys.filter((key) => typeof key !== 'undefined')[0]
  }

  async delete(apiKey: string): Promise<void> {
    await this.datamapper.delete({ apiKey })
  }
}
