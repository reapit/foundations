import { BadRequestException } from '@nestjs/common'
import AWS from 'aws-sdk'

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendEmail = async (to: string, subject: string, template: string) => {
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
    ReturnPath: process.env.EMAIL_SENDER_ADDRESS,
    Source: process.env.EMAIL_SENDER_ADDRESS,
  }

  const sentMail = await ses.sendEmail(params).promise()

  if (sentMail) {
    return sentMail.MessageId
  }

  throw new BadRequestException('Email failed to send')
}
