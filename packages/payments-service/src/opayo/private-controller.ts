import { Headers, Controller, Body, Post } from '@nestjs/common'
import { MerchantKey, Transaction } from '../types/opayo'
import { TransactionDto, OpayoPrivateHeaders } from './dto'
import { OpayoProvider } from './provider'

@Controller('opayo/private')
export class OpayoPrivateController {
  constructor(private readonly opayoProvider: OpayoProvider) {}

  @Post('/transactions')
  async createTransaction(
    @Headers() opayoHeaders: OpayoPrivateHeaders,
    @Body() transaction: TransactionDto,
  ): Promise<Transaction> {
    return this.opayoProvider.createTransaction(opayoHeaders, transaction)
  }

  @Post('/merchant-session-keys')
  async createMerchantKeys(@Headers() opayoHeaders: OpayoPrivateHeaders): Promise<MerchantKey> {
    return this.opayoProvider.createMerchantKeys(opayoHeaders)
  }
}
