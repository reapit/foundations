import { registerAs } from '@nestjs/config'

export default registerAs('marketplace', () => ({
  url: process.env.MARKETPLACE_URL,
  connectUrl: process.env.CONNECT_URL as string,
  connectClientId: process.env.CONNECT_CLIENT_ID as string,
  connectClientSecret: process.env.CONNECT_CLIENT_SECRET as string,
}))
