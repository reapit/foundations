import AWS from 'aws-sdk'

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendEmail = (to: string, subject: string, body: string, message: string, from?: string) => {
  console.log(from)
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    ReturnPath: 'wmcvay@reapit.com',
    Source: 'wmcvay@reapit.com',
    // ReturnPath: from ? from : process.env.CLIENTS['SBOX']['PAYMENT_REQUEST']['FROM'],
    // Source: from ? from : process.env.CLIENTS['SBOX']['PAYMENT_REQUEST']['FROM'],
  }

  const sendPromise = ses.sendEmail(params).promise()

  sendPromise
    .then(function(data) {
      console.log(data.MessageId)
    })
    .catch(function(err) {
      console.error(err, err.stack)
    })

  // ses.sendEmail(params, (err, data) => {
  // if (err) {
  // return console.log(err, err.stack)
  // } else {
  // console.log('Email sent.', data)
  // }
  // })
}
