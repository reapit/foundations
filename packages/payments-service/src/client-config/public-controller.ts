import { Controller, UseGuards, Get, Param } from '@nestjs/common'
import { SessionGuard } from '../session/session-guard'
import { ClientConfigParams } from './dto'
import { ClientConfigModel } from './model'
import { ClientConfigProvider } from './provider'

@Controller('config/public')
@UseGuards(SessionGuard)
export class ClientConfigPublicController {
  constructor(private readonly clientConfigProvider: ClientConfigProvider) {}

  @Get('/:clientCode')
  async getConfig(@Param() { clientCode }: ClientConfigParams): Promise<ClientConfigModel> {
    return this.clientConfigProvider.get(clientCode)
  }
}
