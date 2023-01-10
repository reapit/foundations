import { Module } from '@nestjs/common'
import { PaymentReceiptPrivateController, PaymentReceiptPublicController } from './controller'
import { PaymentReceiptProvider } from './provider'

@Module({
  providers: [PaymentReceiptProvider],
  controllers: [PaymentReceiptPrivateController, PaymentReceiptPublicController],
  exports: [PaymentReceiptProvider],
})
export class PaymentReceiptModule {}
