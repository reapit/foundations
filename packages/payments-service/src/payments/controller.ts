import { Headers, Controller, Get, Body, UseGuards, Patch, Param } from '@nestjs/common'
import { SessionGuard } from '../session/session-guard'
import { PaymentsDto, PaymentsHeaders } from './dto'
import { PaymentsProvider } from './provider'

@Controller('payments')
@UseGuards(SessionGuard)
export class PaymentsController {
  constructor(private readonly paymentsProvider: PaymentsProvider) {}

  @Get('/:paymentId')
  async getPayment(@Headers() paymentsHeaders: PaymentsHeaders, @Param() paymentId: string): Promise<void> {
    this.paymentsProvider.getPayment(paymentsHeaders, paymentId)
  }

  @Patch('/:paymentId')
  async patchPayment(
    @Headers() paymentsHeaders: PaymentsHeaders,
    @Body() paymentPatch: PaymentsDto,
    @Param() paymentId: string,
  ): Promise<void> {
    this.paymentsProvider.patchPayment(paymentsHeaders, paymentPatch, paymentId)
  }
}
