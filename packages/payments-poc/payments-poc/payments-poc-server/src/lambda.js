const serverless = require('serverless-http')
const app = require('./index')

const handler = serverless(app)

export const lambda = async (event, context) => {
  const result = await handler(event, context)
  return result
}