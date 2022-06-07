import { CredGuard } from '../auth'
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { PusherProvider } from './pusher-provider'

@Controller('pusher')
@UseGuards(CredGuard)
export class PusherWebhookController {
  constructor(private readonly pusherProvider: PusherProvider) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async auth(@Body() body) {
    const { socket_id, channel_name } = body

    return this.pusherProvider.authenticate(socket_id, channel_name)
  }
}
