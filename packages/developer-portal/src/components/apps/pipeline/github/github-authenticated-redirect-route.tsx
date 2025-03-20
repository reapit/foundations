import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { GithubContext } from './github-provider'
import { Loader } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useNavigate } from 'react-router'

export const GithubAuthenticatedRedirectRoute: FC = () => {
  const { returnedFromGithubAndObtainAccessToken, githubAuthenticating } = useContext(GithubContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()

  const singletonRef = useRef<any>()

  useEffect(() => {
    if (!singletonRef.current && connectSession) {
      singletonRef.current = true
      returnedFromGithubAndObtainAccessToken(connectSession, navigate)
    }
  }, [singletonRef, connectSession])

  return (
    <>
      Github redirect
      {githubAuthenticating && <Loader />}
    </>
  )
}
