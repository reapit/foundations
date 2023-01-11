import { Body, Controller, Post } from '@nestjs/common'
import { SessionDto } from './dto'
import { SessionProvider } from './provider'
import { SessionModel } from './model'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionProvider: SessionProvider) {}

  @Post('')
  async createSession(@Body() session: SessionDto): Promise<SessionModel> {
    return this.sessionProvider.create(session)
  }
}
