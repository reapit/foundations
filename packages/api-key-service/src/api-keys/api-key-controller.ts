import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ApiKeyDto } from './api-key-dto'
import { ApiKeyMemberDto } from './api-key-member-dto'
import { ApiKeyProvider } from './api-key-provider'
import { CredGuard, Creds, CredsType } from '@reapit/utils-nest'
import { ApiKeyModel } from '@reapit/api-key-verify'
import { QueryIterator } from '@aws/dynamodb-data-mapper'
import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'

type Pagination<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

@Controller('api-key')
@UseGuards(CredGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyProvider: ApiKeyProvider) {}

  protected async resolvePaginationObject(apiKeys: [QueryIterator<ApiKeyModel>, { nextCursor: string }]): Promise<Pagination<ApiKeyModel>> {
    const pagination: Pagination<ApiKeyModel> = {
      items: [],
      meta: apiKeys[1],
    }

    for await (const apiKey of apiKeys[0]) {
      console.log('api-key', apiKey)
      pagination.items.push(apiKey)
    }

    return pagination
  }

  @Get('')
  async paginate(
    @Creds() creds: CredsType,
    @Query('nextCursor') nextCursor?: string,
  ): Promise<Pagination<ApiKeyModel>> {
    if (!creds.developerId || !creds.email) throw new UnauthorizedException()

    const response = await this.apiKeyProvider.batchGet({
      keys: creds as { developerId: string },
      indexName: 'developerIdOwnership',
      startKey: nextCursor ? { id: nextCursor } : undefined,
    })

    return this.resolvePaginationObject(response)
  }

  @Get('/user/:email')
  async paginateByMember(
    @Param('email') email: string,
    @Query('nextCursor') nextCursor?: string,
  ): Promise<Pagination<ApiKeyModel>> {
    const response = await this.apiKeyProvider.batchGet({
      keys: { email },
      indexName: 'email',
      startKey: nextCursor ? { id: nextCursor } : undefined,
    })

    console.log('response', response)

    const result = await this.resolvePaginationObject(response)

    console.log('result', result)
    return result
  }

  @Post()
  async createApiKey(@Body() apiKey: ApiKeyDto): Promise<ApiKeyModel> {
    return this.apiKeyProvider.create(apiKey)
  }

  @Post('/user')
  async creatApiKeyByMember(@Body() apiKey: ApiKeyMemberDto): Promise<ApiKeyModel> {
    return this.apiKeyProvider.create(apiKey)
  }

  @Get('/:id')
  async getApiKey(@Param('id') id, @Creds() creds: CredsType): Promise<ApiKeyModel | undefined> {
    return this.apiKeyProvider.findOne({
      id,
      developerId: creds.developerId as string,
    })
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.apiKeyProvider.delete(id)
  }
}
