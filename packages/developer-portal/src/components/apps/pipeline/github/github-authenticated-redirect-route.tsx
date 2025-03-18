import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { GithubAccessToken, GithubContext } from './github-provider'
import { UpdateActionNames, updateActions, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { Loader } from '@reapit/elements'
import { Buffer } from 'buffer'
import { useNavigate } from 'react-router'

export const GithubAuthenticatedRedirectRoute: FC = () => {
  const { setGithubAccessToken, redirect_uri } = useContext(GithubContext)
  const [loading, setLoading] = useState<boolean>(false)
  const params = new URLSearchParams(window.location.search)
  const navigate = useNavigate()
  const code = params.get('code')
  const state = params.get('state')

  const [, , authenticate] = useReapitUpdate<{ code: string; redirect_uri: string }, GithubAccessToken>({
    action: updateActions[UpdateActionNames.githubAuthenticate],
    reapitConnectBrowserSession,
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const singletonRef = useRef<any>()

  const fetchGithubToken = async () => {
    if (code) {
      singletonRef.current = true
      setLoading(true)
      const response = await authenticate({
        code,
        redirect_uri,
      })
      // TODO store token in local storage
      console.log('token', response)

      setLoading(false)

      if (typeof response === 'object' && response?.access_token) {
        setGithubAccessToken(response)

        if (state) {
          const decoded = Buffer.from(state, 'base64')
          console.log('decoded', decoded, decoded.toString())
          const data = JSON.parse(decoded.toString())

          console.log('data', data)
          data.route && navigate(data.route)
        }
      }
    }
  }

  useEffect(() => {
    if (!singletonRef.current) fetchGithubToken()
  }, [singletonRef])

  console.log('loading', loading)

  return (
    <>
      Github redirect
      {!code && <p>No code Provided</p>}
      {loading && <Loader />}
    </>
  )
}
