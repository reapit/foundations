import { getSecretValue } from '../utils/get-secret-value'
import { App } from '@octokit/app'

const githubAppId = parseInt(process.env.GITHUB_APP_ID || '')
const githubPemSecretArn = process.env.GITHUB_PEM_SECRET_ARN as string
const githubSecret = process.env.GITHUB_SECRET as string

export const githubApp = async () => {
  const githubPem = await getSecretValue(githubPemSecretArn)

  return new App({
    appId: githubAppId,
    privateKey: githubPem,
    webhooks: {
      secret: githubSecret,
    },
  })
}
