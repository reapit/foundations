import { App } from '@octokit/app'

const githubAppId = parseInt(process.env.GITHUB_APP_ID || '')
const githubPem = process.env.GITHUB_PEM as string

export const githubApp = new App({ appId: githubAppId, privateKey: githubPem })
