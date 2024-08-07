import { Body, Controller, Delete, Get, Patch, Post, Headers } from '@nestjs/common'
import { ClientConfigDeleteDto, ClientConfigDto, ClientConfigPrivateHeaders } from './dto'
import { ClientConfigProvider } from './provider'
import { ClientConfigModel } from './model'

// Client code obtained from header validated at API gateway level against validated id token so safe to use
@Controller('config/private')
export class ClientConfigPrivateController {
  constructor(private readonly clientConfigProvider: ClientConfigProvider) {}

  @Get('/:clientCode')
  async getConfig(@Headers() headers: ClientConfigPrivateHeaders): Promise<ClientConfigModel> {
    const clientCode = headers['reapit-customer']
    return await this.clientConfigProvider.get(clientCode)
  }

  @Post('/:clientCode')
  async createConfig(
    @Headers() headers: ClientConfigPrivateHeaders,
    @Body() configModel: ClientConfigDto,
  ): Promise<ClientConfigModel> {
    const clientCode = headers['reapit-customer']
    return await this.clientConfigProvider.create(clientCode, configModel)
  }

  @Patch('/:clientCode')
  async updateConfig(
    @Headers() headers: ClientConfigPrivateHeaders,
    @Body() configModel: ClientConfigDto,
  ): Promise<ClientConfigModel> {
    const clientCode = headers['reapit-customer']
    return await this.clientConfigProvider.update(clientCode, configModel)
  }

  @Delete('/:clientCode')
  async deleteConfig(
    @Headers() headers: ClientConfigPrivateHeaders,
    @Body() { configId }: ClientConfigDeleteDto,
  ): Promise<ClientConfigModel> {
    const clientCode = headers['reapit-customer']
    return await this.clientConfigProvider.delete(clientCode, configId)
  }
}
