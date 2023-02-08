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
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
    </head>
    <body style="font-family: 'PT Sans', Helvetica, Arial, sans-serif">
      <div style="background-color: #fff; padding: 32px">
        <div style="margin-bottom: 40px; width: 100%; font-size: 0">
          <img
            style="width: 33%; margin-right: 16.5%; display: inline-block"
            src="https://web-components.prod.paas.reapit.cloud/reapit-payments.png"
            alt="Reapit Payments Logo"
          />
          <img style="width: 33%; margin-left: 16.5%; display: inline-block" src="${logoUri}" alt="Agent Logo" />
        </div>
        <article style="margin: 0px auto; line-height: 1.5rem; max-width: 950px">
          <h1 style="text-align: center; font-size: 24px; font-style: normal; margin-bottom: 40px">
            Payment Confirmation on behalf of ${companyName}
          </h1>
          <div style="color: #646464">
            <p style="margin-bottom: 32px"> Dear ${recipientName},</p>
            <p>
              This is a confirmation of receipt of your payment of ${paymentCurrency}${paymentAmount}, on ${paymentDate},
              requested by ${companyName} for the below reason:
            </p>
            <p><b>${paymentReason}</b></p>
            <p style="margin-bottom: 32px">${companyName}'s records have been updated accordingly.</p>
            <p style="margin-bottom: 32px">Best regards,</p>
            <p>Reapit Payments Team on behalf of ${companyName}</p>
          </div>
        </article>
      </div>
    </body>
  </html>
`
