import { Headers, Controller, Post, Body, UseGuards } from '@nestjs/common'
import { SessionGuard } from '../session/session-guard'
import { PaymentReceiptDto, PaymentReceiptHeaders } from './dto'
import { PaymentReceiptProvider } from './provider'

@Controller('receipt/private')
export class PaymentReceiptPrivateController {
  constructor(private readonly paymentReceiptProvider: PaymentReceiptProvider) {}

  @Post('/:paymentId')
  async createReceiptPrivate(
    @Headers() paymentReceiptHeaders: PaymentReceiptHeaders,
    @Body() paymentReceipt: PaymentReceiptDto,
  ): Promise<void> {
    this.paymentReceiptProvider.createReceipt(paymentReceiptHeaders, paymentReceipt)
  }
}

@Controller('receipt/public')
@UseGuards(SessionGuard)
export class PaymentReceiptPublicController {
  constructor(private readonly paymentReceiptProvider: PaymentReceiptProvider) {}

  @Post('/:paymentId')
  async createReceiptPublic(
    @Headers() paymentReceiptHeaders: PaymentReceiptHeaders,
    @Body() paymentReceipt: PaymentReceiptDto,
  ): Promise<void> {
    this.paymentReceiptProvider.createReceipt(paymentReceiptHeaders, paymentReceipt)
  }
}
