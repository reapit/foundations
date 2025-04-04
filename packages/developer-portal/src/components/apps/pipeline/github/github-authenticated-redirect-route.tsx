import React, { FC, useContext, useEffect, useRef } from 'react'
import { GithubContext } from './github-provider'
import { BodyText, Button, FlexContainer, Loader, PageContainer, Title } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useNavigate } from 'react-router'

const resolveStateData = (state?: string | null): undefined | { route?: string } => {
  if (state) {
    const decoded = atob(state)
    const data = JSON.parse(decoded.toString())

    return data
  }
}

export const GithubAuthenticatedRedirectRoute: FC = () => {
  const { returnedFromGithubAndObtainAccessToken, githubAuthenticating } = useContext(GithubContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)

  const singletonRef = useRef<any>()

  useEffect(() => {
    if (!singletonRef.current && connectSession) {
      singletonRef.current = true
      returnedFromGithubAndObtainAccessToken(connectSession, navigate)
    }
  }, [singletonRef, connectSession])

  const errorTitle = params.get('error')
  const errorDescription = params.get('error_description')
  const state = params.get('state')

  const stateData = resolveStateData(state)

  return (
    <PageContainer>
      {githubAuthenticating && (
        <FlexContainer isFlexAlignCenter>
          <Loader />
          <BodyText hasGreyText>Authenticating with Github...</BodyText>
        </FlexContainer>
      )}
      {errorTitle && (
        <FlexContainer isFlexColumn isFlexAlignCenter>
          <Title>{errorTitle.split('_').join(' ')}</Title>
          <BodyText hasGreyText>{errorDescription}</BodyText>
          <BodyText>If this error is consistent. Please seek an administator.</BodyText>
          {stateData?.route && <Button onClick={() => stateData?.route && navigate(stateData.route)}>Go Back</Button>}
        </FlexContainer>
      )}
    </PageContainer>
  )
}
