import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Button, H1, Level, isEmail } from '@reapit/elements'
import { LoginParams } from '@reapit/cognito-auth'
<% if (stylesSolution == 'sass') { %>import loginStyles from '@/styles/pages/login.scss?mod'<%}%>
<% if (stylesSolution == 'styledComponents') { %>import { Container, Wrapper, ImageContainer } from './__styles__/login'<%}%>

import { redirectToLogin } from '@reapit/cognito-auth'

import logoImage from '@/assets/images/reapit-graphic.jpg'


export interface LoginMappedActions {
  login: (params: LoginParams) => void
}

export interface LoginMappedProps {
  hasSession: boolean
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginFormError {
  email?: string
  password?: string
}

export function validate(values: LoginFormValues) {
  let errors = {} as LoginFormError

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () => redirectToLogin(process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  <% if (stylesSolution == 'sass') { %>const { disabled, wrapper, container, image } = loginStyles<%}%>

  const { hasSession } = props

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <% if (stylesSolution == 'sass') { %><div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p><%}%>

    <% if (stylesSolution == 'styledComponents') { %><Container>
      <Wrapper>
        <H1 isCentered>Sign in</H1>
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

export const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default withRouter(connect(mapStateToProps, {})(Login))
