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
import { Input, Button, LoginParams, Alert } from '@reapit/elements'

import loginStyles from '@/styles/pages/login.scss?mod'
import bulma from '@/styles/vendor/bulma'
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

export const onSubmitHandler = (
  setIsSubmitting: (isSubmitting: boolean) => void,
  login: (params: LoginParams) => void,
  values: LoginFormValues
) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT } as LoginParams)
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login } = props
  const { disabled, wrapper, container, image } = loginStyles
  const { level, title, isH1, isCentered } = bulma

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])

  const LoginForm = (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <h1 className={`${title} ${isH1} ${isCentered}`}>Sign in</h1>
        <p className="pb-8">Welcome to Reapit Online Check List</p>

        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={values => onSubmitHandler(setIsSubmitting, login, values)}
          render={() => (
            <Form data-test="login-form">
              <Input
                dataTest="login-email"
                type="text"
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

              <div className={level}>
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Login
                </Button>
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

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return LoginForm
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
