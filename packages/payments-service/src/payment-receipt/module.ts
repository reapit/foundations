import { Module } from '@nestjs/common'
import { PaymentReceiptPrivateController } from './private-controller'
import { PaymentReceiptPublicController } from './public-controller'
import { PaymentReceiptProvider } from './provider'
import { DynamoDBModule } from '../dynamo'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [DynamoDBModule.forFeature(), ConfigModule],
  providers: [PaymentReceiptProvider],
  controllers: [PaymentReceiptPrivateController, PaymentReceiptPublicController],
  exports: [PaymentReceiptProvider],
})
export class PaymentReceiptModule {}
