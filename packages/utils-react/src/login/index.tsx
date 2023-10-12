import React, { FC, useCallback } from 'react'
import { Button, ButtonGroup, Subtitle, FlexContainer, Icon, elMb7, BodyText } from '@reapit/elements'
import { LoginContainer, LoginContentWrapper } from './__styles__'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface LoginProps {
  appName: string
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  redirectPath?: string
}

export const handleLoginClick =
  (reapitConnectBrowserSession: ReapitConnectBrowserSession, redirectPath?: string) => () => {
    const redirect = redirectPath ? `${window.location.origin}${redirectPath}` : undefined
    reapitConnectBrowserSession.connectLoginRedirect(redirect)
  }

export const Login: FC<LoginProps> = ({ appName, reapitConnectBrowserSession, redirectPath }) => {
  const loginUser = useCallback(handleLoginClick(reapitConnectBrowserSession, redirectPath), [])

  return (
    <LoginContainer>
      <LoginContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
        <FlexContainer isFlexColumn>
          <Subtitle hasCenteredText>Welcome</Subtitle>
          <BodyText hasCenteredText>{appName}</BodyText>
        </FlexContainer>
        <ButtonGroup alignment="center">
          <Button onClick={loginUser} intent="primary" size={3}>
            Login With Reapit
          </Button>
        </ButtonGroup>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Login
