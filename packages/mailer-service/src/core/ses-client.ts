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

  const sendPromise = await ses.sendEmail(params).promise()

  console.log('MessageId is', sendPromise)
  if (sendPromise) {
    return true
  }

  return false

  // sendPromise
  //   .then(function(data) {
  //     console.log(data.MessageId)
  //     return data
  //   })
  //   .catch(function(err) {
  //     console.error(err, err.stack)
  //   })

  // ses.sendEmail(params, (err, data) => {
  // if (err) {
  // return console.log(err, err.stack)
  // } else {
  // console.log('Email sent.', data)
  // }
  // })
}
