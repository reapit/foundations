const AWS = require('aws-sdk')
const TABLE_NAME = 'payments-poc-developement'

AWS.config.update({
  region: 'eu-west-2',
  profile: 'dev'
})

if (process.env.APP_ENV === 'local') {
  AWS.config.update({
    profile: 'dev'
  })
}  

const docClient = new AWS.DynamoDB.DocumentClient()

export const createAccountHander = (account) => {
  try {
    console.log('Accound is', account)
    const itemToSave = {
      TableName: TABLE_NAME,
      Item: account,
    }
    return new Promise((resolve, reject) => {
      docClient.put(itemToSave, function (err, data) {
        if (err) {
          console.error(
            'Unable to add item. Error JSON:',
            JSON.stringify(err, null, 2)
          )
          reject()
        } else {
          console.log('Added item:', JSON.stringify(data, null, 2))
          resolve()
        }
      })
    })
  } catch (err) {
    console.log('Create Account Error', err.message)
  }
}

export const getAccountHandler = (customerId: string) => {
  try {
    const itemToGet = {
      TableName: TABLE_NAME,
      Key: {
        customerId,
      },
    }
    console.log(itemToGet)
    return new Promise((resolve, reject) => {
      docClient.get(itemToGet, function (err, data) {
        if (err) {
          console.error(
            'Unable to get item. Error JSON:',
            JSON.stringify(err, null, 2)
          )
          reject()
        } else {
          console.log('Got item:', JSON.stringify(data, null, 2))
          resolve(data.Item)
        }
      })
    })
  } catch (error) {
    console.log('Get Account error', error.message)
  }
}

