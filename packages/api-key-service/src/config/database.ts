import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  console.log('database', {
    region: process.env.DYNAMO_DB_REGION || '',
    endpoint: process.env.DYNAMO_DB_ENDPOINT,
  })
  return {
    region: process.env.DYNAMO_DB_REGION || '',
    endpoint: process.env.DYNAMO_DB_ENDPOINT,
  }
})
