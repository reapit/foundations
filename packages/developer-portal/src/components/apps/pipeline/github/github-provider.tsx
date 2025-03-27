import React, { PropsWithChildren } from 'react'
import { createContext, FC, useState } from 'react'
import { ReapitConnectSession } from '@reapit/connect-session'
import { NavigateFunction } from 'react-router'
import { authenticateWithGithub, redirectToGithub, storageMethod } from './utils'

export type GithubAccessToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

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

export const GithubProvider: FC<PropsWithChildren> = ({ children }) => {
  const [githubSession, setGithubSession] = useState<GithubAccessToken | undefined>()
  const [githubAuthenticating, setGithubAuthenticating] = useState<boolean>(false)

  const redirect_uri = window.location.origin + '/github'
  const sessionKey = 'githubSession'

  const storeTokenSession = (githubAuthState: GithubAccessToken) => {
    setGithubSession(githubAuthState)
    storageMethod.setItem(sessionKey, JSON.stringify(githubAuthState))
  }

  const getStoredSession = (): GithubAccessToken | undefined => {
    const stored = storageMethod.getItem(sessionKey)

    return stored ? JSON.parse(stored) : undefined
  }

  const returnedFromGithubAndObtainAccessToken = async (
    connectSession: ReapitConnectSession,
    navigate: NavigateFunction,
  ) => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    // TODO handle errors
    if (code) {
      setGithubAuthenticating(true)
      const response = await authenticateWithGithub(
        {
          code,
          redirect_uri,
        },
        connectSession,
      )
      const state = params.get('state')

      setGithubAuthenticating(false)

      if (typeof response === 'object' && response?.access_token) {
        storeTokenSession(response)

        if (state) {
          const decoded = atob(state)
          const data = JSON.parse(decoded.toString())

          data.route && navigate(data.route)
        }
      }
    }
  }

  const loginWithGithub = async (connectSession: ReapitConnectSession, route?: string) => {
    const storedToken = getStoredSession()

    if (!storedToken) {
      redirectToGithub(redirect_uri, route)
    } else if (storedToken) {
      // TODO add method to determine if the existing access_token has expired
      // add condition here to prevent calls for refresh_token if access_token is not expired
      setGithubAuthenticating(true)
      const response = await authenticateWithGithub(
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
        redirectToGithub(redirect_uri, route)
      }
    } else {
      redirectToGithub(redirect_uri, route)
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
