import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DynamoDBModule } from '../dynamo'
import { PaymentRequestController } from './controller'
import { PaymentRequestProvider } from './provider'

@Module({
  imports: [DynamoDBModule.forFeature(), ConfigModule],
  providers: [PaymentRequestProvider],
  controllers: [PaymentRequestController],
  exports: [PaymentRequestProvider],
})
export class PaymentRequestModule {}
