import { Headers, Controller, Body, Post, UseGuards } from '@nestjs/common'
import { SessionGuard } from '../session/session-guard'
import { MerchantKey, Transaction } from '../types/opayo'
import { TransactionDto, OpayoPublicHeaders } from './dto'
import { OpayoProvider } from './provider'

@Controller('opayo/public')
@UseGuards(SessionGuard)
export class OpayoPublicController {
  constructor(private readonly opayoProvider: OpayoProvider) {}

  @Post('/transactions/:paymentId')
  async createTransaction(
    @Headers() opayoHeaders: OpayoPublicHeaders,
    @Body() transaction: TransactionDto,
  ): Promise<Transaction> {
    return this.opayoProvider.createTransaction(opayoHeaders, transaction)
  }

  @Post('/merchant-session-keys/:paymentId')
  async createMerchantKeys(@Headers() opayoHeaders: OpayoPublicHeaders): Promise<MerchantKey> {
    return this.opayoProvider.createMerchantKeys(opayoHeaders)
  }
}
