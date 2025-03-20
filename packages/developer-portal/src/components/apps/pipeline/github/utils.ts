import { ReapitConnectSession } from '@reapit/connect-session'

export type GithubCodeRequest = {
  code: string
  redirect_uri: string
}

export type GithubRefreshRequest = {
  redirect_uri: string
  refresh_token: string
}

export type GithubAuthorizationBody = GithubCodeRequest | GithubRefreshRequest

const githubClientId = process.env.githubClientId

export const authenticateWithGithub = async (data: GithubAuthorizationBody, connectSession: ReapitConnectSession) => {
  // TODO need to make the below domain an env
  const response = await fetch('https://deployments.dev.paas.reapit.cloud/github/auth', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
      'content-type': 'application/json',
    },
  })

  return response.json()
}

export const redirectToGithub = (redirect_uri: string, route?: string) => {
  // TODO verify state?
  const state = Buffer.from(JSON.stringify({ route })).toString('base64')
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&state=${state}`
}

const connectIsDesktop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])
export const storageMethod = connectIsDesktop ? window.localStorage : window.sessionStorage
