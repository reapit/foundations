import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common"
import { ApiKeyDto } from "./api-key-dto"
import { ApiKeyMemberDto } from "./api-key-member-dto"
import { ApiKeyProvider } from "./api-key-provider"

type Pagination<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

@Controller('api-key')
@AuthGuard(CredsGuard)
export class ApiKeyController {

  constructor(private readonly apiKeyProvider: ApiKeyProvider) {}

  protected async resolvePaginationObject(apiKeys: ApiKeyModel[]): Promise<Pagination<ApiKeyModel>> {
    const pagination: Pagination<ApiKeyModel> = {
      items: [],
      meta: apiKeys[1],
    }

    for await (const apiKey of apiKeys[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  }

  @Get('')
  async paginate(
    @Creds() creds: CredsType,
    @Query('nextCursor') nextCursor?: string,
  ): Promise<Pagination<ApiKeyModel>> {
    const response = await this.apiKeyProvider.batchGet({
      keys: creds,
      indexName: 'developerIdOwnership',
      startKey: { nextCursor },
    })

    return this.resolvePaginationObject(response)
  }

  @Get('/member/:email')
  async paginateByMember(
    @Param('email') email: string,
    @Query('nextCursor') nextCursor:? string,
  ): Promise<Pagination<ApiKeyModel>> {
    const response = await this.apiKeyProvider.batchGet({
      keys: {email},
      indexName: 'email',
      startKey: { id: nextCursor },
    })

    return this.resolvePaginationObject(response)
  }

  @Post()
  async createApiKey(
    @Body() apiKey: ApiKeyDto,
  ): Promise<ApiKeyModel> {
    return this.apiKeyProvider.create(apiKey)
  }

  @Post('/member')
  async creatApiKeyByMember(
    @Body() apiKey: ApiKeyMemberDto,
  ): Promise<ApiKeyModel> {
    return this.apiKeyProvider.create(apiKey)
  }

  @Get('/:id')
  async getApiKey(
    @Param('id') id
    @Creds() creds: CredsType,
  ): Promise<ApiKeyModel> {
    return this.apiKeyProvider.findOne({
      id,
      developerId: creds?.developerId,
    })
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<void> {
    return this.apiKeyProvider.delete(id)
  }
}
