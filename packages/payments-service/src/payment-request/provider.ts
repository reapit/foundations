import { DataMapper } from '@aws/dynamodb-data-mapper'
import { Injectable } from '@nestjs/common'
import { currencySymbolMapper } from '@reapit/utils-common'
import { defaultEmailConfig, sendEmail } from '../core/ses-client'
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
    const { senderEmail, companyName, logoUri } = defaultEmailConfig
    const { receipientEmail, recipientName, paymentReason, paymentAmount, paymentCurrency, paymentExpiry } =
      paymentRequest
    const session = paymentRequestHeaders['reapit-session']
    const clientCode = paymentRequestHeaders['reapit-customer']
    const baseUrl = session ? process.env.PAYMENTS_PORTAL_URI : process.env.PAYMENTS_APP_URI

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

    const mailId = await sendEmail(receipientEmail, title, template, senderEmail)

    return mailId
  }
}
