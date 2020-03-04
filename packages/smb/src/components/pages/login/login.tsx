import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Routes from '@/constants/routes'
import { Button, Level } from '@reapit/elements'

import { Container, Wrapper, ImageContainer } from './style'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { useAuthContext } from '@/context/auth-context'
import { redirectToLogin } from '@reapit/cognito-auth'

export const Login: React.FunctionComponent = () => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_SMB as string
  const loginHandler = () => redirectToLogin(cognitoClientId, `${window.location.origin}`)

  const { loginSession } = useAuthContext()

  if (loginSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <Container>
      <Wrapper>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to SMB</p>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={loginHandler}>
            Login
          </Button>
        </Level>
      </Wrapper>

      <ImageContainer>
        <img src={logoImage} alt="Reapit Graphic" />
      </ImageContainer>
    </Container>
  )
}

export default Login
