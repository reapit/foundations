import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DynamoDBModule } from '../dynamo'
import { SessionController } from './controller'
import { SessionProvider } from './provider'

@Module({
  imports: [DynamoDBModule.forFeature(), ConfigModule],
  providers: [SessionProvider],
  controllers: [SessionController],
  exports: [SessionProvider],
})
export class SessionModule {}
