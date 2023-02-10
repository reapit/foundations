import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DynamoDBModule } from '../dynamo'
import { OpayoPrivateController } from './private-controller'
import { OpayoPublicController } from './public-controller'
import { OpayoProvider } from './provider'

@Module({
  imports: [DynamoDBModule.forFeature(), ConfigModule],
  providers: [OpayoProvider],
  controllers: [OpayoPrivateController, OpayoPublicController],
  exports: [OpayoProvider],
})
export class OpayoModule {}
