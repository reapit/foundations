import { Headers, Controller, Post, Param, Body } from '@nestjs/common'
import { PaymentRequestDto, PaymentRequestHeaders, PaymentRequestParams } from './dto'
import { PaymentRequestProvider } from './provider'

@Controller('request')
export class PaymentRequestController {
  constructor(private readonly paymentRequestProvider: PaymentRequestProvider) {}

  @Post('/:paymentId')
  async createRequest(
    @Headers() paymentRequestHeaders: PaymentRequestHeaders,
    @Param() { paymentId }: PaymentRequestParams,
    @Body() paymentRequest: PaymentRequestDto,
  ): Promise<string> {
    return this.paymentRequestProvider.create(paymentRequestHeaders, paymentRequest, paymentId)
  }
}
