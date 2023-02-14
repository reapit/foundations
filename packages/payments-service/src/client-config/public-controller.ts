import { Controller, UseGuards, Get, Headers } from '@nestjs/common'
import { SessionGuard } from '../session/session-guard'
import { ClientConfigPublicHeaders } from './dto'
import { ClientConfigModel } from './model'
import { ClientConfigProvider } from './provider'

@Controller('config/public')
@UseGuards(SessionGuard)
export class ClientConfigPublicController {
  constructor(private readonly clientConfigProvider: ClientConfigProvider) {}

  @Get('/:paymentId')
  async getConfig(@Headers() headers: ClientConfigPublicHeaders): Promise<ClientConfigModel> {
    const clientCode = headers['reapit-customer']
    return await this.clientConfigProvider.get(clientCode)
  }
}
