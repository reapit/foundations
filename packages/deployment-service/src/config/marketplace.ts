import { registerAs } from '@nestjs/config'

export default registerAs('marketplace', () => ({
  url: process.env.MARKETPLACE_URL,
  auth0Url: process.env.AUTH0_URL,
  auth0ClientId: process.env.AUTH0_CLIENT_ID,
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
}))
