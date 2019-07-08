import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import Alert from '../ui/alert'
import { Formik, Form } from 'formik'
import Input from '../form/input'
import { authLogin, authChangeLoginType } from '../../actions/auth'
import { validate } from '../../utils/form/login'
import Tabs, { TabConfig } from '../ui/tabs'
import { LoginType } from '../../reducers/auth'
import { Dispatch } from 'redux'
import Routes from '../../constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import Button from '../form/button'
import bulma from '@/styles/vendor/bulma'

export interface LoginMappedActions {
  login: () => void
  authChangeLoginType: (loginType: string) => void
}

export interface LoginMappedProps {
  isLogin: boolean
  error: boolean
  loginType: LoginType
}

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginProps = LoginMappedActions & LoginMappedProps

export const tabConfigs = ({ loginType, authChangeLoginType }: LoginProps): TabConfig[] => [
  {
    tabIdentifier: 'CLIENT',
    displayText: 'I am a client',
    onTabClick: authChangeLoginType,
    active: loginType === 'CLIENT'
  },
  {
    tabIdentifier: 'DEVELOPER',
    displayText: 'I am a developer',
    onTabClick: authChangeLoginType,
    active: loginType === 'DEVELOPER'
  }
]

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { isLogin, error, login } = props
  const { disabled, wrapper, container } = loginStyles
  const { level, levelLeft, levelRight } = bulma

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])
  if (isLogin) {
    return <Redirect to={props.loginType === 'DEVELOPER' ? Routes.DEVELOPER : Routes.CLIENT} />
  }

  return (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <Tabs tabConfigs={tabConfigs(props)} />
        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={values => {
            console.log(values)
            setIsSubmitting(true)
            login()
          }}
          render={() => (
            <Form data-test="login-form">
              <Input dataTest="login-email" type="text" label="Email" id="email" name="email" />
              <Input dataTest="login-password" type="password" label="Password" id="password" name="password" />
              <div className={level}>
                <div className={levelLeft}>
                  <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                    Login
                  </Button>
                </div>
                {props.loginType === 'DEVELOPER' && (
                  <div className={levelRight}>
                    <Link to={Routes.REGISTER}>Create new account</Link>
                  </div>
                )}
              </div>
              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
            </Form>
          )}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  isLogin: state.auth.isLogin,
  error: state.auth.error,
  loginType: state.auth.loginType
})

const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: () => dispatch(authLogin()),
  authChangeLoginType: (loginType: string) => dispatch(authChangeLoginType(loginType as LoginType))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
