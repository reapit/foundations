import { registerAs } from '@nestjs/config'

export default registerAs('gitub-auth', () => ({
  client_id: process.env.GITHUB_CLIENT_ID as string,
  client_secert: process.env.GITHUB_CLIENT_SECRET as string,
  github_url: process.env.GITHUB_URL,
}))
