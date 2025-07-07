import { registerAs } from '@nestjs/config'

export default registerAs('github', () => ({
  appId: parseInt(process.env.GITHUB_APP_ID || ''),
  privateKey: process.env.GITHUB_PEM as string,
  webhooks: {
    secret: process.env.GITHUB_SECRET as string,
  },
  PAT: process.env.DEVOPS_DEPLOYER_PAT as string,
}))
