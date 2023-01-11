export interface PaymentReceiptTemplateParams {
  paymentReason: string
  recipientName: string
  paymentAmount: string
  paymentCurrency: string
  companyName: string
  logoUri: string
  paymentDate: string
}

export const paymentReceiptTemplate = ({
  logoUri,
  companyName,
  recipientName,
  paymentCurrency,
  paymentAmount,
  paymentReason,
  paymentDate,
}: PaymentReceiptTemplateParams) => `
  <div style="background-color:#f5f7f9; padding: 24px;">
    <article style="font-family: Helvetica, Arial, sans-serif;margin:0px auto;background-color:white;line-height: 1.5rem; max-width: 950px;">
      <img style="width: 25%; margin: 0 auto; padding: 16px; display: block;" src=${logoUri} />
      <h1 style="text-align: center;font-size: 24px; font-style: normal; padding:0 16px 24px 16px;">Payment Confirmation from ${companyName} </h1>
      <div style="padding:0 16px 16px 16px;">
        <p>Dear ${recipientName},</p>
        <p>This is a confirmation of your payment of ${paymentCurrency}${paymentAmount}, on ${paymentDate}, requested by ${companyName} for the below reason:</p>
        <p><b>${paymentReason}</b></p>
        <p>${companyName}'s records have been updated accordingly.</p>
        <p>Best regards,</p>
        <p>${companyName}</p>
      </div>
    </article>
  </div>
`
