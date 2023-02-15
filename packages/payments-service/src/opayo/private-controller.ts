import { Headers, Controller, Body, Post } from '@nestjs/common'
import { MerchantKey, Transaction } from '../types/opayo'
import { TransactionDto, OpayoPrivateHeaders, Opayo3DSecureDto } from './dto'
import { OpayoProvider } from './provider'

@Controller('opayo/private')
export class OpayoPrivateController {
  constructor(private readonly opayoProvider: OpayoProvider) {}

  @Post('/transactions')
  async createTransaction(
    @Headers() opayoHeaders: OpayoPrivateHeaders,
    @Body() transaction: TransactionDto,
  ): Promise<Transaction | string> {
    const ip = opayoHeaders['x-forwarded-for']
    return await this.opayoProvider.createTransaction(opayoHeaders, transaction, ip)
  }

  @Post('/merchant-session-keys')
  async createMerchantKeys(@Headers() opayoHeaders: OpayoPrivateHeaders): Promise<MerchantKey> {
    return await this.opayoProvider.createMerchantKeys(opayoHeaders)
  }

  @Post('/notification')
  async transactionNotification(@Body() body: Opayo3DSecureDto): Promise<string> {
    return await this.opayoProvider.transactionNotify(body)
  }
}
