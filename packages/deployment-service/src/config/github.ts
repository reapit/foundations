import { registerAs } from '@nestjs/config'


console.log('appid', process.env.GITHUB_APP_ID)
export default registerAs('github', () => ({
  appId: parseInt(process.env.GITHUB_APP_ID || ''),
  privateKey: process.env.GITHUB_PEM as string,
  webhooks: {
    secret: process.env.GITHUB_SECRET as string,
  },
}))
