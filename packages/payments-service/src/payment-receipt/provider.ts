import { Injectable } from '@nestjs/common'
import { currencySymbolMapper } from '@reapit/utils-common'
import { defaultEmailConfig, sendEmail } from '../core/ses-client'
import { PaymentReceiptDto, PaymentReceiptHeaders } from './dto'
import { paymentReceiptTemplate } from './template'

@Injectable()
export class PaymentReceiptProvider {
  async createReceipt(
    paymentReceiptHeaders: PaymentReceiptHeaders,
    paymentReceipt: PaymentReceiptDto,
  ): Promise<string> {
    const { receipientEmail, recipientName, paymentReason, paymentAmount, paymentCurrency } = paymentReceipt

    const clientCode = paymentReceiptHeaders['reapit-customer']
    console.log(clientCode)
    // TODO: Look these up from the client code
    const { senderEmail, companyName, logoUri } = defaultEmailConfig

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

    const mailId = await sendEmail(receipientEmail, title, template, senderEmail)

    return mailId
  }
}
