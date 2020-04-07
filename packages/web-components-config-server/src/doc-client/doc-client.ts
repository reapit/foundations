import AWS from 'aws-sdk'

AWS.config.update({
  region: 'eu-west-2',
})

const docClient = new AWS.DynamoDB.DocumentClient()

export default docClient
