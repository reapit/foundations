import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, Injectable } from '@nestjs/common'
import { currencySymbolMapper } from '@reapit/utils-common'
import { ClientConfigModel } from '../client-config/model'
import { sendEmail } from '../core/ses-client'
import { PaymentRequestDto, PaymentRequestHeaders } from './dto'
import { paymentRequestTemplate } from './template'

@Injectable()
export class PaymentRequestProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async create(
    paymentRequestHeaders: PaymentRequestHeaders,
    paymentRequest: PaymentRequestDto,
    paymentId: string,
  ): Promise<string> {
    const { receipientEmail, recipientName, paymentReason, paymentAmount, paymentCurrency, paymentExpiry } =
      paymentRequest
    const session = paymentRequestHeaders['reapit-session']
    const clientCode = paymentRequestHeaders['reapit-customer']
    const baseUrl = process.env.PAYMENTS_PORTAL_URI

    let configModel: ClientConfigModel

    try {
      configModel = await this.datamapper.get(Object.assign(new ClientConfigModel(), { clientCode }))
    } catch (err) {
      throw new BadRequestException('Config model for email not found')
    }

    const { companyName, logoUri } = configModel

    const template = paymentRequestTemplate({
      companyName,
      logoUri,
      paymentReason,
      paymentCurrency: currencySymbolMapper(paymentCurrency),
      url: `${baseUrl}/payments/${paymentId}?session=${session}&clientCode=${clientCode}`,
      recipientName,
      paymentExpiry: new Date(paymentExpiry).toDateString(),
      paymentAmount: `${paymentAmount.toFixed(2)}`,
    })
    const title = `Payment Request from ${companyName}`

    return await sendEmail(receipientEmail, title, template)
  }
}
