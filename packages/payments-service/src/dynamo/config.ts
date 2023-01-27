import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      region: process.env.DYNAMO_DB_REGION,
    }
  }

  return {
    region: process.env.DYNAMO_DB_REGION,
    endpoint: process.env.DYNAMO_DB_ENDPOINT,
  }
})
