import { Headers, Controller, Post, Body } from '@nestjs/common'
import { PaymentReceiptDto, PaymentReceiptHeaders } from './dto'
import { PaymentReceiptProvider } from './provider'

@Controller('receipt/private')
export class PaymentReceiptPrivateController {
  constructor(private readonly paymentReceiptProvider: PaymentReceiptProvider) {}

  @Post('/:paymentId')
  async createReceiptPrivate(
    @Headers() paymentReceiptHeaders: PaymentReceiptHeaders,
    @Body() paymentReceipt: PaymentReceiptDto,
  ): Promise<string> {
    return this.paymentReceiptProvider.createReceipt(paymentReceiptHeaders, paymentReceipt)
  }
}
