import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import Alert from '../ui/alert'
import { Formik, Form } from 'formik'
import { authLogin, authChangeLoginType } from '../../actions/auth'
import { validate } from '../../utils/form/login'
import { Dispatch } from 'redux'
import Routes from '../../constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import bulma from '@/styles/vendor/bulma'
import { withRouter, RouteComponentProps } from 'react-router'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { Input, Button, Tabs, TabConfig, LoginType, LoginParams, LoginMode } from '@reapit/elements'
import { oc } from 'ts-optchain'

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

export const tabConfigs = ({ loginType, authChangeLoginType }: LoginProps): TabConfig[] => [
  {
    tabIdentifier: 'CLIENT',
    displayText: 'Client',
    onTabClick: authChangeLoginType,
    active: loginType === 'CLIENT'
  },
  {
    tabIdentifier: 'DEVELOPER',
    displayText: 'Developer',
    onTabClick: authChangeLoginType,
    active: loginType === 'DEVELOPER'
  }
]

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login, loginType, location, authChangeLoginType, mode } = props
  const { disabled, wrapper, container, image, register } = loginStyles
  const { level, title, isH1, isCentered } = bulma

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])

  if (location.pathname === Routes.ADMIN_LOGIN) {
    authChangeLoginType('ADMIN')
  }

  if (hasSession) {
    return (
      <Redirect
        to={
          loginType === 'DEVELOPER'
            ? Routes.DEVELOPER_MY_APPS
            : loginType === 'CLIENT'
            ? Routes.CLIENT
            : Routes.ADMIN_APPROVALS
        }
      />
    )
  }

  return (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <h1 className={`${title} ${isH1} ${isCentered}`}>Sign in</h1>
        <p className="pb-8">Welcome to Reapit {`${loginType === 'CLIENT' ? 'Marketplace' : 'Foundations'}`}</p>
        {loginType !== 'ADMIN' && <Tabs tabConfigs={tabConfigs(props)} />}
        <Formik
          validate={validate}
          initialValues={{ userName: '', password: '' } as LoginFormValues}
          onSubmit={values => {
            setIsSubmitting(true)
            login({ ...values, loginType, mode })
          }}
          render={() => (
            <Form data-test="login-form">
              <Input
                dataTest="login-email"
                type="email"
                labelText="Email"
                id="userName"
                name="userName"
                placeholder="name@address.com"
              />
              <Input
                dataTest="login-password"
                type="password"
                labelText="Password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <div className={level}>
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Login
                </Button>
                {loginType === 'DEVELOPER' && (
                  <div className={register}>
                    Don't have an account yet?&nbsp;
                    <Link to={Routes.REGISTER}>Register</Link>
                  </div>
                )}
              </div>
              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
            </Form>
          )}
        />
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error,
  loginType: state.auth.loginType,
  mode: oc(state).auth.refreshSession.mode('WEB')
})

const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params)),
  authChangeLoginType: (loginType: string) => dispatch(authChangeLoginType(loginType as LoginType))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
