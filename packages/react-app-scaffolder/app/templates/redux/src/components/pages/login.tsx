import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Button, Level } from '@reapit/elements'
import connectImage from '@/assets/images/reapit-connect.png'
<% if (stylesSolution == 'sass') { %>import loginStyles from '@/styles/pages/login.scss?mod'<%}%>
<% if (stylesSolution == 'styledComponents') { %>import { Container, Wrapper, ImageContainer } from './__styles__/login'<%}%>

import { redirectToLogin } from '@reapit/cognito-auth'

import logoImage from '@/assets/images/reapit-graphic.jpg'

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () => redirectToLogin(process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  <% if (stylesSolution == 'sass') { %>const { wrapper, container, image } = loginStyles<%}%>

  const { hasSession } = props

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
          <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
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

export const mapStateToProps = (state: ReduxState): LoginProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default withRouter(connect(mapStateToProps, {})(Login))
