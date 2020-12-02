import AWS from 'aws-sdk'
import config from './config'

AWS.config.update({
  accessKeyId: config.aws.key,
  secretAccessKey: config.aws.secret,
  region: config.aws.ses.region,
})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendEmail = (to, subject, message, from) => {
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
    ReturnPath: from ? from : config.aws.ses.from.default,
    Source: from ? from : config.aws.ses.from.default,
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
