import { Module } from '@nestjs/common'
import { SessionController } from './controller'
import { SessionProvider } from './provider'

@Module({
  providers: [SessionProvider],
  controllers: [SessionController],
  exports: [SessionProvider],
})
export class SessionModule {}
