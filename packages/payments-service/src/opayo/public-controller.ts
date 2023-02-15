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
    const ip = opayoHeaders['x-forwarded-for']
    return await this.opayoProvider.createTransaction(opayoHeaders, transaction, ip)
  }

  @Post('/merchant-session-keys/:paymentId')
  async createMerchantKeys(@Headers() opayoHeaders: OpayoPublicHeaders): Promise<MerchantKey> {
    return await this.opayoProvider.createMerchantKeys(opayoHeaders)
  }
}
