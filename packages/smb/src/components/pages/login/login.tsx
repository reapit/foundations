import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'
import useAuth from '@/hooks/use-auth'
import Routes from '@/constants/routes'
import connectImage from '@/assets/images/reapit-connect.png'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { Container, Wrapper, ImageContainer } from './__styles__/styles'

export const Login: React.FunctionComponent = () => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_SMB as string
  const loginHandler = () => redirectToLogin(cognitoClientId, `${window.location.origin}`)

  const { loginSession } = useAuth()
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
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </Wrapper>

      <ImageContainer>
        <img src={logoImage} alt="Reapit Graphic" />
      </ImageContainer>
    </Container>
  )
}

export default Login
