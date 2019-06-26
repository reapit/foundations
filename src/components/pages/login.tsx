import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import Alert from '../ui/alert'
import { Formik, Form } from 'formik'
import Input from '../form/input'
import { authLogin, authChangeLoginType } from '../../actions/auth'
import { LoginContainer, LoginFormWrapper } from '../../styles/pages/login'
import { validate } from '../../utils/form/login'
import Tabs, { TabConfig } from '../ui/tabs'
import { LoginType } from '../../reducers/auth'
import { Dispatch } from 'redux'
import Routes from '../../constants/routes'

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
  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])
  if (isLogin) {
    return <Redirect to={props.loginType === 'DEVELOPER' ? Routes.DEVELOPER : Routes.CLIENT} />
  }
  return (
    <LoginContainer>
      <LoginFormWrapper disabled={isSubmitting}>
        <Tabs tabConfigs={tabConfigs(props)} />
        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={(values, actions) => {
            console.log(values)
            setIsSubmitting(true)
            login()
          }}
          render={props => (
            <Form>
              <Input type="email" label="Email" id="email" name="email" />
              <Input type="password" label="Password" id="password" name="password" />
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                Login
              </button>
              {error && (
                <Alert message="Login failed, user credentials not recognised" type="danger" className="mt-4 mb-1" />
              )}
            </Form>
          )}
        />
        {props.loginType === 'DEVELOPER' && (
          <div className="mt-4">
            <Link to={Routes.REGISTER}>Create new account</Link>
          </div>
        )}
      </LoginFormWrapper>
    </LoginContainer>
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
