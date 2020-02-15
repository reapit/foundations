import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Routes from '@/constants/routes'
import { Button, Level } from '@reapit/elements'
<% if (stylesSolution == 'sass') { %>import loginStyles from '@/styles/pages/login.scss?mod'<%}%>
<% if (stylesSolution == 'styledComponents') { %>import { Container, Wrapper, ImageContainer } from './__styles__/login'<%}%>
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { useAuthContext } from '@/context/authContext'
import { redirectToOAuth } from '@reapit/cognito-auth'

export const Login: React.FunctionComponent = () => {
  const cognitoClientId = 'process.env.COGNITO_CLIENT_ID'
  <% if (stylesSolution == 'sass') { %>const { wrapper, container, image } = loginStyles<%}%>

  const { loginSession, refreshSession } = useAuthContext()
  const hasSession = !!loginSession && !!refreshSession

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <% if (stylesSolution == 'sass') { %><div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to <%= name %></p><%}%>

    <% if (stylesSolution == 'styledComponents') { %><Container>
      <Wrapper>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to <%= name %></p><%}%>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={() => redirectToOAuth(cognitoClientId)}>
            Login
          </Button>
        </Level>

        <% if (stylesSolution == 'sass') { %>
          </div>

        <div className={image}>
          <img src={logoImage} alt="Reapit Graphic" />
        </div>
      </div>
        <%}%>
        <% if (stylesSolution == 'styledComponents') { %>
          </Wrapper>

          <ImageContainer>
            <img src={logoImage} alt="Reapit Graphic" />
          </ImageContainer>
        </Container>
        <%}%>
  )
}

export default Login
