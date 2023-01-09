import { Module } from '@nestjs/common'
import { DynamoDBModule } from '../dynamo'
import { SessionController } from './controller'
import { SessionProvider } from './provider'

@Module({
  imports: [
    DynamoDBModule.forFeature(),
  ],
  providers: [SessionProvider],
  controllers: [SessionController],
  exports: [SessionProvider],
})
export class SessionModule {}
