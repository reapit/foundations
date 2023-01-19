import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DynamoDBModule } from '../dynamo'
import { ClientConfigPrivateController } from './private-controller'
import { ClientConfigProvider } from './provider'
import { ClientConfigPublicController } from './public-controller'

@Module({
  imports: [DynamoDBModule.forFeature(), ConfigModule],
  providers: [ClientConfigProvider],
  controllers: [ClientConfigPrivateController, ClientConfigPublicController],
  exports: [ClientConfigProvider],
})
export class ClientConfigModule {}
