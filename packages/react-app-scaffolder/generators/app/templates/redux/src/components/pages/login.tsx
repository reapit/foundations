import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { authLogin } from '@/actions/auth'
import Routes from '@/constants/routes'
import { LOGIN_TYPE } from '@/constants/auth'
import { Input, Button, H1, Level, Alert, isEmail } from '@reapit/elements'
<<<<<<< HEAD
import { LoginParams } from '@reapit/cognito-auth'
<<<<<<< HEAD
<% if (stylesSolution == 'sass') { %>import loginStyles from '@/styles/pages/login.scss?mod'<%}%>
<% if (stylesSolution == 'styledComponents') { %>import { Container, Wrapper, ImageContainer } from './__styles__/login'<%}%>
=======
=======
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button } from '@reapit/elements'
>>>>>>> update

<% if (styledComponents) { %>
import { Container, Wrapper, ImageContainer } from './__styles__/login'
<% } else { %>
import loginStyles from '@/styles/pages/login.scss?mod'
<% } %>

>>>>>>> temp
import logoImage from '@/assets/images/reapit-graphic.jpg'

export interface LoginMappedActions {
  login: (params: LoginParams) => void
}

export interface LoginMappedProps {
  hasSession: boolean
  error: boolean
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

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const onSubmitHandler = (setIsSubmitting: any, login: any, values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT, cognitoClientId: 'process.env.COGNITO_CLIENT_ID' } as LoginParams)
}

const loginHandler = () => redirectToLogin(process.env.COGNITO_CLIENT_ID as string, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login } = props
<<<<<<< HEAD
  <% if (stylesSolution == 'sass') { %>const { disabled, wrapper, container, image } = loginStyles<%}%>
=======
=======
  const { hasSession } = props
>>>>>>> update
    <% if (!styledComponents) { %>
    const { disabled, wrapper, container, image } = loginStyles
        <% } %>

>>>>>>> temp
          React.useEffect(() => {
            if (error) {
              setIsSubmitting(false)
            }
          }, [error])

  if (hasSession) {
    return <Redirect to={Routes.AUTHENTICATED} />
  }

  return (
<<<<<<< HEAD
    <% if (stylesSolution == 'sass') { %><div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p><%}%>
    
    <% if (stylesSolution == 'styledComponents') { %><Container>
      <Wrapper disabled={isSubmitting}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p><%}%>
=======
    <% if (styledComponents) { %>
    <Container>
      <Wrapper disabled={isSubmitting}>
        <% } else { %>
          <div className={container}>
            <div className={`${wrapper} ${isSubmitting && disabled}`}>
              <% } %>

          <H1 isCentered>Sign in</H1>
              <p className="pb-8">Welcome to <%= name %></p>
>>>>>>> temp

        <Level>
          <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
            Login
          </Button>
        </Level>

<<<<<<< HEAD
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
=======
              <% if (styledComponents) { %>
                <ImageContainer>
                  <img src={logoImage} alt="Reapit Graphic" />
                </ImageContainer>
                <% } else { %>
                  <div className={image}>
                    <img src={logoImage} alt="Reapit Graphic" />
                  </div>
                  <% } %>

              <% if (styledComponents) { %>
              </Wrapper>
          </Container>
          <% } else { %>
      </div>
    </div>
    <% } %>
>>>>>>> temp

  )
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error
})

export default withRouter(connect(mapStateToProps, {})(Login))
