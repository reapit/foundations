export interface PaymentRequestTemplateParams {
  paymentReason: string
  url: string
  recipientName: string
  paymentExpiry: string
  paymentAmount: string
  paymentCurrency: string
  companyName: string
  logoUri: string
}

export const paymentRequestTemplate = ({
  logoUri,
  companyName,
  recipientName,
  paymentCurrency,
  paymentAmount,
  paymentReason,
  paymentExpiry,
  url,
}: PaymentRequestTemplateParams) => `
  <div style="background-color:#f5f7f9; padding: 24px;">
    <article style="font-family: Helvetica, Arial, sans-serif;margin:0px auto;background-color:white;line-height: 1.5rem; max-width: 950px;">
      <img style="width: 33%; margin: 0 auto; padding: 16px; display: block;" src=${logoUri} />
      <h1 style="text-align: center;font-size: 24px; font-style: normal; padding:0 16px 24px 16px;">Payment Request from ${companyName} </h1>
      <div style="padding:0 16px 16px 16px;">
        <p>Dear ${recipientName},</p>
        <p>You have been requested to make a payment of ${paymentCurrency}${paymentAmount}, by ${companyName} for the below reason:</p>
        <p><b>${paymentReason}</b></p>
        <p><a href=${url}>Click here</a> to make this payment. You will be redirected to our payment provider Reapit Ltd. Reapit Payments are powered by Opayo (Sage Pay) for your convenience and security.</p>
        <p>This payment request is valid until ${paymentExpiry}. On completion of the payment, ${companyName}'s records will be updated accordingly.</p>
        <p>Best regards,</p>
        <p>${companyName}</p>
      </div>
    </article>
  </div>
`
