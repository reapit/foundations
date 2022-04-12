import { Body, Controller } from '@nestjs/common'
import { PusherProvider } from './pusher-provider'

@Controller('pusher')
export class PusherWebhookController {
  constructor(private readonly pusherProvider: PusherProvider) {}

  async auth(@Body() body) {
    const { socket_id, channel_name } = body

    // TODO resolve creds

    return this.pusherProvider.authenticate(socket_id, channel_name)
  }
}
