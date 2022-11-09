import React, { FC } from 'react'
import { BodyText, Button } from '@reapit/elements'
import connectImage from '../../assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { LoginContainer, LoginWrapper, LoginImage, LoginImageContainer } from './__styles__/styles'
import loginGraphic from '../../assets/images/login-graphic.svg'

export const loginHandler = () => reapitConnectBrowserSession.connectLoginRedirect()

export const LoginPage: FC = () => (
  <LoginContainer>
    <LoginImageContainer>
      <LoginImage src={loginGraphic} alt="login graphic" />
    </LoginImageContainer>
    <LoginWrapper>
      <BodyText>
        <img src={connectImage} alt="Reapit Connect Graphic" />
      </BodyText>
      <BodyText>
        <Button type="button" onClick={loginHandler} loading={false} intent="primary" disabled={false} fullWidth>
          Login
        </Button>
      </BodyText>
    </LoginWrapper>
  </LoginContainer>
)

export default LoginPage
