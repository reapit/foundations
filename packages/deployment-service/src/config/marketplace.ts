import { registerAs } from '@nestjs/config'

export default registerAs('marketplace', () => ({
  url: process.env.MARKETPLACE_URL,
  apiKey: process.env.MARKETPLACE_API_KEY,
}))
