import { Module } from '@nestjs/common'
import { PaymentReceiptPrivateController } from './private-controller'
import { PaymentReceiptPublicController } from './public-controller'
import { PaymentReceiptProvider } from './provider'

@Module({
  providers: [PaymentReceiptProvider],
  controllers: [PaymentReceiptPrivateController, PaymentReceiptPublicController],
  exports: [PaymentReceiptProvider],
})
export class PaymentReceiptModule {}
