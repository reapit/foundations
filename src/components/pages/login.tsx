import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { authLogin } from '@/actions/auth'
import { validate } from '@/utils/form/login'
import Routes from '@/constants/routes'
import { LOGIN_TYPE } from '@/constants/auth'
import { Input, Button, LoginParams, Alert, Level } from '@reapit/elements'

import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/lifetimelegalwhite.png'

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

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const handleUseEffect = ({ setIsSubmitting, error }) => () => {
  if (error) {
    setIsSubmitting(false)
  }
}

export const renderForm = ({ isSubmitting, error }) => () => (
  <Form data-test="login-form">
    <Input
      dataTest="login-email"
      type="email"
      labelText="Email"
      id="email"
      name="email"
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

    <Level>
      <Button type="submit" loading={isSubmitting} variant="primary" fullWidth disabled={isSubmitting}>
        Login
      </Button>
    </Level>

    {error && <Alert type="danger" message="Login failed, user credentials not recognised" />}
  </Form>
)

export const onSubmitHandler = (setIsSubmitting: any, login: any) => (values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT } as LoginParams)
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login } = props
  const { disabled, wrapper, container, imageLogo, wrapperBorder } = loginStyles

  React.useEffect(handleUseEffect({ setIsSubmitting, error }), [error])

  if (hasSession) {
    return <Redirect to={Routes.SEARCH} />
  }

  const LoginForm = (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <img className={imageLogo} src={logoImage} alt="lifetimelegal" />
        <div className={wrapperBorder}>
          <Formik
            validate={validate}
            initialValues={{ email: '', password: '' } as LoginFormValues}
            onSubmit={onSubmitHandler(setIsSubmitting, login)}
            render={renderForm({ isSubmitting, error })}
          />
        </div>
      </div>
    </div>
  )

  return LoginForm
}

export const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error
})

export const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
