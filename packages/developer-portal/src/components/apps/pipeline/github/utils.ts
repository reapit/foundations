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
  const response = await fetch(`${process.env.DEPLOYMENT_SERVICE_HOST}/github/auth`, {
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
  const state = btoa(JSON.stringify({ route }))
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&state=${state}`
}

const connectIsDesktop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])
export const storageMethod = connectIsDesktop ? window.localStorage : window.sessionStorage
