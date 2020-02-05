import * as React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Input, Button, Tabs, TabConfig, Alert, H1, Level } from '@reapit/elements'
import { LoginParams, LoginMode, LoginType } from '@reapit/cognito-auth'
import { Redirect, Link } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import { authLogin, authChangeLoginType } from '../../actions/auth'
import { validate } from '../../utils/form/login'
import { Dispatch, compose } from 'redux'
import Routes from '../../constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import { withRouter, RouteComponentProps } from 'react-router'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { getLoginTypeByPath } from '@/utils/auth-route'
import { getCookieString, COOKIE_FIRST_TIME_LOGIN } from '@/utils/cookie'

export interface LoginMappedActions {
  login: (params: LoginParams) => void
  authChangeLoginType: (loginType: string) => void
}

export interface LoginMappedProps {
  hasSession: boolean
  error: boolean
  loginType: LoginType
  mode: LoginMode
}

export interface LoginFormValues {
  userName: string
  password: string
}

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const tabConfigs = ({ loginType, history }: LoginProps): TabConfig[] => [
  {
    tabIdentifier: 'CLIENT',
    displayText: 'Client',
    onTabClick: () => {
      history.push(Routes.CLIENT_LOGIN)
    },
    active: loginType === 'CLIENT',
  },
  {
    tabIdentifier: 'DEVELOPER',
    displayText: 'Developer',
    onTabClick: () => {
      history.push(Routes.DEVELOPER_LOGIN)
    },
    active: loginType === 'DEVELOPER',
  },
]

export const handleUseEffect = ({ setIsSubmitting, error }) => () => {
  if (error) {
    setIsSubmitting(false)
  }
}

export const onSubmitHandler = ({ setIsSubmitting, loginType, mode, login }) => values => {
  setIsSubmitting(true)
  login({ ...values, loginType, mode, cognitoClientId: process.env.COGNITO_CLIENT_ID_MARKETPLACE as string })
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login, loginType, location, authChangeLoginType, mode } = props
  const { disabled, wrapper, container, image /* , register */ } = loginStyles

  React.useEffect(handleUseEffect({ setIsSubmitting, error }), [error])

  let currentLoginType = getLoginTypeByPath(location.pathname)
  authChangeLoginType(currentLoginType)

  if (hasSession) {
    const firstLoginCookie = getCookieString(COOKIE_FIRST_TIME_LOGIN)
    if (loginType === 'DEVELOPER' && !firstLoginCookie) {
      return <Redirect to={Routes.DEVELOPER_WELCOME} />
    }
    if (loginType === 'DEVELOPER' && firstLoginCookie) {
      return <Redirect to={Routes.DEVELOPER_MY_APPS} />
    }
    return <Redirect to={loginType === 'CLIENT' ? Routes.CLIENT : Routes.ADMIN_APPROVALS} />
  }

  const queryParams = new URLSearchParams(props.location.search)
  const isChangePasswordSuccess = queryParams.get('isChangePasswordSuccess')
  const confirmError = queryParams.get('confirmError')

  return (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to Reapit {`${loginType === 'CLIENT' ? 'Marketplace' : 'Foundations'}`}</p>
        {loginType !== 'ADMIN' && <Tabs tabConfigs={tabConfigs(props)} />}
        <Formik
          validate={validate}
          initialValues={{ userName: '', password: '' } as LoginFormValues}
          onSubmit={onSubmitHandler({ setIsSubmitting, login, loginType, mode })}
        >
          {() => (
            <Form noValidate={true} className={loginStyles.loginForm} data-test="login-form">
              <Input
                dataTest="login-email"
                type="email"
                labelText="Email"
                id="userName"
                name="userName"
                placeholder="name@address.com"
              />
              {loginType === 'DEVELOPER' && (
                <div className={loginStyles.forgotPasswordContainer}>
                  <Link to={Routes.FORGOT_PASSWORD}>Forgot Password?</Link>
                </div>
              )}
              <Input
                dataTest="login-password"
                type="password"
                labelText="Password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <Level>
                {/* {loginType === 'DEVELOPER' && (
                  <div className={register}>
                    Don't have an account yet?&nbsp;
                    <Link to={Routes.REGISTER}>Register</Link>
                  </div>
                )} */}
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Login
                </Button>
              </Level>
              {isChangePasswordSuccess && <Alert message="Password changed successfully" type="success" />}
              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
              {confirmError && (
                <Alert
                  type="danger"
                  message="Unfortunately, the verification process has failed. Please contact the Administrator."
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error,
  loginType: state.auth.loginType,
  mode: state?.auth?.refreshSession?.mode || 'WEB',
})

export const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params)),
  authChangeLoginType: (loginType: string) => dispatch(authChangeLoginType(loginType as LoginType)),
})

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withRedux)(Login) as React.LazyExoticComponent<any>
