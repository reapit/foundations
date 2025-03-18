import React, { Dispatch, PropsWithChildren } from 'react'
import { createContext, FC, useState } from 'react'
import { Buffer } from 'buffer'

export type GithubAccessToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

export const GithubContext = createContext<{
  setGithubAccessToken: Dispatch<GithubAccessToken>
  githubAccessToken?: GithubAccessToken
  loginWithGithub: (route?: string) => void
  redirect_uri: string
  state: any
}>({
  setGithubAccessToken: () => {},
  loginWithGithub: () => {},
  redirect_uri: '',
  state: undefined,
})

export const GithubProvider: FC<PropsWithChildren> = ({ children }) => {
  const [githubAccessToken, setGithubAccessToken] = useState<GithubAccessToken | undefined>()
  const [state, setState] = useState<any>()
  const githubClientId = process.env.githubClientId

  const redirect_uri = window.location.origin + '/github'

  const loginWithGithub = (route?: string) => {
    // TODO add the route as a state for redirecting to
    // TODO include a value to compare against when state is returned
    setState({ route })

    console.log('state', state)
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&state=${Buffer.from(JSON.stringify(state)).toString('base64')}`
  }

  return (
    <GithubContext.Provider value={{ githubAccessToken, setGithubAccessToken, loginWithGithub, redirect_uri, state }}>
      {children}
    </GithubContext.Provider>
  )
}
