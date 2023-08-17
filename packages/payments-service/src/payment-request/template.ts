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
        <article style="margin: 0px auto; line-height: 1.5rem; max-width: 950px">
          <div style="margin-bottom: 40px; width: 100%">
            <div style="height: 100px; text-align: center">
              <img style="height: 100%" src="${logoUri}" alt="Agent Logo" />
            </div>
          </div>
          <h1 style="text-align: center; font-size: 24px; font-style: normal; margin-bottom: 40px">
            Payment Request on behalf of ${companyName}
          </h1>
          <div style="color: #646464">
            <p style="margin-bottom: 32px">Dear ${recipientName},</p>
            <p>
              You have been requested to make a payment of ${paymentCurrency}${paymentAmount}, by ${companyName} for the
              below reason:
            </p>
            <p><b>${paymentReason}</b></p>
            <p>
              <b><a style="color: #0061a8" href="${url}">Click here</a></b> to make this payment. You will be redirected
              to our payment provider Reapit Ltd. Reapit Payments are powered by Opayo (Sage Pay) for your convenience and
              security. <b>We only accept UK Debit Cards.</b>
            </p>
            <p style="margin-bottom: 32px">
              <b>This payment request is valid until ${paymentExpiry}.</b> On completion of the payment, ${companyName}'s
              records will be updated accordingly.
            </p>
            <p style="margin-bottom: 32px">Best regards,</p>
            <p style="margin-bottom: 32px">Reapit Payments Team on behalf of ${companyName}</p>
            <div style="height: 40px; overflow: hidden">
              <img
                style="height: 100%"
                src="https://web-components.prod.paas.reapit.cloud/reapit-payments.png"
                alt="Reapit Payments Logo"
              />
            </div>
          </div>
        </article>
      </div>
    </body>
  </html>
`
