import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, Injectable } from '@nestjs/common'
import { currencySymbolMapper } from '@reapit/utils-common'
import { ClientConfigModel } from '../client-config/model'
import { sendEmail } from '../core/ses-client'
import { PaymentReceiptDto, PaymentReceiptHeaders } from './dto'
import { paymentReceiptTemplate } from './template'

@Injectable()
export class PaymentReceiptProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async createReceipt(
    paymentReceiptHeaders: PaymentReceiptHeaders,
    paymentReceipt: PaymentReceiptDto,
  ): Promise<string> {
    const { receipientEmail, recipientName, paymentReason, paymentAmount, paymentCurrency } = paymentReceipt

    const clientCode = paymentReceiptHeaders['reapit-customer']

    let configModel: ClientConfigModel

    try {
      configModel = await this.datamapper.get(Object.assign(new ClientConfigModel(), { clientCode }))
    } catch (err) {
      throw new BadRequestException('Config model for email not found')
    }

    const { companyName, logoUri } = configModel

    const template = paymentReceiptTemplate({
      companyName,
      logoUri,
      paymentCurrency: currencySymbolMapper(paymentCurrency),
      paymentReason,
      recipientName,
      paymentDate: new Date().toDateString(),
      paymentAmount: `${paymentAmount.toFixed(2)}`,
    })
    const title = `Payment Receipt from ${companyName}`

    return sendEmail(receipientEmail, title, template)
  }
}
