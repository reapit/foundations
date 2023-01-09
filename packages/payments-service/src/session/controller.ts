import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { SessionDto } from './dto'
import { SessionProvider } from './provider'
import { CredGuard } from '@reapit/utils-nest'
import { SessionModel } from './model'

@Controller('session')
@UseGuards(CredGuard)
export class SessionController {
  constructor(private readonly sessionProvider: SessionProvider) {}

  @Post('')
  async createSession(@Body() session: SessionDto): Promise<SessionModel> {
    return this.sessionProvider.create(session)
  }
}
