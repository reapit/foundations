import awsServerlessExpress from 'aws-serverless-express'

const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.webComponentsConfigServer = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}
