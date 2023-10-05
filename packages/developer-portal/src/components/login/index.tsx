import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Subtitle, Title, FlexContainer, Icon, elMb7 } from '@reapit/elements'
import Routes from '../../constants/routes'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { LoginContainer, LoginContentWrapper } from './__styles__'
import { navigateRoute } from '../../utils/navigation'

export const onLoginButtonClick = () => {
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export const Login: FC = () => {
  const navigate = useNavigate()

  return (
    <LoginContainer>
      <LoginContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
        <FlexContainer isFlexColumn>
          <Title hasCenteredText>Welcome</Title>
          <Subtitle hasCenteredText>Developer Portal</Subtitle>
        </FlexContainer>
        <ButtonGroup alignment="center">
          <Button onClick={onLoginButtonClick} intent="primary" size={3}>
            Login With Reapit
          </Button>
          <Button onClick={navigateRoute(navigate, Routes.SELECT_ROLE)} intent="default" size={3}>
            Register
          </Button>
        </ButtonGroup>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Login
