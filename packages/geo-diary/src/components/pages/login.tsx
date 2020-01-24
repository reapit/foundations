import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { authLogin } from '@/actions/auth'
import { validate } from '@/utils/form/login'
import Routes from '@/constants/routes'
import { LOGIN_TYPE } from '@/constants/auth'
import { Input, Button, H1, Level, Alert, Formik, Form } from '@reapit/elements'
import { LoginParams } from '@reapit/cognito-auth'
import loginStyles from '@/styles/pages/login.scss?mod'
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

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const onSubmitHandler = (setIsSubmitting: any, login: any) => (values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT } as LoginParams)
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
      <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
        Login
      </Button>
    </Level>

    {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
  </Form>
)

export const handleUseEffect = ({ setIsSubmitting, error }) => () => {
  if (error) {
    setIsSubmitting(false)
  }
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login } = props
  const { disabled, wrapper, container, image } = loginStyles

  React.useEffect(handleUseEffect({ setIsSubmitting, error }), [error])

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to GEO Diary</p>

        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={onSubmitHandler(setIsSubmitting, login)}
        >
          {renderForm({ isSubmitting, error })}
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
})

export const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
