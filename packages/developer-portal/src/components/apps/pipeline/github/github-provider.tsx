import React, { PropsWithChildren } from 'react'
import { createContext, FC, useState } from 'react'
import { Buffer } from 'buffer'
import { ReapitConnectSession } from '@reapit/connect-session'
import { NavigateFunction } from 'react-router'

export type GithubAccessToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

export type GithubCodeRequest = {
  code: string
  redirect_uri: string
}

export type GithubRefreshRequest = {
  redirect_uri: string
  refresh_token: string
}

export type GithubAuthorizationBody = GithubCodeRequest | GithubRefreshRequest

export const GithubContext = createContext<{
  loginWithGithub: (connectSession: ReapitConnectSession, route?: string) => void
  redirect_uri: string
  githubAuthenticating: boolean
  authenticatedWithGithub: boolean
  returnedFromGithubAndObtainAccessToken: (connectSession: ReapitConnectSession, navigate: NavigateFunction) => void
  githubSession?: GithubAccessToken
}>({
  authenticatedWithGithub: false,
  loginWithGithub: () => {
    console.log('default login with github function')
  },
  redirect_uri: '',
  githubAuthenticating: false,
  returnedFromGithubAndObtainAccessToken: () => {},
})

const connectIsDesktop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])

export const GithubProvider: FC<PropsWithChildren> = ({ children }) => {
  const [githubSession, setGithubSession] = useState<GithubAccessToken | undefined>()
  const [githubAuthenticating, setGithubAuthenticating] = useState<boolean>(false)

  const githubClientId = process.env.githubClientId
  const storageMethod = connectIsDesktop ? window.localStorage : window.sessionStorage
  const redirect_uri = window.location.origin + '/github'
  const sessionKey = 'githubSession'

  const authenticate = async (data: GithubAuthorizationBody, connectSession: ReapitConnectSession) => {
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

  const storeTokenSession = (githubAuthState: GithubAccessToken) => {
    setGithubSession(githubAuthState)
    storageMethod.setItem(sessionKey, JSON.stringify(githubAuthState))
  }

  const getStoredSession = (): GithubAccessToken | undefined => {
    const stored = storageMethod.getItem(sessionKey)

    return stored ? JSON.parse(stored) : undefined
  }

  const redirectToGithub = (route?: string) => {
    const state = Buffer.from(JSON.stringify({ route })).toString('base64')
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&state=${state}`
  }

  const returnedFromGithubAndObtainAccessToken = async (
    connectSession: ReapitConnectSession,
    navigate: NavigateFunction,
  ) => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      setGithubAuthenticating(true)
      const response = await authenticate(
        {
          code,
          redirect_uri,
        },
        connectSession,
      )
      const state = params.get('state')

      setGithubAuthenticating(false)
      console.log('response', response)

      if (typeof response === 'object' && response?.access_token) {
        storeTokenSession(response)

        if (state) {
          const decoded = Buffer.from(state, 'base64')
          const data = JSON.parse(decoded.toString())

          console.log('navigate to ', data)
          data.route && navigate(data.route)
        }
      }
    }
  }

  const loginWithGithub = async (connectSession: ReapitConnectSession, route?: string) => {
    const storedToken = getStoredSession()

    if (!storedToken) {
      redirectToGithub(route)
    } else if (storedToken) {
      setGithubAuthenticating(true)
      const response = await authenticate(
        {
          refresh_token: storedToken.refresh_token,
          redirect_uri,
        },
        connectSession,
      )
      setGithubAuthenticating(false)
      if (typeof response === 'object' && response?.access_token) {
        storeTokenSession(response)
      } else {
        redirectToGithub(route)
      }
    } else {
      redirectToGithub(route)
    }
  }

  return (
    <GithubContext.Provider
      value={{
        authenticatedWithGithub: !!githubSession,
        redirect_uri,
        githubAuthenticating,
        loginWithGithub,
        returnedFromGithubAndObtainAccessToken,
        githubSession,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
