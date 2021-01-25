import AWS from 'aws-sdk'

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendEmail = async (to: string, subject: string, template: string, from: string) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: template,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    ReturnPath: from,
    Source: from,
  }

  const sentMail = await ses.sendEmail(params).promise()

  if (sentMail) {
    return sentMail.MessageId
  }

  throw new Error('Email failed to send')
}
